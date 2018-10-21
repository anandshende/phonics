var Phonics = {

    init: function () {
        let _self = this;
        PhonicsService.getTwoLetterPhonicsWords().then((phonemes) => {
            _self.renderPhonicsWords(phonemes);
            PhonicsModel.setPhonemes(phonemes);
        });
    },

    renderPhonicsWords: function (phonicsWords) {
        let _self = this;
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
            if (PhonicsIds.selectWords) {
                Phonics.clearWordSelection();
                outerDiv.className += ' wordElementSelected'
            }
            PhonicsUtil.broadcastEvent(EventNames.WordSelected, span);
        };
        parentId.appendChild(outerDiv);
    }
};

document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        Phonics.init();
    }
};
