const express = require('express');
const router = express.Router();

router.post('/postHistory', (req, res) => {
    console.log(req.body);
    var response = "dummy response";
    res.json(response)
})

module.exports = router;