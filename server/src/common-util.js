var fs = require('fs');
var path = require('path');
var errorHandler = require('./error-handler').ErrorHandler();

module.exports = {

    isDefined: function (obj) {
        return (typeof obj == undefined || obj == null) ? false : true;
    },

    sendErrorResponse: function (error) {
        console.log(error);
        var statusCode = errorHandler.getErrorCode(error.errno);
        return { statusCode, error };
    },

    getImage: function (name) {
        var fileTypes = ['jpeg', 'jpg', 'png', 'gif'];
        var cwd = __dirname;

        for (var i = 0; i < fileTypes.length; i++) {
            var filePath = path.join(cwd, '..', 'imagesDB', `${name}.${fileTypes[i]}`);
            console.log('filePath = ' + filePath);
            if (fs.existsSync(filePath)) {
                return path.basename(filePath);
            }
        }
        return undefined;
    }
}