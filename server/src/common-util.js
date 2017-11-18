var PhonemeModel = require('./phoneme-model');
var WordsModel = require('./words-model');

var extractPhoneme = (result) => {
    var extractedData = [];
    result.forEach(element => {
        var phonemeModel = new PhonemeModel.PhonemeModel();
        phonemeModel.id = element.id;
        phonemeModel.name = element.name;
        phonemeModel.order_no = element.order_no;
        phonemeModel.timestamp = element.timestamp;
        extractedData.push(phonemeModel);
    });
    return extractedData;
};

var extractWord = (result) => {
    var extractedData = [];
    result.forEach(element => {
        var wordsModel = new WordsModel.WordsModel();
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
    extractPhoneme: extractPhoneme,
    extractWord: extractWord
}