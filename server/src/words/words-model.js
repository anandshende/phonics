var WordsModel = function() {
    this.id;
    this.timestamp;
    this.orderNo;
    this.name;
    this.phoneme_id;
}

var extractWord = (result) => {
    var extractedData = [];
    result.forEach(element => {
        var wordsModel = new WordsModel();
        wordsModel.id = element.id;
        wordsModel.name = element.name;
        wordsModel.orderNo = element.order_no;
        wordsModel.timestamp = element.timestamp;
        wordsModel.phoneme_id = element.phoneme_id;
        extractedData.push(wordsModel);
    });
    return extractedData;
};

module.exports = {
    WordsModel: WordsModel,
    extractWord: extractWord
}