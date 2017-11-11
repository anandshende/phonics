module.exports = (app) => {
    app.get('/', (req, res) => {
        res.end('/');
    });

    app.get('/web', (req, res) => {
        res.end('/web');
    });
};