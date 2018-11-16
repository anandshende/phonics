

// ----- ----- web2/assets/js/common/common-util.js ----- ----- 

var CommonUtil = {
    deselectPhonemes: function () {
        var phonemeList = document.querySelectorAll('.phoneme-list>li');
        for (var i of phonemeList) {
            i.classList.remove('phoneme-element-selected');
        }
    }
}


// ----- ----- web2/assets/js/common/popup.js ----- ----- 

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


// ----- ----- web2/assets/js/common/render.js ----- ----- 

var Render = {
    phonemes: function (phonemeList, eventHandler) {
        var unorderedList = document.getElementById('phonemeList');

        // Clear List
        unorderedList.innerHTML = "";

        phonemeList.map(function (phonemeModel) {
            // Create List Element
            var liElement = document.createElement('li');
            liElement.classList.add('phoneme-element');
            liElement.id = phonemeModel.phonemeId;

            // Add Element Details
            liElement.innerText = phonemeModel.phonemeName;
            liElement.dataset.phonemeModel = JSON.stringify(phonemeModel);

            // Add Event Listeners
            liElement.onclick = eventHandler;

            // Append List Element
            unorderedList.append(liElement);
        });

    },

    words: function (wordList, eventHandler) {
        var wordListElement = document.getElementById('wordList');

        // Clear List
        wordListElement.innerHTML = "";

        wordList.map(function (wordModel) {
            // Create List Element
            var wordDivElement = document.createElement('div');
            wordDivElement.classList.add('word-element');
            wordDivElement.id = wordModel.wordId;

            // Add Element Details
            wordDivElement.innerText = wordModel.wordName;
            wordDivElement.dataset.wordModel = JSON.stringify(wordModel);

            // Add Event Listeners
            wordDivElement.onclick = eventHandler;

            // Append List Element
            wordListElement.append(wordDivElement);
        });
    }
};

var svgCallback = function (event, iconType) {
    var menu = document.getElementById('menu');
    if (iconType == 'close' && document.getElementById('popUpContent').dataset.wordModel) {
        PopUp.close();
    } else {
        menu.style.display = menu.style.display == 'block' ? 'none' : 'block';
    }
};


// ----- ----- web2/assets/js/common/req-processor.js ----- ----- 

var ReqProcessor = {
    GET: function (url) {
        return new Promise(function (resolve, reject) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", url, true);
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4) {
                    if (this.status == 200) {
                        resolve(JSON.parse(xmlHttp.responseText));
                    } else {
                        reject(JSON.parse(xmlHttp.responseText));
                    }
                }
            }
            xmlHttp.send(null);
        });
    }
}


// ----- ----- web2/assets/js/features/length-based-views.js ----- ----- 

var LengthBasedViews = {
    init: function () {
        PhonicsService.getWordsWithLengthConstraints(WORD_LENGTH)
            .then((response) => {
                var wordList = response.phonics.map((wordJSON) => new WordModel(wordJSON));
                Render.words(wordList, LengthBasedViews.onWordElementClick);
            }).catch((errorResponse) => {
                console.log("errorResponse = " + JSON.stringify(errorResponse));
            });
    },

    onWordElementClick: function () {
        var wordModel = JSON.parse(this.dataset.wordModel);

        // Open Pop Up
        PopUp.open(wordModel);
    }
};

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        LengthBasedViews.init();
    }
};


// ----- ----- web2/assets/js/features/phonics-init.js ----- ----- 

