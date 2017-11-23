var wordsUtil = require('./word-utils');

var getWordsList = (req, callback) => {
    var params = req.params;
    wordsUtil.getWordsList(params.id, (wordsList) => {
        callback(wordsList);
    });
};

var getWordDetails = (req, callback) => {
    var params = req.params;
    wordsUtil.getWordDetails(params.id, (wordsList) => {
        callback(wordsList);
    });
};

var addWord = (req, callback) => {
    var params = req.params;
    var body = req.body;
    wordsUtil.addWord(params.id, body.name, (wordsList) => {
        callback(wordsList);
    });
};

var updateWord = (req, callback) => {
    var params = req.params;
    var body = req.body;
    wordsUtil.updateWord(params.wordId, params.id, body.name, body.orderNo, (wordsList) => {
        callback(wordsList);
    });
};

var deleteWord = (req, callback) => {
    var params = req.params;
    wordsUtil.deleteWord(params.wordId, params.id, (wordsList) => {
        callback(wordsList);
    });
};

module.exports = {
    getWordsList: getWordsList,
    getWordDetails: getWordDetails,
    addWord: addWord,
    updateWord: updateWord,
    deleteWord: deleteWord
};