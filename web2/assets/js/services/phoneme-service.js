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
    },

    // V2 Services
    getV2Phonemes: function () {
        var level = LEVEL;
        var baseUrl = AppConfig.baseUrl;
        var url = `${baseUrl}/${level}/phoneme/`;
        return ReqProcessor.GET(url);
    },
    
    searchV2Phonemes: function (key) {
        var level = LEVEL;
        var baseUrl = AppConfig.baseUrl;
        var url = `${baseUrl}/v2/${level}/phoneme/search/${key}`;
        return ReqProcessor.GET(url);
    },
}