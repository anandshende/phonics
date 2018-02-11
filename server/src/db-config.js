var mysql = require('mysql');
var commonUtil = require('./common-util');

const con = mysql.createConnection({
    host: "localhost",
    user: "anand",
    password: "1workbook",
    database: "phonics"
});
con.connect((err) => {
    if (err) throw err;
    console.log("Connected to db");
});

var getResultSet = (sql, callback) => {
    return new Promise(function (resolve, reject) {
        con.query(sql, (err, result, fields) => {
            (commonUtil.isDefined(err)) ? reject(err) : resolve(result);
        });
    });
};

module.exports = {
    con: con,
    getResultSet: getResultSet
};