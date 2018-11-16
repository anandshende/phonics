var PopUp = {
    popUpContainer: document.getElementById('popUp'),
    popUpContent: document.getElementById('popUpContent'),

    open: function (wordModel) {
        this.popUpContainer.style.visibility = 'visible';
        this.popUpContent.classList.add('pop-up-content-opaque');
        this.render(wordModel);
    },

    close: function () {
        this.popUpContainer.style.visibility = 'hidden';
        this.popUpContent.classList.remove('pop-up-content-opaque');
        delete this.popUpContent.dataset.wordModel;
    },

    render: function (wordModel) {
        this.popUpContent.dataset.wordModel = JSON.stringify(wordModel);
        document.getElementById('fitTextContainer').innerHTML = this.getInnerHTML(wordModel.wordName);
        fitty('.pop-up-text-container', {
            multiLine: false
        });
    },

    getInnerHTML: function (text) {
        var colorCodes = AppConfig.colorCodes;
        var array = text.split("");
        var len = colorCodes.length;

        var innerHTML = "";
        var prevFloor = -1;
        array.map(function (arrayStr) {
            var random = Math.random();
            var floor = Math.floor(random * len);
            if (prevFloor == floor) {
                floor = (floor + 1) % 15;
            }
            innerHTML += `<a style="color: ${colorCodes[floor]};">${arrayStr}</a>`;
        });
        return innerHTML;
    }
};