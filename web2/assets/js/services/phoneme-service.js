var PhonemeService = {
    getPhonemes: function () {
        var baseUrl = AppConfig.baseUrl;
        var url = baseUrl + '/phoneme/';
        return ReqProcessor.GET(url);
    },

    searchPhonemes: function (key) {
        var baseUrl = AppConfig.baseUrl;
        var url = baseUrl + '/phoneme/search/' + key;
        return ReqProcessor.GET(url);
    }
}