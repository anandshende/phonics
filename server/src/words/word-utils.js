var dbConfig = require('../db-config');
var wordsModel = require('./words-model');

var getWordsList = (id, callback) => {
    var sql = "SELECT * FROM words WHERE phoneme_id=" + id + ";";
    dbConfig.getResultSet(sql, (result) => {
        callback(wordsModel.extractWord(result));
    });
};

var getWordDetails = (id, callback) => {
};

var addWord = (phonemeId, name, callback) => {
    var sql = `CALL add_word(${phonemeId},"${name}")`;
    dbConfig.getResultSet(sql, (result) => {
        getWordsList(phonemeId, (result) => {
            callback(result);
        });
    });
};

var updateWord = (id, phonemeId, name, orderNo, callback) => {
    var sql = `CALL update_word(${id}, ${phonemeId},"${name}", ${orderNo})`;
    dbConfig.getResultSet(sql, (result) => {
        getWordsList(phonemeId, (result) => {
            callback(result);
        });
    });
};

var deleteWord = (id, phonemeId, callback) => {
    var sql = `CALL delete_word(${id}, ${phonemeId})`;
    dbConfig.getResultSet(sql, (result) => {
        getWordsList(phonemeId, (result) => {
            callback(result);
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