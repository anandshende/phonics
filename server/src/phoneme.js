var dbConfig = require('./db-config');
var common = require('./common-util');
var phonemeModel = require('./phoneme-model');

var getPhonemeList = (callback) => {
    var sql = "SELECT * FROM phonemes";
    dbConfig.getResultSet(sql, (result) => {
        callback( phonemeModel.extractPhoneme(result) );
    });
};

var addPhonemeList = () => {
    var op = 'add phoneme';
    console.log(op);
    return op;
};

var orderPhonemeList = () => {
    var op = 'order phoneme';
    console.log(op);
    return op;
};

var deletePhoneme = () => {on
    var op = 'delete phoneme';
    console.log(op);
    return op;
};

module.exports = {
    getPhonemeList: getPhonemeList,
    addPhonemeList: addPhonemeList,
    orderPhonemeList: orderPhonemeList,
    deletePhoneme: deletePhoneme
};