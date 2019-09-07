const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const userAPI = require('./controllers/user-api');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
//just a test delete later
app.get('/api/list', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

app.use('/user-api', userAPI)

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);