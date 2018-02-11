var messageService = require('./message-service');

module.exports = {
    customError: function (errno, values) {
        let errorText = messageService.getMessage(errno, values);
        return { errno, errorText };
    }
};