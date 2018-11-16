var CommonUtil = {
    deselectPhonemes: function () {
        var phonemeList = document.querySelectorAll('.phoneme-list>li');
        for (var i of phonemeList) {
            i.classList.remove('phoneme-element-selected');
        }
    }
}