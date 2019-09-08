// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Creates a client
module.exports.client = new language.LanguageServiceClient();
