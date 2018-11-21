var dbConfig = require('../db-config');
var phonemeModel = require('./phoneme-model');

var getPhonemes = () => {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM phonemes ORDER BY `order_no` ASC";
        dbConfig.getResultSet(sql)
            .then((result) => {
                var extractedResults = phonemeModel.extractPhoneme(result);
                resolve(extractedResults);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

var addPhoneme = (name, callback) => {
    return new Promise(function (resolve, reject) {
        var sql = `CALL add_phoneme("${name}")`;
        dbConfig.getResultSet(sql)
            .then((result) => {
                getPhonemes()
                    .then((getResult) => {
                        var extractedResults = phonemeModel.extractPhoneme(getResult);
                        resolve(extractedResults);
                    })
            })
            .catch((error) => {
                reject(error);
            });
    });
}

var deletePhoneme = (id, callback) => {
    return new Promise(function (resolve, reject) {
        var sql = `CALL delete_phoneme(${id})`;
        dbConfig.getResultSet(sql)
            .then((result) => {
                getPhonemes()
                    .then((getResult) => {
                        var extractedResults = phonemeModel.extractPhoneme(getResult);
                        resolve(extractedResults);
                    })
            })
            .catch((error) => {
                reject(error);
            });
    });
}

var updatePhoneme = (id, name, orderNo, callback) => {
    return new Promise(function (resolve, reject) {
        var sql = `CALL update_phoneme(${id}, "${name}", ${orderNo})`;
        dbConfig.getResultSet(sql)
            .then((result) => {
                getPhonemes()
                    .then((getResult) => {
                        var extractedResults = phonemeModel.extractPhoneme(getResult);
                        resolve(extractedResults);
                    })
            })
            .catch((error) => {
                reject(error);
            });
    });
};

var searchPhonemes = (key) => {
    return new Promise(function (resolve, reject) {
        var sql = `SELECT * FROM phonemes where phonemes.name LIKE '%${key}%' ORDER BY Length(phonemes.name)`;
        dbConfig.getResultSet(sql)
            .then((result) => {
                var extractedResults = phonemeModel.extractPhoneme(result);
                console.log('extractedResults = ' + JSON.stringify(extractedResults));
                resolve(extractedResults);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

module.exports = {
    getPhonemes,
    addPhoneme,
    deletePhoneme,
    updatePhoneme,
    searchPhonemes
};