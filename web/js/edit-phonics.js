var EditPhonics = {
    phonemeModel: new PhonemeModel(),
    wordModel: new WordModel(),

    init: function () {
        this.registerEvents();
        this.initSteps();
        this.registerClicks();
    },

    initSteps: function () {
        this.phonemeModel = null;
        this.wordModel = null;
        this.phonemeModel = new PhonemeModel();
        this.wordModel = new WordModel();
        this.resetDetails();
        this.disableInput(PhonicsIds.txtPhonemeName, true);
        this.disableInput(PhonicsIds.txtWordName, true);
        document.getElementById(PhonicsIds.phonemeDropDown).disabled = true;
        document.getElementById(PhonicsIds.phonemeDropDown).className = "select-disabled";
        document.getElementById(PhonicsIds.wordDropDown).disabled = true;
        document.getElementById(PhonicsIds.wordDropDown).className = "select-disabled";
        document.getElementById(PhonicsIds.addWordId).style.cursor = "not-allowed";
    },

    renderPhonemeDetails: function () {
        document.getElementById(PhonicsIds.txtPhonemeName).value = this.phonemeModel.name;
        document.getElementById(PhonicsIds.phonemeDropDown).value = this.phonemeModel.orderNo;
        let phonemeDropDown = document.getElementById(PhonicsIds.phonemeDropDown);
        phonemes = PhonicsModel.getPhonemes();

        while (phonemeDropDown.firstChild) {
            phonemeDropDown.removeChild(phonemeDropDown.firstChild);
        }
        let options = new Option('On Top', 0, true, true);
        phonemeDropDown.add(options);
        for (let index in phonemes) {
            if (phonemes[index].name == EditPhonics.phonemeModel.name) continue;
            options = new Option(phonemes[index].name, phonemes[index].orderNo);
            phonemeDropDown.add(options);
        }
    },

    renderWordDetails: function () {
        document.getElementById(PhonicsIds.txtWordName).value = this.wordModel.name;
        document.getElementById(PhonicsIds.wordDropDown).value = this.wordModel.orderNo;
        let wordDropDown = document.getElementById(PhonicsIds.wordDropDown);
        words = PhonicsModel.getWords();

        while (wordDropDown.firstChild) {
            wordDropDown.removeChild(wordDropDown.firstChild);
        }
        let options = new Option('On Top', 0, true, true);
        wordDropDown.add(options);
        for (let index in words) {
            if (words[index].name == EditPhonics.wordModel.name) continue;
            options = new Option(words[index].name, words[index].orderNo);
            wordDropDown.add(options);
        }
    },

    registerEvents: function () {
        var _self = this;
        document.addEventListener(EventNames.PhonemeSelected, this.onPhonemeClick);
        document.addEventListener(EventNames.WordSelected, this.onWordClick);
        document.addEventListener(EventNames.RenderPhonemes, this.phonemeRendered);
    },

    phonemeRendered: function () {
        EditPhonics.initSteps();
    },

    onPhonemeClick: function (event) {
        let data = event.detail;
        EditPhonics.resetDetails();
        EditPhonics.disableInput(PhonicsIds.txtPhonemeName, false);
        EditPhonics.disableInput(PhonicsIds.txtWordName, true);
        document.getElementById(PhonicsIds.phonemeDropDown).disabled = false;
        document.getElementById(PhonicsIds.wordDropDown).disabled = true;
        document.getElementById(PhonicsIds.phonemeDropDown).className = "";
        document.getElementById(PhonicsIds.wordDropDown).className = "select-disabled";
        EditPhonics.phonemeModel.id = data.getAttribute('data-id');
        EditPhonics.phonemeModel.orderNo = data.getAttribute('data-order-no');
        EditPhonics.phonemeModel.name = data.innerText;
        EditPhonics.renderPhonemeDetails();
        document.getElementById(PhonicsIds.addWordId).style.cursor = "pointer";
    },

    onWordClick: function (event) {
        let data = event.detail;
        EditPhonics.resetDetails();
        EditPhonics.disableInput(PhonicsIds.txtPhonemeName, true);
        EditPhonics.disableInput(PhonicsIds.txtWordName, false);
        document.getElementById(PhonicsIds.phonemeDropDown).disabled = true;
        document.getElementById(PhonicsIds.wordDropDown).disabled = false;
        document.getElementById(PhonicsIds.phonemeDropDown).className = "select-disabled";
        document.getElementById(PhonicsIds.wordDropDown).className = "";
        EditPhonics.wordModel.id = data.getAttribute('data-id');
        EditPhonics.wordModel.orderNo = data.getAttribute('data-order-no');
        EditPhonics.wordModel.phonemeId = data.getAttribute('data-phoneme-id');
        EditPhonics.wordModel.name = data.innerText;
        EditPhonics.renderWordDetails();
    },

    disableInput: function (id, value) {
        var element = document.getElementById(id);
        value ? element.setAttribute('disabled', 'disabled') : element.removeAttribute('disabled');
        var disableClass = value ? 'disable-input' : '';
        element.className = disableClass;
    },

    registerClicks: function () {
        document.getElementById(PhonicsIds.updateButton).onclick = this.updateDetails;
        document.getElementById(PhonicsIds.deleteButton).onclick = this.deleteDetail;
        document.getElementById(PhonicsIds.addPhonemeId).onclick = this.showAddPhoneme;
        document.getElementById(PhonicsIds.addWordId).onclick = this.showAddWord;
        document.getElementById(PhonicsIds.addPhonemeButton).onclick = this.addPhoneme;
        document.getElementById(PhonicsIds.cancelPhonemeButton).onclick = this.showEdit;
        document.getElementById(PhonicsIds.addWordButton).onclick = this.addWord;
        document.getElementById(PhonicsIds.cancelWordButton).onclick = this.showEdit;
    },

    addPhoneme: function () {
        var addPhoneme = new PhonemeModel();
        addPhoneme.name = document.getElementById(PhonicsIds.newTxtPhoneme).value;

        PhonemeService.addPhoneme(addPhoneme).then((phonemes) => {
            PhonicsUtil.broadcastEvent(EventNames.UpdatePhonemeList, phonemes);
        });
    },

    addWord: function () {
        var addWord = new WordModel();
        addWord.name = document.getElementById(PhonicsIds.newTxtWord).value;

        WordsService.addWord(EditPhonics.phonemeModel.id, addWord).then((words) => {
            PhonicsUtil.broadcastEvent(EventNames.UpdateWordList, words);
        });
    },

    showEdit: function () {
        document.getElementById(PhonicsIds.editBody).style.display = "block";
        document.getElementById(PhonicsIds.newWord).style.display = "none";
        document.getElementById(PhonicsIds.newPhoneme).style.display = "none";
    },

    showAddPhoneme: function () {
        document.getElementById(PhonicsIds.editBody).style.display = "none";
        document.getElementById(PhonicsIds.newWord).style.display = "none";
        document.getElementById(PhonicsIds.newPhoneme).style.display = "block";
    },

    showAddWord: function () {
        if (document.getElementById(PhonicsIds.addWordId).style.cursor == "not-allowed") return;
        document.getElementById(PhonicsIds.editBody).style.display = "none";
        document.getElementById(PhonicsIds.newWord).style.display = "block";
        document.getElementById(PhonicsIds.newPhoneme).style.display = "none";
    },

    isPhonemeActive: function () {
        var getPhoneme = document.getElementById(PhonicsIds.txtPhonemeName).getAttribute('disabled');
        return getPhoneme != "disabled";
    },

    updateDetails: function (event) {
        EditPhonics.isPhonemeActive() ? EditPhonics.updatePhoneme() : EditPhonics.updateWord();
    },

    updatePhoneme: function () {
        var updatedPhoneme = new PhonemeModel();
        EditPhonics.phonemeModel.name = document.getElementById(PhonicsIds.txtPhonemeName).value;
        EditPhonics.phonemeModel.orderNo = parseInt(document.getElementById(PhonicsIds.phonemeDropDown).value) + 1;

        updatedPhoneme.toJson(EditPhonics.phonemeModel);
        PhonemeService.updatePhoneme(EditPhonics.phonemeModel.id, updatedPhoneme).then((phonemes) => {
            PhonicsUtil.broadcastEvent(EventNames.UpdatePhonemeList, phonemes);
        });
    },

    updateWord: function () {
        var updateWord = new WordModel();
        EditPhonics.wordModel.name = document.getElementById(PhonicsIds.txtWordName).value;
        EditPhonics.wordModel.orderNo = parseInt(document.getElementById(PhonicsIds.wordDropDown).value) + 1;

        updateWord.toJson(EditPhonics.wordModel);
        WordsService.updateWord(EditPhonics.wordModel.phonemeId, EditPhonics.wordModel.id, updateWord)
            .then(function (words) {
                console.log(words);
                PhonicsUtil.broadcastEvent(EventNames.UpdateWordList, words);
            })
    },

    deleteDetail: function (event) {
        EditPhonics.isPhonemeActive() ? EditPhonics.deletePhoneme() : EditPhonics.deleteWord();
    },

    deletePhoneme: function () {
        PhonemeService.deletePhoneme(this.phonemeModel.id).then((phonemes) => {
            console.log(phonemes);
            PhonicsUtil.broadcastEvent(EventNames.UpdatePhonemeList, phonemes);
        });
    },

    deleteWord: function () {
        WordsService.deleteWord(EditPhonics.wordModel.phonemeId, EditPhonics.wordModel.id)
            .then(function (words) {
                console.log(words);
                PhonicsUtil.broadcastEvent(EventNames.UpdateWordList, words);
            });
    },

    resetDetails: function (event) {
        document.getElementById(PhonicsIds.txtPhonemeName).value = "";
        document.getElementById(PhonicsIds.txtWordName).value = "";
        document.getElementById(PhonicsIds.phonemeDropDown).value = 0;
        document.getElementById(PhonicsIds.wordDropDown).value = 0;
    }
};

EditPhonics.init();
