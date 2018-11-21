var mysql = require('mysql');
var commonUtil = require('./common-util');

const con = mysql.createConnection({
    host: "localhost",
    user: "phonics_user",
    password: "password",
    database: "phonics",
    insecureAuth: true
});
con.connect((err) => {
    if (err) throw err;
    console.log("Connected to db");
});

var getResultSet = (sql, callback) => {
    return new Promise(function (resolve, reject) {
        con.query(sql, (err, result, fields) => {
            console.log('query = ' + sql);
            console.log('query Result = ' + JSON.stringify(result));
            console.log('query err = ' + JSON.stringify(err));
            (commonUtil.isDefined(err)) ? reject(err) : resolve(result);
        });
    });
};

module.exports = {
    con: con,
    getResultSet: getResultSet
};