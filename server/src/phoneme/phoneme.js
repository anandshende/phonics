var dbConfig = require('../db-config');
var phonemeModel = require('./phoneme-model');
var phonemeUtil = require('./phoneme-utils');

var getPhonemeList = (callback) => {
    phonemeUtil.getPhonemes((phonemeList) => {
        callback(phonemeList);
    });
};

var addPhoneme = (req, callback) => {
    var body = req.body;
    phonemeUtil.addPhoneme(body.name, (resultSet) => {
        callback(resultSet);
    });
};

var updatePhoneme = (req, callback) => {
    var params = req.params;
    phonemeUtil.updatePhoneme(params.id, params.name, params.orderNo, (resultSet) => {
        callback(resultSet);
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
    addPhoneme: addPhoneme,
    updatePhoneme: updatePhoneme,
    deletePhoneme: deletePhoneme
};