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
    var response = [...topSites];
    res.json(response);
})

router.get('/favorite-videos', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
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

router.get('/search-interests', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    var searches = globalHostMap.get('www.google.com');
    var batchedSearch = [];
    if(searches){
      for (var search of searches) {
            if (search.title.includes('- Google Search')) {
                var dashIndex = search.title.indexOf('-');
                var trimmedSearch = search.title.substring(0, dashIndex);
                console.log(trimmedSearch);

                batchedSearch.push(trimmedSearch);
            }
      }
    } else {
      res.JSON('None')
    }
    analyzeSyntaxOfText(batchedSearch.join(":_) ")).then(console.log
    ).catch(console.log);
})

router.get('/social-media-interests', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    //for facebook
    var fbJson = '';
    var fbHistory = globalHostMap.get('www.facebook.com');
    if (fbHistory) {
        for (var fb of fbHistory) {
            console.log(fb);
        }
    } else {
        fbJson = 'None'
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
    //for twitter
    //combine above results into 1 json
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
  // classification.categories.forEach(category => {
  //   console.log(`Name: ${category.name}, Confidence: ${category.confidence}`);
  // });
  var name = classification.categories[0].name;
  var confidence = classification.categories[0].confidence;
  return {name, confidence};
}

//maybe add gmail
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
//maybe use spotify api

module.exports = router;
