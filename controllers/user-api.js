const url = require('url');
const express = require('express');
const router = express.Router();
const marketplace_db = require('../models/marketplace');

//TODO: pls replace
globalHostMap = new Map();

router.post('/postHistory', (req, res) => {
    var hostMap = new Map();
    req.body.value.forEach(element => {
        var myURL = new URL(element.url);
        console.log(myURL.host);
        if (!hostMap.get(myURL.host)) {
            hostURLList = [];
            hostURLList.push(element);
            hostMap.set(myURL.host, hostURLList);
        } else {
            //change this so it adds repeat views together instead of repeat them in the array
            hostMap.get(myURL.host).push(element);
        }
    });
    for (var key of hostMap.keys()) {
        hostMap.get(key).forEach(element => console.log(element))
    }
    console.log(hostMap.keys());
    //should change this to use a database
    globalHostMap = hostMap;
    var response = "dummy response";
    res.json(response)
})

router.get('/raw-data', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    var responseValue = [...globalHostMap];
    res.json(responseValue);
})
// router.post('/raw-data', (req, res) => {
//     var response = JSON.stringify([...globalHostMap]);
//     console.log(globalHostMap);
//     res.json(response);
// })

//can take in the number of top sites, defaults to 5
//use siteNum property in front end
//this excludes google search as a popular site


//FIX
router.get('/top-sites-old', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    var numSites;
    if (!req.body.siteNum) {
        numSites = 5;
    } else {
        numSites = req.body.siteNum;
    }
    var topSites = new Map();
    for (var key of globalHostMap.keys()) {
            var numViews = 0;
            //gets number of views for a certain key
            globalHostMap.get(key).forEach(value => {
                numViews += value.visitCount;
            });
            if (topSites.size < numSites - 1) {
                topSites.set(key, numViews);
            } else {
                //gets least popular site in the map
                var smallestKey;
                var smallestViewNum;
                for (var topSite of topSites.keys()) {
                    if (!smallestKey || topSites.get(topSite) < smallestViewNum) {
                        smallestKey = topSite;
                        smallestViewNum = topSites.get(smallestKey);
                    }
                }
                //replaces if current site has more views than least popular site
                if (numViews > smallestViewNum) {
                    topSites.delete(smallestKey);
                    topSites.set(key, numViews);
                }
            }
    }
    console.log(topSites);
    var response = [...topSites];
    res.json(response);
})

router.get('/top-sites', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    var numSites;
    if (!req.body.siteNum) {
        numSites = 5;
    } else {
        numSites = req.body.siteNum;
    }
    var topSites = new Map();
    for (var key of globalHostMap.keys()) {
        if (!key.includes('google.com') && !(key.includes('localhost'))) {
            var numViews = 0;
            //gets number of views for a certain key
            globalHostMap.get(key).forEach(value => {
                numViews += value.visitCount;
            });
            if (topSites.size < numSites) {
                topSites.set(key, numViews);
            } else {
                //gets least popular site in the map
                var smallestKey = '';
                var smallestViewNum;
                for (var topSite of topSites.keys()) {
                    if (!smallestKey || topSites.get(topSite) < smallestViewNum) {
                        smallestKey = topSite;
                        smallestViewNum = topSites.get(smallestKey);
                    }
                }
                //replaces if current site has more views than least popular site
                if (numViews > smallestViewNum) {
                    topSites.delete(smallestKey);
                    topSites.set(key, numViews);
                }
            }
        }
    }
    console.log(topSites);
    var response = [...topSites];
    res.json(response);
})



router.get('/video-interests', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    var videos = globalHostMap.get('www.youtube.com');
    var batchedSearch = [];
    if (videos) {
        for (var video of videos) {
            if (video.title.includes('- YouTube')) {
                var dashIndex = video.title.indexOf('-');
                var trimmedVideo = video.title.substring(0, dashIndex);
                //console.log(trimmedVideo);
                batchedSearch.push(trimmedVideo);
            }
        }
        /*console.log(batchedSearch);
        var jsonArr = JSON.parse(JSON.stringify(batchedSearch));
        res.json(jsonArr);*/
        nlpLoopNum(5, batchedSearch, (x) => {
          var jsonArray = JSON.parse(JSON.stringify(x));
          console.log((jsonArray));
          res.json(jsonArray);
        });
    } else {
        res.json('None');
    }
})

router.get('/recent-videos', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    var videos = globalHostMap.get('www.youtube.com');
    var batchedSearch = [];
    if (videos) {
        for (var video of videos) {
            if (video.title.includes('- YouTube')) {
                var dashIndex = video.title.indexOf('-');
                var paramIndex = video.title.indexOf(')');
                var trimmedVideo = video.title.substring(paramIndex + 1, dashIndex);
                //console.log(trimmedVideo);
                batchedSearch.push(trimmedVideo);
            }
        }
        console.log(batchedSearch);
        var jsonArr = JSON.parse(JSON.stringify(batchedSearch));
        res.json(jsonArr);
    } else {
        res.json('None');
    }
})

