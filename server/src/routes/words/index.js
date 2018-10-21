const wordRoutes = require('express').Router();
var words = require('../../words/words');
const sendErrorResponse = require('../../common-util').sendErrorResponse;

wordRoutes.get('/:phonemeId', (req, res) => {
    // Get Words
    words.getWordsList(req)
        .then((wordsDto) => {
            res.send({ words: wordsDto });
        })
        .catch((error) => {
            var responseError = sendErrorResponse(error);
            res.status(responseError.statusCode).send(responseError.error);
        })
});

wordRoutes.get('/:phonemeId/:wordId', (req, res) => {
    // Get Word Details
    words.getWordDetails(req)
        .then((wordsDto) => {
            res.send({ words: wordsDto });
        })
        .catch((error) => {
            var responseError = sendErrorResponse(error);
            res.status(responseError.statusCode).send(responseError.error);
        })
});

wordRoutes.post('/:phonemeId', (req, res) => {
    // Add Word
    // phoneme_id, name
    words.addWord(req)
        .then((wordsDto) => {
            res.send({ words: wordsDto });
        })
        .catch((error) => {
            var responseError = sendErrorResponse(error);
            res.status(responseError.statusCode).send(responseError.error);
        })
});

wordRoutes.put('/:phonemeId/:wordId', (req, res) => {
    // Update Words 
    // phonemeId, wordId, name, order_no
    words.updateWord(req)
        .then((wordsDto) => {
            res.send({ words: wordsDto });
        })
        .catch((error) => {
            var responseError = sendErrorResponse(error);
            res.status(responseError.statusCode).send(responseError.error);
        })
});

wordRoutes.delete('/:phonemeId/:wordId', (req, res) => {
    // Delete Words
    // phonemeId, wordId
    words.deleteWord(req)
        .then((wordsDto) => {
            res.send({ words: wordsDto });
        })
        .catch((error) => {
            var responseError = sendErrorResponse(error);
            res.status(responseError.statusCode).send(responseError.error);
        })
});

module.exports = wordRoutes;