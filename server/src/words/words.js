var wordsUtil = require('./word-utils');
var customError = require('../custom-error');

var getWordsList = (req) => {
    return new Promise(function (resolve, reject) {
        if (!commonUtil.isDefined(req.params))
            reject(new customError.customError('custom_0003'));
        if (!commonUtil.isDefined(req.params.phonemeId) || req.params.phonemeId == "undefined")
            reject(new customError.customError('custom_0002', ['phonemeId']));

        var params = req.params;
        wordsUtil.getWordsList(params.phonemeId)
            .then(function (wordsList) {
                resolve(wordsList);
            })
            .catch((error) => {
                reject(error);
            });
    })
};

var getWordDetails = (req) => {
    return new Promise(function (resolve, reject) {
        if (!commonUtil.isDefined(req.params))
            reject(new customError.customError('custom_0003'));
        if (!commonUtil.isDefined(req.params.phonemeId) || req.params.phonemeId == "undefined")
            reject(new customError.customError('custom_0002', ['id']));

        var params = req.params;
        wordsUtil.getWordDetails(params.phonemeId)
            .then(function (wordsList) {
                resolve(wordsList);
            })
            .catch((error) => {
                reject(error);
            });
    })
};

var addWord = (req) => {
    return new Promise(function (resolve, reject) {
        if (!commonUtil.isDefined(req.params))
            reject(new customError.customError('custom_0003'));
        if (!commonUtil.isDefined(req.params.phonemeId) || req.params.phonemeId == "undefined")
            reject(new customError.customError('custom_0002', ['phonemeId']));
        if (!commonUtil.isDefined(req.body))
            reject(new customError.customError('custom_0000'));
        if (!commonUtil.isDefined(req.body.name))
            reject(new customError.customError('custom_0001', ['name']));

        var params = req.params;
        var body = req.body;
        wordsUtil.addWord(params.phonemeId, body.name)
            .then(function (wordsList) {
                resolve(wordsList);
            })
            .catch((error) => {
                reject(error);
            });
    })
};

var updateWord = (req) => {
    return new Promise(function (resolve, reject) {
        if (!commonUtil.isDefined(req.params))
            reject(new customError.customError('custom_0003'));
        if (!commonUtil.isDefined(req.params.wordId) || req.params.wordId == "undefined")
            reject(new customError.customError('custom_0002', ['wordId']));
        if (!commonUtil.isDefined(req.params.phonemeId) || req.params.phonemeId == "undefined")
            reject(new customError.customError('custom_0002', ['phonemeId']));
        if (!commonUtil.isDefined(req.body))
            reject(new customError.customError('custom_0000'));
        if (!commonUtil.isDefined(req.body.name))
            reject(new customError.customError('custom_0001', ['name']));
        if (!commonUtil.isDefined(req.body.orderNo))
            reject(new customError.customError('custom_0001', ['orderNo']));

        var params = req.params;
        var body = req.body;
        wordsUtil.updateWord(params.wordId, params.phonemeId, body.name, body.orderNo - 1)
            .then(function (wordsList) {
                resolve(wordsList);
            })
            .catch((error) => {
                reject(error);
            });
    })
};

var deleteWord = (req) => {
    return new Promise(function (resolve, reject) {
        if (!commonUtil.isDefined(req.params))
            reject(new customError.customError('custom_0003'));
        if (!commonUtil.isDefined(req.params.wordId) || req.params.wordId == "undefined")
            reject(new customError.customError('custom_0002', ['wordId']));
        if (!commonUtil.isDefined(req.params.phonemeId) || req.params.phonemeId == "undefined")
            reject(new customError.customError('custom_0002', ['phonemeId']));

        var params = req.params;
        wordsUtil.deleteWord(params.wordId, params.phonemeId)
            .then(function (wordsList) {
                resolve(wordsList);
            })
            .catch((error) => {
                reject(error);
            });
    })
};

module.exports = {
    getWordsList: getWordsList,
    getWordDetails: getWordDetails,
    addWord: addWord,
    updateWord: updateWord,
    deleteWord: deleteWord
};