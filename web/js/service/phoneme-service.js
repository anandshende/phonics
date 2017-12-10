var PhonemeService = {

    getPhonemes: (callback) => {
        var url = AppConfig.baseUrl;
        RequestProcessor.getRequest(url, (phonemeJSON) => {
            var output = [];
            phonemeObj = phonemeJSON.phoneme;
            phonemeObj.forEach(function (element, index) {
                var phonemeModel = new PhonemeModel();
                phonemeModel.toModel(element);
                output.push(phonemeModel);
            });
            callback(output);
        });
    },

    addPhoneme: (data) => {
        var url = AppConfig.baseUrl;
        var xmlHttp = RequestProcessor.postRequest(url, data, PhonicsService.printResults);
    },

    updatePhoneme: (id, data) => {
        var url = AppConfig.baseUrl + '/' + id;
        var xmlHttp = RequestProcessor.putRequest(url, data, PhonicsService.printResults);
    },

    deletePhoneme: (id) => {
        var url = AppConfig.baseUrl + '/' + id;
        var xmlHttp = RequestProcessor.deleteRequest(url, PhonicsService.printResults);
    },

    printResults: (xmlHttp) => {
        console.log(xmlHttp.responseText);
    }
};