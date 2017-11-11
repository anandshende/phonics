module.exports = (app) => {

    // Phoneme
    app.get('/phoneme', (req, res) => {
        res.end('get phoneme list');
    });

    app.post('/phoneme', (req, res) => {
        res.end('add phoneme');
    });

    app.put('/phoneme/:id', (req, res) => {
        res.end('order phoneme');
    });

    app.delete('/phoneme/:id', (req, res) => {
        res.end('delete phoneme');
    });


    // Words
    app.get('/phoneme/:id', (req, res) => {
        res.end('get words list');
    });

    app.get('/phoneme/:id/:wordId', (req, res) => {
        res.end('get words assests');
    });

    app.post('/phoneme/:id', (req, res) => {
        res.end('add word');
    });

    app.put('/phoneme/:id/:wordId', (req, res) => {
        res.end('order words');
    });

    app.delete('/phoneme/:id/:wordId', (req, res) => {
        res.end('delete word');
    });
};