var PhonemeModel = function () {
    this.id;
    this.timestamp;
    this.orderNo;
    this.name;
};

var extractPhoneme = (result) => {
    var extractedData = [];
    result.forEach(element => {
        var phonemeModel = new PhonemeModel();
        phonemeModel.id = element.id;
        phonemeModel.name = element.name;
        phonemeModel.orderNo = element.order_no;
        phonemeModel.timestamp = element.timestamp;
        extractedData.push(phonemeModel);
    });
    return extractedData;
};

module.exports = {
    PhonemeModel: PhonemeModel,
    extractPhoneme: extractPhoneme
}