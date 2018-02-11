var commonUtils = require('./common-util');

module.exports = {
    custom_0000: 'Illegal Content-Type',
    custom_0001: 'Parameter {0} missing',
    custom_0002: 'Incorrect URL - {0} missing',
    custom_0003: 'Path Parameters missing',


    getMessage: function (errorCode, values) {
        var messageText;
        if (errorCode != null && errorCode != '') {
            messageText = this[errorCode];
            if (values != null && values.length > 0 && (messageText.indexOf('{') > -1 && messageText.indexOf('}') > -1)) {
                for (let cnt = 0; cnt <= values.length - 1; cnt++) {
                    let token = "\{" + cnt + "\}";
                    messageText = messageText.replace(token, values[cnt]);
                }
            }
        }
        return messageText;
    }
};