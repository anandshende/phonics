var PhonicsModel = function() {
    this.id;
    this.timestamp;
    this.orderNo;
    this.name;
    this.phonemeId;
};

var extractPhonics = (result) => {
    var extractedData = [];
    result.forEach(element => {
        var phonicsModel = new PhonicsModel();
        phonicsModel.id = element.id;
        phonicsModel.name = element.name;
        phonicsModel.orderNo = element.order_no;
        phonicsModel.timestamp = element.timestamp;
        phonicsModel.phonemeId = element.phonemeId;
        extractedData.push(phonicsModel);
    });
    return extractedData;
};

module.exports = {
    PhonicsModel,
    extractPhonics
};