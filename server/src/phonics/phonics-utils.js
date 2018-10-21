var dbConfig = require('../db-config');
var phonicsModel = require('./phonics-model')

var getWordsWithLengthConstraints = (number) => {
    return new Promise(function (resolve, reject) {
        if (number > 3) {
            sql = `select phonemes.id, phonemes.name from phonemes where LENGTH(phonemes.name) >= ${number}`
            sql += ` UNION `;
            sql += `select words.id, words.name from words where LENGTH(words.name) >= ${number};`;
        } else {
            var sql = `select phonemes.id, phonemes.name from phonemes where LENGTH(phonemes.name) = ${number}`;
            sql += ` UNION `;
            sql += `select words.id, words.name from words where LENGTH(words.name) = ${number};`;
        }

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
    getWordsWithLengthConstraints
};