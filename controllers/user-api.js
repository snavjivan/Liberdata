const url = require('url');
const express = require('express');
const router = express.Router();

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
            hostMap.get(myURL.host).push(element);
        }
    });
    for (var key of hostMap.keys()) {
        hostMap.get(key).forEach(element => console.log(element))
    }
    console.log(hostMap.keys());
    globalHostMap = hostMap;
    var response = "dummy response";
    res.json(response)
})

module.exports = router;