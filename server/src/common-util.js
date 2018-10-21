module.exports = {

    isDefined: function(obj) {
        return (typeof obj == undefined || obj == null) ? false : true;
    },

    sendErrorResponse: function(error) {
        console.log(error);
        var statusCode = errorHandler.getErrorCode(error.errno);
        return { statusCode, error };
    }
}