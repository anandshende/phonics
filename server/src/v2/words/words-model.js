var CommonUtil = require('../../common-util');

var WordsModel = function () {
    this.id;
    this.timestamp;
    this.orderNo;
    this.name;
    this.imageUrl;
    this.phonemeId;
}

var extractWord = (result) => {
    var extractedData = [];
    result.forEach(element => {
        var wordsModel = new WordsModel();
        wordsModel.id = element.id;
        wordsModel.name = element.name;
        wordsModel.orderNo = element.order_no;
        wordsModel.timestamp = element.timestamp;
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