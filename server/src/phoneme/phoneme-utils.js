var dbConfig = require('../db-config');
var phonemeModel = require('./phoneme-model');

var getPhonemes = (callback) => {
    var sql = "SELECT * FROM phonemes";
    dbConfig.getResultSet(sql, (result) => {
        var extractedResults = phonemeModel.extractPhoneme(result);
        callback(extractedResults);
    });
}

var addPhoneme = (name, callback) => {
    var sql = `CALL add_phoneme("${name}")`;
    dbConfig.getResultSet(sql, (result) => {
        getPhonemes((result) => {
            callback(result);
        });
    });
}

var deletePhoneme = (id, callback) => {
    var sql = `CALL delete_phoneme(${id})`;
    dbConfig.getResultSet(sql, () => {
        getPhonemes((result) => {
            callback(result);
        });
    });
}

var updatePhoneme = (id, name, orderNo, callback) => {
    var sql = `CALL update_phoneme(${id}, "${name}", ${orderNo})`;
    dbConfig.getResultSet(sql, () => {
        getPhonemes((result) => {
            callback(result);
        });
    });
};

module.exports = {
    getPhonemes: getPhonemes,
    addPhoneme: addPhoneme,
    deletePhoneme: deletePhoneme,
    updatePhoneme: updatePhoneme
};