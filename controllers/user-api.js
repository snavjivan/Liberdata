const url = require('url');
const express = require('express');
const router = express.Router();
//const nlp = require('../utils/nlp.js');

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

router.post('/raw-data', (req, res) => {
    var response = JSON.stringify([...globalHostMap]);
    console.log(globalHostMap);
    res.json(response);
})

//can take in the number of top sites, defaults to 5
//use siteNum property in front end
//this excludes google search as a popular site
router.post('/top-sites', (req, res) => {
    var numSites;
    if (!req.body.siteNum) {
        numSites = 5;
    } else {
        numSites = req.body.siteNum;
    }
    var topSites = new Map();
    for (var key of globalHostMap.keys()) {
        if (key != 'www.google.com') {
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
    }
    console.log(topSites);
    var response = JSON.stringify([...topSites]);
    res.json(response);
})

router.post('/favorite-videos', (req, res) => {
    var videos = globalHostMap.get('www.youtube.com');
    if (videos) {
        for (var video of videos) {
            if (video.title.includes('- YouTube')) {
                var dashIndex = search.title.indexOf('-');
                var trimmedVideo = search.title.substring(0, dashIndex);
                console.log(trimmedVideo);
                //do nlp stuff to get categories here
            }
        }
    }
})

router.post('/search-interests', (req, res) => {
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
      
    } else {
      res.json('None')
    }
})

router.post('/social-media-interests', (req, res) => {
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
    } else {
        fbJson = 'None'
    }
    //for twitter
    var twJson = '';
    var twHistory = globalHostMap.get('twitter.com');
    var batchedTwSearch = [];
    if (twHistory) {
        for (var tw of twitter) {
            console.log(tw);
            if (tw.url.includes('developer')) {
            }  else if (tw.title.includes('Twitter')) {
            } else {
              batchedTwSearch.push(fb.title);
            }
        }
    } else {
        twJson = 'None'
    }
    //for reddit
    var redditJson = '';
    var redditHistory = globalHostMap.get('www.reddit.com');
    if (redditHistory) {
        for (var reddit of redditHistory) {
            console.log(reddit.title);
            //do nlp title to get categories here.
        }
    } else {
        //no reddit history
        redditJson = 'None';
    }
    //combine above results into 1 json
})

router.post('/email-interests', (req, res) => {
    var emailHistory = globalHostMap.get('mail.google.com');
    if (emailHistory) {
        for (var email of emailHistory) {
            if (email.title.includes('- Gmail')) {
                var dashIndex = email.title.indexOf('-');
                var trimmedEmail = email.title.substring(0, dashIndex);
                console.log(trimmedEmail);
                //do nlp stuff here
            }
        }
    } else {
        res.json('None');
    }
})

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
    return categories;
}

module.exports = router;
