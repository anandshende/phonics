var errorHandlerFile = require('./error-handler');
var errorHandler = errorHandlerFile.ErrorHandler();
module.exports = (app) => {

    // Phoneme
    var phoneme = require('./phoneme/phoneme');

    app.get('/phoneme', (req, res) => {
        // Get Phonemes
        phoneme.getPhonemeList()
            .then(function (phonemeDto) {
                res.send({ phoneme: phonemeDto });
            })
            .catch((error) => {
                var responseError = sendErrorResponse(error);
                res.status(responseError.statusCode).send(responseError.error);
            });
    });

    app.post('/phoneme', (req, res) => {
        // Add Phoneme
        // requires 'name'
        phoneme.addPhoneme(req)
            .then((phonemeDto) => {
                res.send({ phoneme: phonemeDto });
            })
            .catch((error) => {
                var responseError = sendErrorResponse(error);
                res.status(responseError.statusCode).send(responseError.error);
            })
    });

    app.put('/phoneme/:id', (req, res) => {
        // Update Phoneme
        // requires 'id', 'name', 'order_no'
        phoneme.updatePhoneme(req)
            .then((phonemeDto) => {
                res.send({ phoneme: phonemeDto });
            })
            .catch((error) => {
                var responseError = sendErrorResponse(error);
                res.status(responseError.statusCode).send(responseError.error);
            })
    });

    app.delete('/phoneme/:id', (req, res) => {
        // Delete Phonemes
        // requires 'id'
        phoneme.deletePhoneme(req)
            .then((phonemeDto) => {
                res.send({ phoneme: phonemeDto });
            })
            .catch((error) => {
                var responseError = sendErrorResponse(error);
                res.status(responseError.statusCode).send(responseError.error);
            })
    });


    // Words
    var words = require('./words/words');

    app.get('/phoneme/:phonemeId', (req, res) => {
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

    app.get('/phoneme/:phonemeId/:wordId', (req, res) => {
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

    app.post('/phoneme/:phonemeId', (req, res) => {
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

    app.put('/phoneme/:phonemeId/:wordId', (req, res) => {
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

    app.delete('/phoneme/:phonemeId/:wordId', (req, res) => {
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
};

function sendErrorResponse(error) {
    console.log(error);
    var statusCode = errorHandler.getErrorCode(error.errno);
    return { statusCode, error };
}