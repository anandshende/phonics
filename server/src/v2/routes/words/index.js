const wordRoutes = require('express').Router({ mergeParams: true });
var words = require('../../words/words');
const sendErrorResponse = require('../../../common-util').sendErrorResponse;

wordRoutes.get('/:phonemeId', (req, res) => {
    // Get Words
    words.getWordsList(req, res);
});

module.exports = wordRoutes;