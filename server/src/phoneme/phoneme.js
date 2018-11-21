var dbConfig = require('../db-config');
var phonemeModel = require('./phoneme-model');
var phonemeUtil = require('./phoneme-utils');
var commonUtil = require('../common-util');
var customError = require('../custom-error');

var getPhonemeList = () => {
    return new Promise(function (resolve, reject) {
        phonemeUtil.getPhonemes()
            .then(function (phonemeList) {
                resolve(phonemeList);
            })
            .catch((error) => {
                reject(error);
            });
    })
};

var addPhoneme = (req) => {
    return new Promise(function (resolve, reject) {
        if (!commonUtil.isDefined(req.body))
            reject(new customError.customError('custom_0000'));
        if (!commonUtil.isDefined(req.body.name))
            reject(new customError.customError('custom_0001', ['name']));

        var body = req.body;
        phonemeUtil.addPhoneme(body.name)
            .then(function (phonemeList) {
                resolve(phonemeList);
            })
            .catch((error) => {
                reject(error);
            });
    })
};

var updatePhoneme = (req) => {
    return new Promise(function (resolve, reject) {
        if (!commonUtil.isDefined(req.params))
            reject(new customError.customError('custom_0003'));
        if (!commonUtil.isDefined(req.params.id) || req.params.id == "undefined")
            reject(new customError.customError('custom_0002', ['id']));
        if (!commonUtil.isDefined(req.body))
            reject(new customError.customError('custom_0000'));
        if (!commonUtil.isDefined(req.body.name))
            reject(new customError.customError('custom_0001', ['name']));
        if (!commonUtil.isDefined(req.body.orderNo))
            reject(new customError.customError('custom_0001', ['orderNo']));

        var params = req.params;
        var body = req.body;
        phonemeUtil.updatePhoneme(params.id, body.name, body.orderNo - 1)
            .then(function (phonemeList) {
                resolve(phonemeList);
            })
            .catch((error) => {
                reject(error);
            });
    })
};

var deletePhoneme = (req) => {
    return new Promise(function (resolve, reject) {
        if (!commonUtil.isDefined(req.params))
            reject(new customError.customError('custom_0003'));
        if (!commonUtil.isDefined(req.params.id) || req.params.id == "undefined")
            reject(new customError.customError('custom_0002', ['id']));

        var params = req.params;
        phonemeUtil.deletePhoneme(params.id)
            .then(function (phonemeList) {
                resolve(phonemeList);
            })
            .catch((error) => {
                reject(error);
            });
    })
};

var searchPhoneme = (req) => {
    return new Promise(function (resolve, reject) {
        var key = req.params.key;
        console.log('key = '+ key);
        phonemeUtil.searchPhonemes(key)
            .then(function (phonemeList) {
                resolve(phonemeList);
            })
            .catch((error) => {
                reject(error);
            });
    })
};

module.exports = {
    getPhonemeList,
    addPhoneme,
    updatePhoneme,
    deletePhoneme,
    searchPhoneme
};