var Phonics = {
    init: function () {
        var _self = this;
        PhonemeService.getPhonemes()
            .then(function (response) {
                var phonemeList = response.phoneme.map((phonemeJSON) => new PhonemeModel(phonemeJSON));
                Render.phonemes(phonemeList, _self.onListElementClick);
                document.getElementById(phonemeList[0].phonemeId).click();
            })
            .catch(function (errorResponse) {
                console.log('error => ' + JSON.stringify(errorResponse));
            });
    },

    onListElementClick: function () {
        var phonemeModel = JSON.parse(this.dataset.phonemeModel);

        // Set Selected Class To Current Element
        CommonUtil.deselectPhonemes();
        this.classList.add('phoneme-element-selected');

        // GetWords 
        WordsService.getWords(phonemeModel.phonemeId)
            .then(function (response) {
                var wordList = response.words.map((wordJSON) => new WordModel(wordJSON));
                Render.words(wordList, Phonics.onWordElementClick);
            })
            .catch(function (errorResponse) {
                console.log('error => ' + JSON.stringify(errorResponse));
            });
    },

    onWordElementClick: function () {
        var wordModel = JSON.parse(this.dataset.wordModel);

        // Open Pop Up
        PopUp.open(wordModel);
    }
};



document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        Phonics.init();
    }
};


// ----- ----- web2/assets/js/features/search-view-init.js ----- ----- 

var SearchView = {
    init: function () {
        var searchKey = document.getElementById('searchKey').value;
        var searchLength = document.getElementById('searchLength').value;

        PhonicsService.searchWordsBasedKeyAndLength(searchKey, searchLength)
            .then((response) => {
                var wordList = response.phonics.map((wordJSON) => new WordModel(wordJSON));
                Render.words(wordList, SearchView.onWordElementClick);
            }).catch((errorResponse) => {
                console.log('errorResponse = ' + JSON.stringify(errorResponse));
            });
    },

    onWordElementClick: function () {
        var wordModel = JSON.parse(this.dataset.wordModel);

        // Open Pop Up
        PopUp.open();
    }
};


// ----- ----- web2/assets/js/models/phoneme-model.js ----- ----- 

var PhonemeModel = function (phonemeObj) {
    this.phonemeId = phonemeObj.id;
    this.phonemeName = phonemeObj.name;
    this.phonemeOrderNo = phonemeObj.orderNo;
};

PhonemeModel.prototype.toJson = function (phonemeObj) {
    this.name = phonemeObj.phonemeName;
    this.orderNo = phonemeObj.phonemeOrderNo;
};


// ----- ----- web2/assets/js/models/word-model.js ----- ----- 

var WordModel = function (wordObj) {
    this.wordId = wordObj.id;
    this.wordName = wordObj.name;
    this.wordOrderNo = wordObj.orderNo;
    this.wordPhonemeId = wordObj.phonemeId;
};

WordModel.prototype.toJson = function (wordObj) {
    this.name = wordObj.name;
    this.orderNo = wordObj.orderNo;
};


// ----- ----- web2/assets/js/services/phoneme-service.js ----- ----- 

var PhonemeService = {
    getPhonemes: function () {
        var baseUrl = AppConfig.baseUrl;
        var url = baseUrl + '/phoneme/';
        return ReqProcessor.GET(url);
    }
}


// ----- ----- web2/assets/js/services/phonics-service.js ----- ----- 

var PhonicsService = {
    getWordsWithLengthConstraints: function (length) {
        var url = AppConfig.baseUrl + '/phonics/length/' + length;
        return ReqProcessor.GET(url);
    },

    searchWordsBasedKeyAndLength: function (key, length) {
        var url = `${AppConfig.baseUrl}/phonics/search/${key}/${length}`;
        return ReqProcessor.GET(url);
    }
};


// ----- ----- web2/assets/js/services/words-service.js ----- ----- 

var WordsService = {
    getWords: function (phonemeId) {
        var baseUrl = AppConfig.baseUrl;
        var url = baseUrl + '/words/' + phonemeId;
        return ReqProcessor.GET(url);
    } 
};


// ----- ----- web2/assets/js/vendor/fitty.js ----- ----- 

