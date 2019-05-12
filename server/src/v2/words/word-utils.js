var dbConfig = require('../db-config');
var wordsModel = require('./words-model');

var getWordsList = (req, res) => {
    var params = req.params;
    var phonemeId = params.phonemeId;
    var level = params.level;
    var sql = `CALL getWordsByPhonemeIdAndLevel(${level}, ${phonemeId})`;
    dbConfig.getResultSet(sql)
        .then((result) => {
            var extractedResults = wordsModel.extractWord(result);
            res.status(200).send({ words: extractedResults });
        })
        .catch((error) => {
            var responseError = sendErrorResponse(error);
            res.status(responseError.statusCode).send(responseError.error);
        });
};

module.exports = {
    getWordsList
};