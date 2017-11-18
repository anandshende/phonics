var PhonemeModel = function() {
    this.id;
    this.timestamp;
    this.order_no;
    this.name;
};

var extractPhoneme = (result) => {
    var extractedData = [];
    result.forEach(element => {
        var phonemeModel = new PhonemeModel();
        phonemeModel.id = element.id;
        phonemeModel.name = element.name;
        phonemeModel.order_no = element.order_no;
        phonemeModel.timestamp = element.timestamp;
        extractedData.push(phonemeModel);
    });
    return extractedData;
};

module.exports = {
    PhonemeModel: PhonemeModel,
    extractPhoneme: extractPhoneme
}