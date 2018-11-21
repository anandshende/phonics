var SearchView = {
    init: function () {
        var searchKey = document.getElementById('searchKey').value;
        var searchLength = document.getElementById('searchLength').value || 0;

        PhonicsService.searchWordsBasedKeyAndLength(searchKey, searchLength)
            .then((response) => {
                if (response.phonics && response.phonics.length == 0) {
                    Render.emptySearchResult();
                    return;
                }
                var wordList = response.phonics.map((wordJSON) => new WordModel(wordJSON));
                Render.words(wordList, SearchView.onWordElementClick);
            }).catch((errorResponse) => {
                console.log('errorResponse = ' + JSON.stringify(errorResponse));
            });
    },

    onWordElementClick: function () {
        var wordModel = JSON.parse(this.dataset.wordModel);

        // Open Pop Up
        PopUp.open(wordModel);
    }
};