!function(e,t){if("function"==typeof define&&define.amd)define(["module","exports"],t);else if("undefined"!=typeof exports)t(module,exports);else{var n={exports:{}};t(n,n.exports),e.fitty=n.exports}}(this,function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var D=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e};t.default=function(n){if(n){var i=function(e){return[].slice.call(e)},r={IDLE:0,DIRTY_CONTENT:1,DIRTY_LAYOUT:2,DIRTY:3},o=[],e=null,u="requestAnimationFrame"in n?function(){n.cancelAnimationFrame(e),e=n.requestAnimationFrame(function(){a(o.filter(function(e){return e.dirty}))})}:function(){},t=function(t){return function(){o.forEach(function(e){e.dirty=t}),u()}},a=function(e){e.filter(function(e){return!e.styleComputed}).forEach(function(e){e.styleComputed=f(e)}),e.filter(d).forEach(p);var t=e.filter(s);t.forEach(c),t.forEach(function(e){p(e),l(e)}),t.forEach(m)},l=function(e){return e.dirty=r.IDLE},c=function(e){e.availableWidth=e.element.parentNode.clientWidth,e.currentWidth=e.element.scrollWidth,e.previousFontSize=e.currentFontSize,e.currentFontSize=Math.min(Math.max(e.minSize,e.availableWidth/e.currentWidth*e.previousFontSize),e.maxSize),e.whiteSpace=e.multiLine&&e.currentFontSize===e.minSize?"normal":"nowrap"},s=function(e){return e.dirty!==r.DIRTY_LAYOUT||e.dirty===r.DIRTY_LAYOUT&&e.element.parentNode.clientWidth!==e.availableWidth},f=function(e){var t=n.getComputedStyle(e.element,null);e.currentFontSize=parseInt(t.getPropertyValue("font-size"),10),e.display=t.getPropertyValue("display"),e.whiteSpace=t.getPropertyValue("white-space")},d=function(e){var t=!1;return!e.preStyleTestCompleted&&(/inline-/.test(e.display)||(t=!0,e.display="inline-block"),"nowrap"!==e.whiteSpace&&(t=!0,e.whiteSpace="nowrap"),e.preStyleTestCompleted=!0,t)},p=function(e){e.originalStyle||(e.originalStyle=e.element.getAttribute("style")||""),e.element.style.cssText=e.originalStyle+";white-space:"+e.whiteSpace+";display:"+e.display+";font-size:"+e.currentFontSize+"px"},m=function(e){e.element.dispatchEvent(new CustomEvent("fit",{detail:{oldValue:e.previousFontSize,newValue:e.currentFontSize,scaleFactor:e.currentFontSize/e.previousFontSize}}))},v=function(e,t){return function(){e.dirty=t,u()}},y=function(e){e.newbie=!0,e.dirty=!0,o.push(e)},h=function(t){return function(){o=o.filter(function(e){return e.element!==t.element}),t.observeMutations&&t.observer.disconnect(),t.element.style.cssText=t.originalStyle}},S=function(e){e.observeMutations&&(e.observer=new MutationObserver(v(e,r.DIRTY_CONTENT)),e.observer.observe(e.element,e.observeMutations))},b={minSize:16,maxSize:512,multiLine:!0,observeMutations:"MutationObserver"in n&&{subtree:!0,childList:!0,characterData:!0}},w=null,T=function(){n.clearTimeout(w),w=n.setTimeout(t(r.DIRTY_LAYOUT),g.observeWindowDelay)},z=["resize","orientationchange"];return Object.defineProperty(g,"observeWindow",{set:function(e){var t=(e?"add":"remove")+"EventListener";z.forEach(function(e){n[t](e,T)})}}),g.observeWindow=!0,g.observeWindowDelay=100,g.fitAll=t(r.DIRTY),g}function F(e,t){var n=D({},b,t),i=e.map(function(e){var t=D({},n,{element:e});return y(t),S(t),{element:e,fit:v(t,r.DIRTY),unsubscribe:h(t)}});return u(),i}function g(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return"string"==typeof e?F(i(document.querySelectorAll(e)),t):F([e],t)[0]}}("undefined"==typeof window?null:window),e.exports=t.default});