router.get('/search-interests', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    var searches = globalHostMap.get('www.google.com');
    var batchedSearch = [];
    if (searches) {
      for (var search of searches) {
        if (search.title.includes('- Google Search')) {
            var dashIndex = search.title.indexOf('-');
            var trimmedSearch = search.title.substring(0, dashIndex);
            batchedSearch.push(trimmedSearch);
        }
      }

      nlpLoop(batchedSearch, (x) => {
        for (var xs in x){
          if (xs.name == "None") {
            delete x.xs;
          }
        }
        var jsonArray = JSON.parse(JSON.stringify(x));
        console.log((jsonArray));
        res.json(jsonArray);
        });

    } else {
      res.json('None')
    }
})

router.get('/social-media-interests/facebook', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    //for facebook
    var fbJson = '';
    var fbHistory = globalHostMap.get('www.facebook.com');
    var batchedFbSearch = [];
    if (fbHistory) {
        for (var fb of fbHistory) {
          if (fb.title.includes('Log')) {
          }  else if (fb.title.includes('Settings')) {
          }  else if (fb.title.includes('Facebook')) {
          } else {
            batchedFbSearch.push(fb.title);
          }
        }
        nlpLoop(batchedFbSearch, (x) => {
          var jsonArray = JSON.parse(JSON.stringify(x));
          console.log((jsonArray));
          res.json(jsonArray);
          });
    } else {
      res.json('None')
    }
  })


router.get('/social-media-interests/reddit', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    var redditHistory = globalHostMap.get('www.reddit.com');
    var batchedRSearch = [];
    if (redditHistory) {
        for (var reddit of redditHistory) {
            batchedRSearch.push(reddit.title);
        }
        nlpLoopNum(5, batchedRSearch, (x) => {
          var jsonArray = JSON.parse(JSON.stringify(x));
          console.log((jsonArray));
          res.json(jsonArray);
          });
    } else {
        //no reddit history
        res.json('None');
    }
})

router.get('/email-interests', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    var emailHistory = globalHostMap.get('mail.google.com');
    var batchedSearch = [];
    if (emailHistory) {
        for (var email of emailHistory) {
            if (email.title.includes('- Gmail')) {
                var dashIndex = email.title.indexOf('-');
                var trimmedEmail = email.title.substring(0, dashIndex);
                batchedSearch.push(trimmedEmail);
            }
        }
        nlpLoopNum(6, batchedSearch, (x) => {
          var jsonArray = JSON.parse(JSON.stringify(x));
          console.log((jsonArray));
          res.json(jsonArray);
        });
    } else {
        res.json('None');
    }
})

router.post('/send-to-market', (req, res) => {
    var name = req.body.name;
    var interests = req.body.interests;
    var price = req.body.price;
    //Example entry: marketplace_db.addToMarket("ape", ['bananas', 'chimping', 'showers'], 0);
    marketplace_db.addToMarket(name, interests, price);
});

router.get('/get-from-market', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    marketplace_db.readFromMarket(data => {
        var jsonArray = JSON.parse(JSON.stringify(data));
        res.json(jsonArray);
    });
});

async function analyzeSyntaxOfText(text) {
    const language = require('@google-cloud/language');
    const client = new language.LanguageServiceClient();
    const document = {
    content: text,
    type: 'PLAIN_TEXT',
    };
    const [classification] = await client.classifyText({document});
    console.log('Categories:');
    if (classification.categories[0]) {
    var name = classification.categories[0].name;
    var confidence = classification.categories[0].confidence;
    } else {
        var name = 'None';
        var confidence = 0;
    }
    return {name, confidence};
}

const nlpLoop = (batchedSearch, callback) => {
    var promisesArray = [];
    while (batchedSearch.length) {
        if (batchedSearch.length >= 10) {
            promisesArray.push(analyzeSyntaxOfText(batchedSearch.splice(0, 10).join(',')));
            console.log(promisesArray);
        } else {
            batchedSearch = [];
        }
    }
    Promise.all(promisesArray)
        .then(values => {
            callback(values);
        });
}

const nlpLoopNum = (num, batchedSearch, callback) => {
    var promisesArray = [];
    while (batchedSearch.length) {
        if (batchedSearch.length >= num) {
            promisesArray.push(analyzeSyntaxOfText(batchedSearch.splice(0, num).join(',')));
            console.log(promisesArray);
        } else {
            batchedSearch = [];
        }
    }
    Promise.all(promisesArray)
        .then(values => {
            callback(values);
        });
}

module.exports = router;
