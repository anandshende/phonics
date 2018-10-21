var phonicsUtil = require('./phonics-utils');

var getTwoLetterWords = () => {
    return new Promise(function (resolve, reject) {
        phonicsUtil.getTwoLetterWords()
            .then(function (list) {
                resolve(list);
            })
            .catch((error) => {
                reject(error);
            });
    })
};

module.exports = {
    getTwoLetterWords
};