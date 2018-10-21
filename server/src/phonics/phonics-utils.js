var dbConfig = require('../db-config');
var phonicsModel = require('./phonics-model')

var getTwoLetterWords = () => {
    return new Promise(function (resolve, reject) {
        var sql = `select phonemes.id, phonemes.name from phonemes where LENGTH(phonemes.name) <= 2 
                    UNION
                    select words.id, words.name from words where LENGTH(words.name) <= 2;`;
                    
        dbConfig.getResultSet(sql)
            .then((result) => {
                var extractedResults = phonicsModel.extractPhonics(result);
                resolve(extractedResults);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

module.exports = {
    getTwoLetterWords
};