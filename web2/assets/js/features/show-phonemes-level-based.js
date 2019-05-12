var SearchPhonemes = {
    init: function () {
        PhonemeService.getV2Phonemes()
            .then((response) => {
                if (response.phoneme && response.phoneme.length == 0) {
                    Render.emptySearchResult();
                    return;
                }
                var phonemeList = response.phoneme.map((phonemeJSON) => new PhonemeModel(phonemeJSON));
                Render.phonemes(phonemeList, SearchPhonemes.onPhonemeElementClick);
                document.getElementById(phonemeList[0].phonemeId).click();

            }).catch((errorResponse) => {
                console.log('errorResponse = ' + JSON.stringify(errorResponse));
            });
    },

    onPhonemeElementClick: function () {
        var phonemeModel = JSON.parse(this.dataset.phonemeModel);

        // Set Selected Class To Current Element
        CommonUtil.deselectPhonemes();
        this.classList.add('phoneme-element-selected');

        // GetWords 
        WordsService.getV2Words(phonemeModel.phonemeId)
            .then(function (response) {
                var wordList = response.words.map((wordJSON) => new WordModel(wordJSON));
                Render.words(wordList, SearchPhonemes.onWordElementClick, phonemeModel);
            })
            .catch(function (errorResponse) {
                console.log('error => ' + JSON.stringify(errorResponse));
            });
    },

    onWordElementClick: function () {
        var wordModel = JSON.parse(this.dataset.wordModel);

        // Open Pop Up
        PopUp.open(wordModel);
    },

};

window.addEventListener('domReadyCustomEvent', function () {
    SearchPhonemes.init();
});