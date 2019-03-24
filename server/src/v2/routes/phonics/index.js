const phonicsRoutes = require('express').Router({ mergeParams: true });
const path = require('path');
const fs = require('fs');
const sendErrorResponse = require('../../../common-util').sendErrorResponse;
const customError = require('../../../custom-error').customError;

phonicsRoutes.get('/images', (req, res) => {
    var fileName = req.query.fileName;

    var cwd = __dirname;
    var filePath = path.join(cwd, '..', '..', '..', '..', 'imagesDB', `${fileName}`);
    console.log(filePath);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        var error = new customError('custom_0004');
        var responseError = sendErrorResponse(error);
        res.status(responseError.statusCode).send(responseError.error);
    }
});

module.exports = phonicsRoutes;