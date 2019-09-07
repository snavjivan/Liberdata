const url = require('url');
const express = require('express');
const router = express.Router();

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

router.post('/favorite-videos')

router.post('/search-interests', (req, res) => {
    var searches = globalHostMap.get('www.google.com');
    for (var search of searches) {
        if (search.title.includes('- Google Search')) {
            var dashIndex = search.title.indexOf('-');
            var trimmedSearch = search.title.substring(0, dashIndex);
            console.log(trimmedSearch);
            //do nlp stuff to get categories here
        }
    }
})

router.post('/social-media-interests', (req, res) => {
    //for facebook
    var fbHistory = globalHostMap.get('www.facebook.com');
    //for reddit

    //for twitter
})

//maybe add gmail
//maybe use spotify api

module.exports = router;