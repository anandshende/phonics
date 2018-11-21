var dbConfig = require('../db-config');
var phonicsModel = require('./phonics-model')

var getWordsWithLengthConstraints = (number) => {
    return new Promise(function (resolve, reject) {
        var sql = "";
        if (number > 3) {
            sql = `select * from words where LENGTH(words.name) >= ${number};`;
        } else {
            sql = `select * from words where LENGTH(words.name) = ${number};`;
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
};

var searchWordsWithKeyAndLength = (key, length) => {
    return new Promise(function (resolve, reject) {
        var sql = "";
        if (length == 0) {
            sql = `select * from words`;
            sql += ` where words.name LIKE '%${key}%'`;
            sql += ` ORDER by Length(words.name);`;
        } else if (length > 3) {
            sql = `select * from words where LENGTH(words.name) >= ${length} ORDER by Length(words.name)`;
            sql += ` AND words.name LIKE '%${key}%';`;
        } else {
            sql = `select * from words where LENGTH(words.name) = ${length}`;
            sql += ` AND words.name LIKE '%${key}%';`;
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
};

module.exports = {
    getWordsWithLengthConstraints,
    searchWordsWithKeyAndLength
};