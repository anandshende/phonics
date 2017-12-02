var PhonicsService = {
    getPhonemes: () => {
        var url = AppConfig.baseUrl;
        var xmlHttp = RequestProcessor.getRequest(url, PhonicsService.printResults);
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