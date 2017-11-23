module.exports = (app) => {

    // Phoneme
    var phoneme = require('./phoneme/phoneme');

    app.get('/phoneme', (req, res) => {
        // Get Phonemes
        phoneme.getPhonemeList((phonemeDto) => {
            res.send({ phoneme: phonemeDto });
        })
    });

    app.post('/phoneme', (req, res) => {
        // Add Phoneme
        // requires 'name'
        phoneme.addPhoneme(req, (phonemeDto) => {
            res.send({ phoneme: phonemeDto });
        })
    });

    app.put('/phoneme/:id', (req, res) => {
        // Update Phoneme
        // requires 'id', 'name', 'order_no'
        phoneme.updatePhoneme(req, (phonemeDto) => {
            res.send({ phoneme: phonemeDto });
        })
    });

    app.delete('/phoneme/:id', (req, res) => {
        // Delete Phonemes
        // requires 'id'
        phoneme.deletePhoneme(req, (phonemeDto) => {
            res.send({ phoneme: phonemeDto });
        });
    });


    // Words
    var words = require('./words/words');

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
        res.end(words.getWordDetails().toString());
    });

    app.post('/phoneme/:id', (req, res) => {
        // Add Word
        // phoneme_id, name
        res.end(words.addWord().toString());
    });

    app.put('/phoneme/:id/:wordId', (req, res) => {
        // Update Words 
        // id, phoneme_id, name, order_no
        res.end(words.orderWords().toString());
    });

    app.delete('/phoneme/:id/:wordId', (req, res) => {
        // Delete Words
        // id, phoneme_id
        res.end(words.deleteWord().toString());
    });
};