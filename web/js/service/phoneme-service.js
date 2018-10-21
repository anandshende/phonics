var PhonemeService = {

    getPhonemes: function () {
        var _self = this;
        return new Promise(function (resolve, reject) {
            var url = AppConfig.baseUrl + '/phoneme/';
            RequestProcessor.getRequest(url).then((phonemeJSON) => {
                resolve(_self.extractPhonemes(phonemeJSON));
            });
        });
    },

    addPhoneme: function (data) {
        var _self = this;
        return new Promise(function (resolve, reject) {
            var url = AppConfig.baseUrl + '/phoneme/';
            RequestProcessor.postRequest(url, data).then((phonemeJSON) => {
                resolve(_self.extractPhonemes(phonemeJSON));
            });
        });
    },

    updatePhoneme: function (id, data) {
        var _self = this;
        return new Promise(function (resolve, reject) {
            var url = AppConfig.baseUrl + '/phoneme/' + '/' + id;
            RequestProcessor.putRequest(url, data).then((phonemeJSON) => {
                resolve(_self.extractPhonemes(phonemeJSON));
            });
        });
    },

    deletePhoneme: function (id) {
        var _self = this;
        return new Promise(function (resolve, reject) {
            var url = AppConfig.baseUrl + '/phoneme/' + '/' + id;
            RequestProcessor.deleteRequest(url).then((phonemeJSON) => {
                resolve(_self.extractPhonemes(phonemeJSON));
            });
        });
    },

    extractPhonemes: (phonemeJSON) => {
        var output = [];
        phonemeObj = phonemeJSON.phoneme;
        phonemeObj.forEach(function (element, index) {
            var phonemeModel = new PhonemeModel();
            phonemeModel.toModel(element);
            output.push(phonemeModel);
        });
        return output;
    },

    printResults: (xmlHttp) => {
        console.log(xmlHttp.responseText);
    }
};