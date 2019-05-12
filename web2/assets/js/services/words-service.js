var WordsService = {
    getWords: function (phonemeId) {
        var baseUrl = AppConfig.baseUrl;
        var url = baseUrl + '/words/' + phonemeId;
        return ReqProcessor.GET(url);
    },

    // V2 Services
    getV2Words: function (phonemeId) {
        var level = LEVEL;
        var baseUrl = AppConfig.baseUrl;
        var url = `${baseUrl}/v2/${level}/words/${phonemeId}`;
        return ReqProcessor.GET(url);
    }
};