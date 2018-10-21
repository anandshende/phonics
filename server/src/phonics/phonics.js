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

module.exports = {
    getWordsWithLengthConstraints
};