var PhonicsService = {

    getWordsWithLengthConstraints: function (number) {
        var _self = this;
        return new Promise(function (resolve, reject) {
            var url = AppConfig.baseUrl + '/phonics/length/' + number;
            RequestProcessor.getRequest(url).then((phonemeJSON) => {
                resolve(_self.extractPhonicsWords(phonemeJSON));
            });
        });
    },

    extractPhonicsWords: (phonicsJSON) => {
        var output = [];
        var phonicsObj = phonicsJSON.phonics;
        phonicsObj.forEach(function (element, index) {
            var phonemeModel = new PhonemeModel();
            phonemeModel.toModel(element);
            output.push(phonemeModel);
        });
        return output;
    },

    printResults: (xmlHttp) => {
        console.log(xmlHttp.responseText);
    }
}