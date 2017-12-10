var WordModel = function () {
    this.id;
    this.name;
    this.orderNo;
    this.phonemeId;
};

WordModel.prototype.toModel = function (wordObj) {
    this.id = wordObj.id;
    this.name = wordObj.name;
    this.orderNo = wordObj.orderNo;    
    this.phonemeId = wordObj.phonemeId;
};

WordModel.prototype.toJson = function (wordObj) {
};