var PhonicsService = {
    getWordsWithLengthConstraints: function (length) {
        var url = AppConfig.baseUrl + '/phonics/length/' + length;
        return ReqProcessor.GET(url);
    },

    searchWordsBasedKeyAndLength: function (key, length) {
        var url = `${AppConfig.baseUrl}/phonics/search/${key}/${length}`;
        return ReqProcessor.GET(url);
    }
};