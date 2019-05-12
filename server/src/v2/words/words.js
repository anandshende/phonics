var wordsUtil = require('./word-utils');
var customError = require('../../custom-error');
var commonUtil = require('../../common-util');

var getWordsList = (req, res) => {
    var error = null;
    if (!commonUtil.isDefined(req.params))
        error = new customError.customError('custom_0003');
    if (!commonUtil.isDefined(req.params.level) || req.params.level == "undefined")
        error = new customError.customError('custom_0002', ['level']);
    if (!commonUtil.isDefined(req.params.phonemeId) || req.params.phonemeId == "undefined")
        error = new customError.customError('custom_0002', ['phonemeId']);

    if (error) {
        var responseError = sendErrorResponse(error);
        res.status(responseError.statusCode).send(responseError.error);
        return;
    }


    wordsUtil.getWordsList(req, res);
};

module.exports = {
    getWordsList
};