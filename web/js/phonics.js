var Phonics = {

    init: function () {
        let _self = this;
        PhonemeService.getPhonemes().then((phonemes) => {
            _self.renderPhonemes(phonemes);
            PhonicsModel.setPhonemes(phonemes);
        });
        this.displayTabs();
        this.registerEvents();
        this.handleClicks();
    },

    registerEvents: function () {
        document.addEventListener(EventNames.UpdatePhonemeList, this.updatePhonemeList);
        document.addEventListener(EventNames.UpdateWordList, this.updateWordList);
    },

    removeAllChildren: function (id) {
        let ul = document.getElementById(id);
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    },

    updatePhonemeList: function (event) {
        Phonics.removeAllChildren(PhonicsIds.phonemeList);
        Phonics.renderPhonemes(event.detail);
        PhonicsUtil.broadcastEvent(EventNames.RenderPhonemes);
    },

    updateWordList: function (event) {
        Phonics.removeAllChildren(PhonicsIds.wordList);
        Phonics.renderWords(event.detail);
        PhonicsUtil.broadcastEvent(EventNames.RenderPhonemes);
    },

    renderPhonemes: function (phonemes) {
        let _self = this;
        phonemes.forEach(function (element, index) {
            _self.appendToList(element);
        });
    },

    appendToList: function (element) {
        var ul = document.getElementById(PhonicsIds.phonemeList);
        var li = document.createElement('li');
        var textNode = document.createTextNode(element.name);
        li.appendChild(textNode);
        li.className = 'phonemeElement';
        li.setAttribute('data-id', element.id);
        li.setAttribute('data-order-no', element.orderNo);
        li.onclick = function () {
            Phonics.selectElement(li);
            Phonics.getWords(element);
        };
        ul.appendChild(li);
    },

    selectElement: function (li) {
        this.clearPhonemeSelection();
        li.className += ' phonemeElementSelected';
        PhonicsUtil.broadcastEvent(EventNames.PhonemeSelected, li);
    },

    getWords: function (phoneme) {
        this.clearWordList();
        WordsService.getWords(phoneme.id).then(function (wordsList) {
            Phonics.renderWords(wordsList);
            PhonicsModel.setWords(wordsList);
        });
    },

    clearWordList: function () {
        var parentId = document.getElementById(PhonicsIds.wordList);
        while (parentId.firstChild) {
            parentId.removeChild(parentId.firstChild);
        }
    },

    renderWords: function (wordsList) {
        let _self = this;
        wordsList.forEach(element => {
            _self.appendWords(element);
        });
    },

    appendWords: function (element) {
        var parentId = document.getElementById(PhonicsIds.wordList);
        var outerDiv = document.createElement('div');
        var innerDiv = document.createElement('div');
        var span = document.createElement('span');
        span.setAttribute('data-id', element.id);
        span.setAttribute('data-order-no', element.orderNo);
        span.setAttribute('data-phoneme-id', element.phonemeId);
        var textNode = document.createTextNode(element.name);
        span.appendChild(textNode);
        innerDiv.className = 'innerWordElement';
        innerDiv.appendChild(span);
        outerDiv.className = 'wordElement';
        outerDiv.appendChild(innerDiv);
        outerDiv.onclick = function () {
            if (PhonicsIds.selectWords) {
                Phonics.clearWordSelection();
                outerDiv.className += ' wordElementSelected'
            }
            PhonicsUtil.broadcastEvent(EventNames.WordSelected, span);
        };
        parentId.appendChild(outerDiv);
    },

    clearPhonemeSelection: function () {
        if (PhonicsIds.selectWords) {
            this.clearWordSelection();
        }
        var ul = document.getElementById(PhonicsIds.phonemeList);
        var children = ul.children;
        for (var i in children) {
            var element = children[i];
            if (PhonicsUtil.isDefined(element.classList) && element.classList.length > 1) {
                element.className = 'phonemeElement';
                break;
            }
        }
    },

    clearWordSelection: function () {
        var ul = document.getElementById(PhonicsIds.wordList);
        var children = ul.children;
        for (var i in children) {
            var element = children[i];
            if (PhonicsUtil.isDefined(element.classList) && element.classList.length > 1) {
                element.className = 'wordElement';
                break;
            }
        }
    },

    handleClicks: function () {
        document.getElementById(PhonicsIds.firstTab).onclick = this.openFirstLink;
        document.getElementById(PhonicsIds.secondTab).onclick = this.openSecondLink;
    },

    openFirstLink: function () {
        window.location = PhonicsIds.firstLink;
    },

    openSecondLink: function () {
        window.location = PhonicsIds.secondLink;
    },

    displayTabs: function () {
        var tabs = document.getElementById('tabs');
        var isAdmin = this.checkAdmin();
    },

    checkAdmin: function () {
        var adminKey = localStorage.getItem(AppConfig.adminKey);
        return (PhonicsUtil.isDefined(adminKey)) ? true : false;
    }
};

document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        Phonics.init();
    }
};
