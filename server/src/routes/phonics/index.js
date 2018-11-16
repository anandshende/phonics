const phonicsRoutes = require('express').Router();
const phonics = require('../../phonics/phonics');
const sendErrorResponse = require('../../common-util').sendErrorResponse;

phonicsRoutes.get('/length/:number', (req, res) => {
    phonics.getWordsWithLengthConstraints(req)
        .then((phonicsDto) => {
            res.status(200).send({ phonics: phonicsDto });
        })
        .catch((error) => {
            var responseError = sendErrorResponse(error);
            res.status(responseError.statusCode).send(responseError.error);
        })
});

phonicsRoutes.get('/search/:key/:length', (req, res) => {
    phonics.searchWordsWithKeyAndLength(req)
        .then((phonicsDto) => {
            res.status(200).send({ phonics: phonicsDto });
        })
        .catch((error) => {
            var responseError = sendErrorResponse(error);
            res.status(responseError.statusCode).send(responseError.error);
        })
});

module.exports = phonicsRoutes;