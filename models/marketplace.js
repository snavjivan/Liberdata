const admin = require('firebase-admin');

const serviceAccount = require('../liberdata-252301-firebase-adminsdk-8qe4n-581a0d81c5.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://liberdata-252301.firebaseio.com/'
});

const database = admin.database();
const ref = database.ref('marketplace');

module.exports.addToMarket = (name, interests, price) => {
    ref.once('value', snapshot => {
        ref.push({name, interests, price});
    });
}

module.exports.readFromMarket = callback => {
    ref.once('value', snapshot => {
        if(snapshot.val() === null) {
            callback("Market is empty");
        } else {
            let entries = Object.entries(snapshot.val()).map(entry => entry[1]);
            callback(entries);
        }
    });
}