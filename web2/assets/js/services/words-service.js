var WordsService = {
    getWords: function (phonemeId) {
        var baseUrl = AppConfig.baseUrl;
        var url = baseUrl + '/words/' + phonemeId;
        return ReqProcessor.GET(url);
    }
}