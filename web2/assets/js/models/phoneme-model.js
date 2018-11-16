var PhonemeModel = function (phonemeObj) {
    this.phonemeId = phonemeObj.id;
    this.phonemeName = phonemeObj.name;
    this.phonemeOrderNo = phonemeObj.orderNo;
};

PhonemeModel.prototype.toJson = function (phonemeObj) {
    this.name = phonemeObj.phonemeName;
    this.orderNo = phonemeObj.phonemeOrderNo;
};