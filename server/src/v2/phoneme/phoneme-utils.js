var dbConfig = require('../db-config');
var phonemeModel = require('./phoneme-model');
const sendErrorResponse = require('../../common-util').sendErrorResponse;

var getPhonemes = (req, res) => {
    var level = req.params.level;
    var sql = `call getPhonemesByLevel(${level})`;
    dbConfig.getResultSet(sql)
        .then((result) => {
            var extractedResults = phonemeModel.extractPhoneme(result);
            res.status(200).send({ phoneme: extractedResults });
        })
        .catch((error) => {
            var responseError = sendErrorResponse(error);
            res.status(responseError.statusCode).send(responseError.error);
        });
}

var searchPhonemes = (req, res) => {
    var key = req.params.key;
    var level = req.params.level;
    var sql = `call searchPhonemeByLevel(${level}, '${key}')`;
    dbConfig.getResultSet(sql)
        .then((result) => {
            var extractedResults = phonemeModel.extractPhoneme(result);
            res.status(200).send({ phoneme: extractedResults });
        })
        .catch((error) => {
            var responseError = sendErrorResponse(error);
            res.status(responseError.statusCode).send(responseError.error);
        });
}

module.exports = {
    getPhonemes,
    searchPhonemes
};