var WordsService = {
    getWords: function (id, callback) {
        var _self = this;
        return new Promise(function (resolve, reject) {
            var url = AppConfig.baseUrl + '/' + id;
            RequestProcessor.getRequest(url).then((wordJSON) => {
                resolve(_self.extractWords(wordJSON));
            });
        });
    },

    getWordDetails: function (id, wordId) {
        var _self = this;
        return new Promise(function (resolve, reject) {
            var url = AppConfig.baseUrl + '/' + id + '/' + wordId;
            RequestProcessor.getRequest(url).then((wordJSON) => {
                resolve(_self.extractWords(wordJSON));
            });
        });
    },

    addWord: function (id, data) {
        var _self = this;
        return new Promise(function (resolve, reject) {
            var url = AppConfig.baseUrl + '/' + id;
            RequestProcessor.postRequest(url, data).then((wordJSON) => {
                resolve(_self.extractWords(wordJSON));
            });
        });
    },

    updateWord: function (id, wordId, data) {
        var _self = this;
        return new Promise(function (resolve, reject) {
            var url = AppConfig.baseUrl + '/' + id + '/' + wordId;
            RequestProcessor.putRequest(url, data).then((wordJSON) => {
                resolve(_self.extractWords(wordJSON));
            });
        });
    },

    deleteWord: function (id, wordId) {
        var _self = this;
        return new Promise(function (resolve, reject) {
            var url = AppConfig.baseUrl + '/' + id + '/' + wordId;
            RequestProcessor.deleteRequest(url).then((wordJSON) => {
                resolve(_self.extractWords(wordJSON));
            });
        });
    },

    printResults: function (xmlHttp) {
        console.log(xmlHttp.responseText);
    },

    extractWords: function (wordJSON) {
        var output = [];
        wordObj = wordJSON.words;
        wordObj.forEach(function (element, index) {
            var wordModel = new WordModel();
            wordModel.toModel(element);
            output.push(wordModel);
        });
        return output;
    },

};