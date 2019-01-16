var Phonics = {

    init: function () {
        let _self = this;
        let key = document.getElementById('searchKey').value;
        let length = document.getElementById('length').value;
        PhonicsService.searchWordsBasedKeyAndLength(key, length).then((phonemes) => {
            _self.renderPhonicsWords(phonemes);
            PhonicsModel.setPhonemes(phonemes);
        });
    },

    renderPhonicsWords: function (phonicsWords) {
        let _self = this;
        document.getElementById(PhonicsIds.wordList).innerHTML = "";
        phonicsWords.forEach(function (element, index) {
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
            openModal(element);
        };
        parentId.appendChild(outerDiv);
    }
};

document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        document.getElementById('popUp').style.visibility = 'hidden';
        document.getElementById('popUpContent').classList.remove('pop-up-content-opaque');
        Phonics.init();
    }
};

var openModal = function (element) {
    document.getElementById('popUp').style.visibility = 'visible';
    document.getElementById('popUpContent').classList.add('pop-up-content-opaque');
    document.getElementById('popUpWord').innerText = element.name;
};

var closePop = function (event) {
    document.getElementById('popUp').style.visibility = 'hidden';
    document.getElementById('popUpContent').classList.remove('pop-up-content-opaque');
};

var stopProp = function(event) {
    event.stopPropagation();
}