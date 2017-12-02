var PhonicsService = {
    getWords: (id) => {
        var url = AppConfig.baseUrl + '/' + id;
        var xmlHttp = RequestProcessor.getRequest(url, PhonicsService.printResults);
    },

    getWordDetails: (id, wordId) => {
        var url = AppConfig.baseUrl + '/' + id + '/' + wordId;
        var xmlHttp = RequestProcessor.getRequest(url, PhonicsService.printResults);
    },

    addWord: (id, data) => {
        var url = AppConfig.baseUrl + '/' + id;
        var xmlHttp = RequestProcessor.postRequest(url, data, PhonicsService.printResults);
    },

    updateWord: (id, wordId, data) => {
        var url = AppConfig.baseUrl + '/' + id + '/' + wordId;
        var xmlHttp = RequestProcessor.putRequest(url, data, PhonicsService.printResults);
    },

    deletePhoneme: (id, wordId) => {
        var url = AppConfig.baseUrl + '/' + id + '/' + wordId;
        var xmlHttp = RequestProcessor.deleteRequest(url, PhonicsService.printResults);
    },

    printResults: (xmlHttp) => {
        console.log(xmlHttp.responseText);
    }
};