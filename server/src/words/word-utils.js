var dbConfig = require('../db-config');
var wordsModel = require('./words-model');

var getWordsList = (phonemeId) => {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM words WHERE phoneme_id=" + phonemeId + "  ORDER BY `order_no` ASC;";
        dbConfig.getResultSet(sql)
            .then((result) => {
                var extractedResults = wordsModel.extractWord(result);
                resolve(extractedResults);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

var getWordDetails = (phonemeId) => {
};

var addWord = (phonemeId, name, callback) => {
    return new Promise(function (resolve, reject) {
        var sql = `CALL add_word(${phonemeId},"${name}")`;
        dbConfig.getResultSet(sql)
            .then((result) => {
                getWordsList(phonemeId)
                    .then((getResult) => {
                        var extractedResults = wordsModel.extractWord(getResult);
                        resolve(extractedResults);
                    })
            })
            .catch((error) => {
                reject(error);
            });
    });
};

var updateWord = (wordId, phonemeId, name, orderNo, callback) => {
    return new Promise(function (resolve, reject) {
        var sql = `CALL update_word(${wordId}, ${phonemeId},"${name}", ${orderNo})`;
        dbConfig.getResultSet(sql)
            .then((result) => {
                getWordsList(phonemeId)
                    .then((getResult) => {
                        var extractedResults = wordsModel.extractWord(getResult);
                        resolve(extractedResults);
                    })
            })
            .catch((error) => {
                reject(error);
            });
    });
};

var deleteWord = (wordId, phonemeId, callback) => {
    return new Promise(function (resolve, reject) {
        var sql = `CALL delete_word(${wordId}, ${phonemeId})`;
        dbConfig.getResultSet(sql)
            .then((result) => {
                getWordsList(phonemeId)
                    .then((getResult) => {
                        var extractedResults = wordsModel.extractWord(getResult);
                        resolve(extractedResults);
                    })
            })
            .catch((error) => {
                reject(error);
            });
    });
};

module.exports = {
    getWordsList: getWordsList,
    getWordDetails: getWordDetails,
    addWord: addWord,
    updateWord: updateWord,
    deleteWord: deleteWord
};