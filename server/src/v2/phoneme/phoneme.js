var dbConfig = require('../db-config');
var phonemeModel = require('./phoneme-model');
var phonemeUtil = require('./phoneme-utils');
var commonUtil = require('../../common-util');
var customError = require('../../custom-error');

var getPhonemeList = (req, res) => {
    phonemeUtil.getPhonemes(req, res);
};

var searchPhoneme = (req, res) => {
    phonemeUtil.searchPhonemes(req, res);
};

module.exports = {
    getPhonemeList,
    searchPhoneme
};