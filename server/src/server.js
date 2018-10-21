var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');

var app = express();
app.use(bodyParser.json());

const port = 2000;

app.listen(port, () => {
    console.log("Started server at port: " + port);
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!');
})

app.use('/', routes);

// require('./route')(app);


module.exports.app = app;
