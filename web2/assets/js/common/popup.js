var PopUp = {
    popUpContainer: document.getElementById('popUp'),
    popUpContent: document.getElementById('popUpContent'),
    isImage: false,

    open: function (wordModel) {
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
        var p = document.createElement('p');
        p.classList.add('pop-up-text-container');
        p.id = 'fitTextContainer';
        p.innerHTML = this.getInnerHTML(wordModel.wordName);
        this.popUpContent.appendChild(p);

        if (wordModel.wordName.length > 3) {
            this.popUpContent.style.width = "1000px";
        } else {
            this.popUpContent.style.width = "500px";
        }
        fitty('.pop-up-text-container', {
            multiLine: false
        });

        if (!wordModel.imageUrl) return;

        //Image Display
        this.appendImage(wordModel.imageUrl);

        this.popUpContent.onclick = PopUp.toggleImage;
    },

    getInnerHTML: function (text, imgName) {
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
            div.style.display = 'none';
            div.appendChild(image);
        }

        this.popUpContent.appendChild(div);
    },

    getImageStyles: function (width, height) {
        var styles = "";
        var containerWidth = PopUp.popUpContent.offsetWidth;
        var containerHeight = PopUp.popUpContent.offsetHeight;

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

    sayWord: function() {
        var wordModel = JSON.parse(PopUp.popUpContent.dataset.wordModel);
        var word = wordModel.wordName;
        var voiceProperties = new SpeechSynthesisUtterance(word);
        var synth = window.speechSynthesis;
        synth.speak(voiceProperties);
    }
};