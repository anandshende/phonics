module.exports = (app) => {

    // Phoneme
    var phoneme = require('./phoneme');

    app.get('/phoneme', (req, res) => {
        // Get Phonemes

        phoneme.getPhonemeList((result) => {
            var string = "";
            result.forEach(element => {
                string = string + element.name + "  ";
            });
            res.end(string);
        })
    });

    app.post('/phoneme', (req, res) => {
        // Add Phoneme

        res.end(phoneme.addPhonemeList());
    });

    app.put('/phoneme/:id', (req, res) => {
        // Order Phoneme's List
        
        res.end(phoneme.orderPhonemeList());
    });

    app.delete('/phoneme/:id', (req, res) => {
        // Delete Phonemes

        res.end(phoneme.deletePhoneme());
    });


    // Words
    var words = require('./words');

    app.get('/phoneme/:id', (req, res) => {
        // Get Words
        
        words.getWords(req.params.id, (result) => {
            var string = "";
            result.forEach(element => {
                string = string + element.name + "  ";
            });
            res.end(string);
        });
    });

    app.get('/phoneme/:id/:wordId', (req, res) => {
        // Get Word Details

        res.end(words.getWordDetails());
    });

    app.post('/phoneme/:id', (req, res) => {
        // Add Word
        res.end(words.addWord());
    });

    app.put('/phoneme/:id/:wordId', (req, res) => {
        // Order Words 

        res.end(words.orderWords());
    });

    app.delete('/phoneme/:id/:wordId', (req, res) => {
        // Delete Words

        res.end(words.deleteWord());
    });
};