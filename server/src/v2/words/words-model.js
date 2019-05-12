var CommonUtil = require('../../common-util');

var WordsModel = function () {
    this.id;
    this.level;
    this.name;
    this.imageUrl;
    this.phonemeId;
}

var extractWord = (result) => {
    var extractedData = [];
    result[0].forEach(element => {
        var wordsModel = new WordsModel();
        wordsModel.level = element.level;
        wordsModel.id = element.id;
        wordsModel.name = element.word;
        wordsModel.phonemeId = element.phoneme_id;

        wordsModel.imageUrl =  CommonUtil.getImage(wordsModel.name);

        extractedData.push(wordsModel);
    });
    return extractedData;
};

module.exports = {
    WordsModel: WordsModel,
    extractWord: extractWord
}