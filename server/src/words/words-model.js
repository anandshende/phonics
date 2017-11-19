var WordsModel = function() {
    this.id;
    this.timestamp;
    this.order_no;
    this.name;
    this.phoneme_id;
}

var extractWord = (result) => {
    var extractedData = [];
    result.forEach(element => {
        var wordsModel = new WordsModel();
        wordsModel.id = element.id;
        wordsModel.name = element.name;
        wordsModel.order_no = element.order_no;
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