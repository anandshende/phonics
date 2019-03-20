const phonemeRoutes = require('express').Router({mergeParams: true});
const phoneme = require('../../phoneme/phoneme');

phonemeRoutes.get('/', (req, res) => {
    // Get Phonemes
    phoneme.getPhonemeList(req, res);
});

phonemeRoutes.get('/search/:key', (req, res) => {
    phoneme.searchPhoneme(req, res);
});

module.exports = phonemeRoutes;