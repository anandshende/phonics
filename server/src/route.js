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
        phoneme.addPhonemeList(req, (phonemeDto) => {
            res.send({ phoneme: phonemeDto });
        })
    });

    app.put('/phoneme/:id', (req, res) => {
        // Order Phoneme's List

        res.end(phoneme.orderPhonemeList().toString());
    });

    app.delete('/phoneme/:id', (req, res) => {
        // Delete Phonemes

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
        res.end(words.addWord().toString());
    });

    app.put('/phoneme/:id/:wordId', (req, res) => {
        // Order Words 

        res.end(words.orderWords().toString());
    });

    app.delete('/phoneme/:id/:wordId', (req, res) => {
        // Delete Words

        res.end(words.deleteWord().toString());
    });
};