var PhonemeService = {
    getPhonemes: function () {
        var baseUrl = AppConfig.baseUrl;
        var url = baseUrl + '/phoneme/';
        return ReqProcessor.GET(url);
    }
}