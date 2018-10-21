const phonicsRoutes = require('express').Router();
const phonics = require('../../phonics/phonics');
const sendErrorResponse = require('../../common-util').sendErrorResponse;

phonicsRoutes.get('/length/:number', (req, res) => {
    phonics.getWordsWithLengthConstraints(req)
        .then((phonicsDto) => {
            res.send({ phonics: phonicsDto });
        })
        .catch((error) => {
            var responseError = sendErrorResponse(error);
            res.status(responseError.statusCode).send(responseError.error);
        })
});

module.exports = phonicsRoutes;