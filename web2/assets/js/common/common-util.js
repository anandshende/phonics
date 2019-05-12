var CommonUtil = {
    deselectPhonemes: function () {
        var phonemeList = document.querySelectorAll('.phoneme-list>li');
        for (var i of phonemeList) {
            i.classList.remove('phoneme-element-selected');
        }
    },

    getColorCodes: function () {
        var random = Math.random();
        var colorCodes = AppConfig.colorCodes;
        var len = colorCodes.length;

        var floor = Math.floor(random * len);
        return colorCodes[floor];
    },

    getWordHTML: function (text, phonemeName) {
        var array = text.split("");

        var innerHTML = "";
        array.map(function (letter, index) {
            var anchorText = letter;
            var highlightClass = '';
            if (letter == phonemeName[0]) {
                var subString = text.substr(index, phonemeName.length);
                if (subString === phonemeName) {
                    array.splice(index, phonemeName.length, subString);
                    anchorText = subString;
                    highlightClass = 'class = "highlight-text"';
                }
            }
            var colorCodes = CommonUtil.getColorCodes();
            innerHTML += `<a style="color: ${colorCodes};" ${highlightClass}>${anchorText}</a>`;
        });
        return innerHTML;
    },
}