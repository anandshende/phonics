var dbConfig = require('./db-config');
var common = require('./common-util');

var getWords = (id, callback) => {
    var sql = "SELECT * FROM words WHERE phoneme_id=" + id + ";";
    dbConfig.getResultSet(sql, (result) => {
        callback(common.extractWord(result));
    });
};

var getWordDetails = () => {
    var op = 'get word details';
    console.log(op);
    return op;
};

var addWord = () => {
    var op = 'add word';
    console.log(op);
    return op;
};

var orderWords = () => {
    var op = 'order words';
    console.log(op);
    return op;
};

var deleteWord = () => {
    var op = 'delete word';
    console.log(op);
    return op;
};

module.exports = {
    getWords: getWords,
    getWordDetails: getWordDetails,
    addWord: addWord,
    orderWords: orderWords,
    deleteWord: deleteWord
};