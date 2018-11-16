const phonemeRoutes = require('express').Router();
const phoneme = require('../../phoneme/phoneme');
const sendErrorResponse = require('../../common-util').sendErrorResponse;

phonemeRoutes.get('/', (req, res) => {
    // Get Phonemes
    phoneme.getPhonemeList()
        .then(function (phonemeDto) {
            res.status(200).send({ phoneme: phonemeDto });
        })
        .catch((error) => {
            var responseError = sendErrorResponse(error);
            res.status(responseError.statusCode).send(responseError.error);
        });
});

phonemeRoutes.post('/', (req, res) => {
    // Add Phoneme
    // requires 'name'
    phoneme.addPhoneme(req)
        .then((phonemeDto) => {
            res.status(200).send({ phoneme: phonemeDto });
        })
        .catch((error) => {
            var responseError = sendErrorResponse(error);
            res.status(responseError.statusCode).send(responseError.error);
        })
});

phonemeRoutes.put('/:id', (req, res) => {
    // Update Phoneme
    // requires 'id', 'name', 'order_no'
    phoneme.updatePhoneme(req)
        .then((phonemeDto) => {
            res.status(200).send({ phoneme: phonemeDto });
        })
        .catch((error) => {
            var responseError = sendErrorResponse(error);
            res.status(responseError.statusCode).send(responseError.error);
        })
});

phonemeRoutes.delete('/:id', (req, res) => {
    // Delete Phonemes
    // requires 'id'
    phoneme.deletePhoneme(req)
        .then((phonemeDto) => {
            res.status(200).send({ phoneme: phonemeDto });
        })
        .catch((error) => {
            var responseError = sendErrorResponse(error);
            res.status(responseError.statusCode).send(responseError.error);
        })
});

module.exports = phonemeRoutes;