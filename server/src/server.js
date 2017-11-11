var express = require('express');

var app = express();

const port = 2000;

app.listen(port, () => {
    console.log("Started server at port: "+ port);
});

require('./route')(app);
