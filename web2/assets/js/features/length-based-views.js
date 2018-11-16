var LengthBasedViews = {
    init: function () {
        PhonicsService.getWordsWithLengthConstraints(WORD_LENGTH)
            .then((response) => {
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