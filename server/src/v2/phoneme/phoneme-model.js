var PhonemeModel = function () {
    this.id;
    this.name;
};

var extractPhoneme = (result) => {
    var extractedData = [];
    result[0].forEach(element => {
        var phonemeModel = new PhonemeModel();
        phonemeModel.id = element.id;
        phonemeModel.name = element.name;
        extractedData.push(phonemeModel);
    });
    return extractedData;
};

module.exports = {
    PhonemeModel: PhonemeModel,
    extractPhoneme: extractPhoneme
}