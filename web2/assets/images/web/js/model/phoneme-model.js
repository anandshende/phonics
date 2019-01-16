var PhonemeModel = function () {
    this.id;
    this.name;
    this.orderNo;
};

PhonemeModel.prototype.toModel = function (phonemeObj) {
    this.id = phonemeObj.id;
    this.name = phonemeObj.name;
    this.orderNo = phonemeObj.orderNo;
};

PhonemeModel.prototype.toJson = function (phonemeObj) {
    this.name = phonemeObj.name;
    this.orderNo = phonemeObj.orderNo;
};