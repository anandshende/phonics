var phonicsUtil = require('./phonics-utils');

var getWordsWithLengthConstraints = (req) => {
    var number = req.params.number;
    return new Promise(function (resolve, reject) {
        phonicsUtil.getWordsWithLengthConstraints(number)
            .then(function (list) {
                resolve(list);
            })
            .catch((error) => {
                reject(error);
            });
    })
};

var searchWordsWithKeyAndLength = (req) => {
    var key = req.params.key;
    var length = req.params.length;
    return new Promise(function (resolve, reject) {
        phonicsUtil.searchWordsWithKeyAndLength(key, length)
            .then(function (list) {
                resolve(list);
            })
            .catch((error) => {
                reject(error);
            });
    })
};

module.exports = {
    getWordsWithLengthConstraints,
    searchWordsWithKeyAndLength
};