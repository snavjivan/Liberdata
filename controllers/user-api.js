const express = require('express');
const router = express.Router();

router.post('/postHistory', (req, res) => {
    console.log(req.body);
    var response = "dummy response";
    res.json(response)
})
//fix this.
router.post('/youtubeParse', (req, res) => { // I need youtube video id.
    const id = '7lCDEYXw3mM&key'
    var key = JSON.parse("/../keys.json");
    const url =  "https://www.googleapis.com/youtube/v3/videos?id=" + id + "=" + key.youtubeAPI +
     "&fields=items(id,snippet(channelId,title,categoryId),statistics)&part=snippet,statistics"


    node-fetch(url)
    .then(res => res.json())
    .then((out) => {
      console.log('Checkout this JSON! ', out);
    })
    .catch(err => { throw err });
    console.log(req.body);
    var response = "dummy response";
    res.json(response)
})


module.exports = router;
