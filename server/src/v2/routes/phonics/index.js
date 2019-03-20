const phonicsRoutes = require('express').Router({mergeParams: true});
const phonics = require('../../phonics/phonics');
const path = require('path');
const fs = require('fs');
const sendErrorResponse = require('../../../common-util').sendErrorResponse;
const customError = require('../../../custom-error').customError;

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

phonicsRoutes.get('/images', (req, res) => {
    var fileName = req.query.fileName;

    var cwd = __dirname;
    var filePath = path.join(cwd, '..', '..', '..', 'imagesDB', `${fileName}`);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        var error = new customError('custom_0004');
        var responseError = sendErrorResponse(error);
        res.status(responseError.statusCode).send(responseError.error);
    }
});

module.exports = phonicsRoutes;