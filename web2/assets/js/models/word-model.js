var WordModel = function (wordObj) {
    this.wordId = wordObj.id;
    this.wordName = wordObj.name;
    this.wordOrderNo = wordObj.orderNo;
    this.wordPhonemeId = wordObj.phonemeId;
};

WordModel.prototype.toJson = function (wordObj) {
    this.name = wordObj.name;
    this.orderNo = wordObj.orderNo;
};