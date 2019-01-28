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

    words: function (wordList, eventHandler, phonemeModel) {
        var wordListElement = document.getElementById('wordList');
        wordListElement.dataset.phonemeModel = JSON.stringify(phonemeModel);

        // Clear List
        wordListElement.innerHTML = "";

        wordList.map(function (wordModel) {
            // Create List Element
            var wordDivElement = document.createElement('div');
            wordDivElement.classList.add('word-element');
            wordDivElement.id = wordModel.wordId;

            // Add Element Details
            wordDivElement.innerHTML = CommonUtil.getWordHTML(wordModel.wordName, phonemeModel.phonemeName);
            wordDivElement.dataset.wordModel = JSON.stringify(wordModel);

            // Add Event Listeners
            wordDivElement.onclick = eventHandler;

            // Append List Element
            wordListElement.append(wordDivElement);
        });
    },

    emptySearchResult: function () {
        var divContainer = document.createElement('div');
        divContainer.innerText = 'No Results Found';
        document.getElementById('wordList').appendChild(divContainer);
    }
};

var svgCallback = function (event, iconType) {
    var menu = document.getElementById('menu');
    if (iconType == 'close' && document.getElementById('popUpContent').dataset.wordModel) {
        PopUp.close();
    } else {
        menu.style.display = menu.style.display == 'block' ? 'none' : 'block';
    }
};