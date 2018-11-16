

// ----- ----- web2/assets/js/common/common-util.js ----- ----- 

var CommonUtil = {
    deselectPhonemes: function () {
        var phonemeList = document.querySelectorAll('.phoneme-list>li');
        for (var i of phonemeList) {
            i.classList.remove('phoneme-element-selected');
        }
    }
}


// ----- ----- web2/assets/js/common/render.js ----- ----- 

var Render = {
    phonemes: function (phonemeList, eventHandler) {
        var unorderedList = document.getElementById('phonemeList');

        // Clear List
        unorderedList.innerHTML = "";

        phonemeList.map(function (phonemeModel) {
            // Create List Element
            var liElement = document.createElement('li');
            liElement.classList.add('phoneme-element');
            liElement.id = phonemeModel.phonemeId;

            // Add Element Details
            liElement.innerText = phonemeModel.phonemeName;
            liElement.dataset.phonemeModel = JSON.stringify(phonemeModel);

            // Add Event Listeners
            liElement.onclick = eventHandler;

            // Append List Element
            unorderedList.append(liElement);
        });

    },

    words: function (wordList, eventHandler) {
        var wordListElement = document.getElementById('wordList');

        // Clear List
        wordListElement.innerHTML = "";

        wordList.map(function (wordModel) {
            // Create List Element
            var wordDivElement = document.createElement('div');
            wordDivElement.classList.add('word-element');
            wordDivElement.id = wordModel.wordId;

            // Add Element Details
            wordDivElement.innerText = wordModel.wordName;
            wordDivElement.dataset.wordModel = JSON.stringify(wordModel);

            // Add Event Listeners
            wordDivElement.onclick = eventHandler;

            // Append List Element
            wordListElement.append(wordDivElement);
        });
    }
};

var svgCallback = function () {
    var menu = document.getElementById('menu');
    menu.style.display = menu.style.display == 'block' ? 'none' : 'block';
};


// ----- ----- web2/assets/js/common/req-processor.js ----- ----- 

var ReqProcessor = {
    GET: function (url) {
        return new Promise(function (resolve, reject) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", url, true);
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4) {
                    if (this.status == 200) {
                        resolve(JSON.parse(xmlHttp.responseText));
                    } else {
                        reject(JSON.parse(xmlHttp.responseText));
                    }
                }
            }
            xmlHttp.send(null);
        });
    }
}


// ----- ----- web2/assets/js/features/length-based-views.js ----- ----- 

var LengthBasedViews = {
    init: function () {
        PhonicsService.getWordsWithLengthConstraints(WORD_LENGTH)
            .then((response) => {
                console.log("Success = " + JSON.stringify(response));
                var wordList = response.phonics.map((wordJSON) => new WordModel(wordJSON));
                Render.words(wordList, LengthBasedViews.onWordElementClick);
            }).catch((errorResponse) => {
                console.log("errorResponse = " + JSON.stringify(errorResponse));
            });
    },

    onWordElementClick: function () {
        var wordModel = JSON.parse(this.dataset.wordModel);

        // Open Pop Up
        console.log(wordModel);
    }
};

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        LengthBasedViews.init();
    }
};


// ----- ----- web2/assets/js/models/word-model.js ----- ----- 

var WordModel = function (wordObj) {
    this.wordId = wordObj.id;
    this.wordName = wordObj.name;
    this.wordOrderNo = wordObj.orderNo;
    this.wordPhonemeId = wordObj.phonemeId;
};

WordModel.prototype.toJson = function (wordObj) {
    this.name = wordObj.name;
    this.orderNo = wordObj.orderNo;
};


// ----- ----- web2/assets/js/services/phonics-service.js ----- ----- 

var PhonicsService = {
    getWordsWithLengthConstraints: function (length) {
        var url = AppConfig.baseUrl + '/phonics/length/' + length;
        return ReqProcessor.GET(url);
    },

    searchWordsBasedKeyAndLength: function (key, length) {
        var url = `${AppConfig.baseUrl}/phonics/search/${key}/${length}`;
        return ReqProcessor.GET(url);
    }
};