var PopUp = {
    popUpContainer: document.getElementById('popUp'),
    popUpContent: document.getElementById('popUpContent'),
    loader: document.getElementById('loader'),
    isImage: false,
    mobile: false,

    open: function (wordModel) {
        this.loader.style.display = 'flex';
        this.mobile = CommonUtil.mobilecheck();
        this.popUpContainer.style.visibility = 'visible';
        this.popUpContent.classList.add('pop-up-content-opaque');
        this.render(wordModel);
    },

    close: function () {
        this.popUpContainer.style.visibility = 'hidden';
        this.popUpContent.classList.remove('pop-up-content-opaque');
        this.popUpContent.innerHTML = "";
        delete this.popUpContent.dataset.wordModel;
    },

    render: function (wordModel) {
        this.popUpContent.dataset.wordModel = JSON.stringify(wordModel);

        // Text Display
        if (!this.mobile) {
            var p = document.createElement('p');
            p.classList.add('pop-up-text-container');
            p.id = 'fitTextContainer';
            p.innerHTML = this.getInnerHTML(wordModel.wordName);
            this.popUpContent.appendChild(p);

            /* if (wordModel.wordName.length > 3) {
                this.popUpContent.style.width = "1000px";
            } else {
                this.popUpContent.style.width = "500px";
            } */
            this.popUpContent.style.width = "1300px";
            fitty('.pop-up-text-container', {
                multiLine: false
            });
            this.appendLeftRightIcons();
        } else {
            this.isImage = true;
        }

        if (!wordModel.imageUrl) return;

        //Image Display
        this.appendImage(wordModel.imageUrl);

        // this.popUpContent.onclick = PopUp.toggleImage;0
    },

    getInnerHTML: function (text) {
        var phonemeModel = JSON.parse(document.getElementById('wordList').dataset.phonemeModel);
        var phonemeName = phonemeModel.phonemeName;
        var innerHTML = CommonUtil.getWordHTML(text, phonemeName);
        return innerHTML;
    },

    appendImage: function (imageUrl) {
        var _self = this;

        var div = document.createElement('div');
        div.id = 'imageContainer';
        div.classList.add('pop-up-image-container');

        var image = new Image();
        image.src = `${AppConfig.baseUrl}/phonics/images?fileName=${imageUrl}`;
        image.onload = function () {
            var styles = _self.getImageStyles(this.width, this.height);
            div.style.cssText = styles;
            if (!PopUp.mobile) {
                div.style.display = 'none';
            }
            div.appendChild(image);
            PopUp.loader.style.display = 'none';
            PopUp.sayWord();
        }

        this.popUpContent.appendChild(div);

    },

    appendLeftRightIcons: function () {
        var rightIconContainer = document.createElement('div');
        rightIconContainer.classList.add('menu-icon-container', 'menu-close-icon-container', 'pop-up-icon-container');
        rightIconContainer.classList.add('arrow', 'right-arrow');

        var rightArrow = document.createElement('object');
        rightArrow.classList.add('menu-icon');
        rightArrow.data = '../assets/icons/arrow-right-icon.svg';
        rightArrow.type = 'image/svg+xml';

        var leftIconContainer = document.createElement('div');
        leftIconContainer.classList.add('menu-icon-container', 'menu-close-icon-container', 'pop-up-icon-container');
        leftIconContainer.classList.add('arrow', 'left-arrow');

        var leftArrow = document.createElement('object');
        leftArrow.classList.add('menu-icon');
        leftArrow.data = '../assets/icons/arrow-left-icon.svg';
        leftArrow.type = 'image/svg+xml';

        rightIconContainer.appendChild(rightArrow);
        this.popUpContent.appendChild(rightIconContainer);
        leftIconContainer.appendChild(leftArrow);
        this.popUpContent.appendChild(leftIconContainer);
    },

    getImageStyles: function (width, height) {
        var styles = "";
        var containerWidth = PopUp.popUpContent.offsetWidth;
        var containerHeight = PopUp.popUpContent.offsetHeight;
        if (this.mobile) {
            containerHeight = PopUp.popUpContent.offsetWidth;
        }

        var ratio = width / height;
        if (ratio > 1) {
            var widthRatio = containerWidth / width;
            var newWidth = width * widthRatio;
            var newHeight = height * widthRatio;
            if (newHeight > containerHeight) {
                var htRatio = containerHeight / height;
                newHeight = htRatio * height;
                newWidth = htRatio * width;
                styles += `margin: 0 auto;`;
            }
            styles += `width: ${newWidth}px;`;
            styles += `height: ${newHeight}px;`;
        } else {
            var htRatio = containerHeight / height;
            var newWidth = width * htRatio;
            var newHeight = height * htRatio;
            if (newWidth > containerWidth) {
                var wdRatio = containerWidth / width;
                newHeight = wdRatio * height;
                newWidth = wdRatio * width;
            }
            styles += `height: ${newHeight}px;`;
            styles += `width: ${newWidth}px;`;
            styles += `margin: 0 auto;`;
        }
        return styles;
    },

    toggleImage: function () {
        var _self = PopUp;
        if (_self.isImage) {
            document.getElementById('fitTextContainer').style.display = "inline-block";
            document.getElementById('imageContainer').style.display = 'none';
            _self.isImage = false;
        } else {
            document.getElementById('imageContainer').style.display = 'block';
            document.getElementById('fitTextContainer').style.display = "none";
            _self.isImage = true;
            PopUp.sayWord();
        }
    },

    sayWord: function () {
        var wordModel = JSON.parse(PopUp.popUpContent.dataset.wordModel);
        var word = wordModel.wordName;
        var voiceProperties = new SpeechSynthesisUtterance(word);
        var synth = window.speechSynthesis;
        synth.speak(voiceProperties);
    }
};