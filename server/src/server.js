var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 2000;

app.listen(port, () => {
    console.log("Started server at port: "+ port);
});

require('./route')(app);


module.exports.app = app;
