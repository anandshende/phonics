var mysql = require('mysql');

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
    return con.query(sql, (err, result, fields) => {
        if (err) throw err;
        callback(result);
    });
};

module.exports = {
    con: con,
    getResultSet: getResultSet
};