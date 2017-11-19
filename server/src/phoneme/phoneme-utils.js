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
    var sql = "SELECT max(order_no) as max from phonemes";
    dbConfig.getResultSet(sql, (result) => {
        result.forEach((element) => {
            var max = element.max;
            sql = "insert into phonemes (order_no, name) values (" + (max + 1) + ", '" + name + "' )";
            dbConfig.getResultSet(sql, (result) => {
                getPhonemes((result) => {
                    callback(result);
                });
            });
        });
    });
}

var deletePhoneme = (id, callback) => {
    var sql = "DELETE from phonemes where id=" + id;
    dbConfig.getResultSet(sql, () => {
        getPhonemes((result) => {
            callback(result);
        });
    });
}

module.exports = {
    getPhonemes: getPhonemes,
    addPhoneme: addPhoneme,
    deletePhoneme: deletePhoneme
};