var ErrorHandler = function () {
    this.errorMap = new Map();

    this.errorMap.set(1062, 409);

    this.errorMap.set('custom_0000', 400);
    this.errorMap.set('custom_0001', 400);
    this.errorMap.set('custom_0002', 400);
    this.errorMap.set('custom_0003', 400);
    this.errorMap.set('custom_0004', 404);

    let _self = this;
    this.getErrorCode = function (errorCode) {
        return _self.errorMap.get(errorCode);
    };

    return this;
};

module.exports = {
    ErrorHandler: ErrorHandler
};