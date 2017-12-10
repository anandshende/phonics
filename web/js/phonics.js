var Phonics = {

    init: () => {
        PhonemeService.getPhonemes((phonemes) => {
            Phonics.renderList(phonemes);
        });
        Phonics.displayTabs();
        Phonics.handleClicks();
    },

    renderList: (phonemes) => {
        phonemes.forEach(function (element, index) {
            Phonics.appendToList(element);
        });
    },
    
    appendToList: (element) => {
        var ul = document.getElementById('phonemeList');
        var li = document.createElement('li');
        var textNode = document.createTextNode(element.name);
        li.appendChild(textNode);
        li.className = 'phonemeElement';
        li.onclick = function () {
            Phonics.selectElement(li);
            Phonics.getWords(element);
        };
        ul.appendChild(li);
    },

    selectElement: (li) => {
        Phonics.clearSelection();
        li.className += ' phonemeElementSelected';
    },

    getWords: (phoneme) => {
        Phonics.clearWordList();
        WordsService.getWords(phoneme.id, (wordsList) => {
            Phonics.renderWords(wordsList);
        });
    },

    clearWordList: () => {
        var parentId = document.getElementById('wordList');
        while(parentId.firstChild) {
            parentId.removeChild(parentId.firstChild);
        }
    },

    renderWords: (wordsList) => {
        wordsList.forEach(element => {
            Phonics.appendWords(element);
        });
    },

    appendWords: (element) => {
        var parentId = document.getElementById('wordList');
        var outerDiv = document.createElement('div');
        var innerDiv = document.createElement('div');
        var span = document.createElement('span');
        var textNode = document.createTextNode(element.name);
        span.appendChild(textNode);
        innerDiv.className = 'innerWordElement';
        innerDiv.appendChild(span);
        outerDiv.className = 'wordElement';
        outerDiv.appendChild(innerDiv);
        outerDiv.onclick = function () {

        };
        parentId.appendChild(outerDiv);
    },

    clearSelection: () => {
        var ul = document.getElementById('phonemeList');
        var children = ul.children;
        for (var i in children) {
            var element = children[i];
            if (PhonicsUtil.isDefined(element.classList) && element.classList.length > 1) {
                element.className = 'phonemeElement';
                break;
            }
        }
    },

    handleClicks: () => {
        document.getElementById('editTab').onclick = Phonics.openEditPage;
        document.getElementById('logOut').onclick = Phonics.logOut;
    },

    openEditPage: () => {
        window.location = 'edit-phonics.html';
    },

    logOut: () => {
        window.location = 'login.html';
    },

    displayTabs: () => {
        var tabs = document.getElementById('tabs');
        var isAdmin = Phonics.checkAdmin();
    },

    checkAdmin: () => {
        var adminKey = localStorage.getItem(AppConfig.adminKey);
        return (PhonicsUtil.isDefined(adminKey)) ? true : false;
    }
};

document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        Phonics.init();
    }
};
