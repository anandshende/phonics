module.exports = (app) => {

    // Phoneme
    var phoneme = require('./phoneme');
    
    app.get('/phoneme', (req, res) => {
        res.end(phoneme.getPhonemeList());
    });

    app.post('/phoneme', (req, res) => {
        res.end(phoneme.addPhonemeList());
    });

    app.put('/phoneme/:id', (req, res) => {
        res.end(phoneme.orderPhonemeList());
    });

    app.delete('/phoneme/:id', (req, res) => {
        res.end(phoneme.deletePhoneme());
    });


    // Words
    var words = require('./words');

    app.get('/phoneme/:id', (req, res) => {
        res.end(words.getWords());
    });

    app.get('/phoneme/:id/:wordId', (req, res) => {
        res.end(words.getWordDetails());
    });

    app.post('/phoneme/:id', (req, res) => {
        res.end(words.addWord());
    });

    app.put('/phoneme/:id/:wordId', (req, res) => {
        res.end(words.orderWords());
    });

    app.delete('/phoneme/:id/:wordId', (req, res) => {
        res.end(words.deleteWord());
    });
};