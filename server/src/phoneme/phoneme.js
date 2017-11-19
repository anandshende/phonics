var dbConfig = require('../db-config');
var phonemeModel = require('./phoneme-model');
var phonemeUtil = require('./phoneme-utils');

var getPhonemeList = (callback) => {
    phonemeUtil.getPhonemes((phonemeList) => {
        callback(phonemeList);
    });
};

var addPhonemeList = (req, callback) => {
    var body = req.body;
    phonemeUtil.addPhoneme(body.name, (resultSet) => {
        callback(resultSet);
    });
};

var orderPhonemeList = () => {
    var params = req.params;
    var sql = "update phonemes set order_no=order_no+1 where id> (Select order_no from phonemes where id=" + params.id + ")";
    dbConfig.getResultSet(sql, (result) => {
        sql = ""
        dbConfig.getResultSet(sql, (result) => {
            callback('1 row affected');
        });
    });
};

var deletePhoneme = (req, callback) => {
    var params = req.params;
    phonemeUtil.deletePhoneme(params.id, (resultSet) => {
        callback(resultSet);
    });
};

module.exports = {
    getPhonemeList: getPhonemeList,
    addPhonemeList: addPhonemeList,
    orderPhonemeList: orderPhonemeList,
    deletePhoneme: deletePhoneme
};