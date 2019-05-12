

// ----- ----- web2/assets/js/common/common-util.js ----- ----- 

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


// ----- ----- web2/assets/js/common/popup.js ----- ----- 

var PopUp = {
    popUpContainer: document.getElementById('popUp'),
    popUpContent: document.getElementById('popUpContent'),
    isImage: false,
    mobile: false,

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

    words: function (wordList, eventHandler, phonemeModel) {
        var wordListElement = document.getElementById('wordList');
        wordListElement.dataset.phonemeModel = JSON.stringify(phonemeModel);

        // Clear List
        wordListElement.innerHTML = "";

        wordList.map(function (wordModel) {
            // Create List Element
            var wordDivElement = document.createElement('div');
            wordDivElement.classList.add('word-element');
            wordDivElement.id = wordModel.wordId;

            // Add Element Details
            wordDivElement.innerHTML = CommonUtil.getWordHTML(wordModel.wordName, phonemeModel.phonemeName);
            wordDivElement.dataset.wordModel = JSON.stringify(wordModel);

            // Add Event Listeners
            wordDivElement.onclick = eventHandler;

            // Append List Element
            wordListElement.append(wordDivElement);
        });
    },

    emptySearchResult: function () {
        var divContainer = document.createElement('div');
        divContainer.innerText = 'No Results Found';
        document.getElementById('wordList').innerHTML = '';
        document.getElementById('wordList').appendChild(divContainer);
    }
};

var svgCallback = function (event, iconType) {
    var menu = document.getElementById('menu');
    if (iconType == 'close' && document.getElementById('popUpContent').dataset.wordModel) {
        PopUp.close();
    } else if (iconType == 'rightArrow') {
        PopUp.toggleImage();
    } else if (iconType == 'leftArrow') {
        PopUp.toggleImage();
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


// ----- ----- web2/assets/js/common/template-importer.js ----- ----- 

var TemplateImporter = {
    init: function () {
        elems = document.getElementsByClassName("menu-container");
        for (i = 0; i < elems.length; i++) {
            var element = elems[i];
            var file = element.getAttribute("w3-include-html");
            if (file) {
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            document.getElementById('menu').style.display = 'block';
                            element.innerHTML = this.responseText;
                            document.getElementById('menu').style.display = null;
                        }
                        if (this.status == 404) {
                            element.innerHTML = "Page not found.";
                        }
                    }
                }
                xhttp.open("GET", file, true);
                xhttp.send();
            }
        };
    }
};



document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        var customEvent = new CustomEvent('domReadyCustomEvent');
        window.dispatchEvent(customEvent);
        TemplateImporter.init();
    }
};


// ----- ----- web2/assets/js/vendor/fitty.js ----- ----- 

!function(e,t){if("function"==typeof define&&define.amd)define(["module","exports"],t);else if("undefined"!=typeof exports)t(module,exports);else{var n={exports:{}};t(n,n.exports),e.fitty=n.exports}}(this,function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var D=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e};t.default=function(n){if(n){var i=function(e){return[].slice.call(e)},r={IDLE:0,DIRTY_CONTENT:1,DIRTY_LAYOUT:2,DIRTY:3},o=[],e=null,u="requestAnimationFrame"in n?function(){n.cancelAnimationFrame(e),e=n.requestAnimationFrame(function(){a(o.filter(function(e){return e.dirty}))})}:function(){},t=function(t){return function(){o.forEach(function(e){e.dirty=t}),u()}},a=function(e){e.filter(function(e){return!e.styleComputed}).forEach(function(e){e.styleComputed=f(e)}),e.filter(d).forEach(p);var t=e.filter(s);t.forEach(c),t.forEach(function(e){p(e),l(e)}),t.forEach(m)},l=function(e){return e.dirty=r.IDLE},c=function(e){e.availableWidth=e.element.parentNode.clientWidth,e.currentWidth=e.element.scrollWidth,e.previousFontSize=e.currentFontSize,e.currentFontSize=Math.min(Math.max(e.minSize,e.availableWidth/e.currentWidth*e.previousFontSize),e.maxSize),e.whiteSpace=e.multiLine&&e.currentFontSize===e.minSize?"normal":"nowrap"},s=function(e){return e.dirty!==r.DIRTY_LAYOUT||e.dirty===r.DIRTY_LAYOUT&&e.element.parentNode.clientWidth!==e.availableWidth},f=function(e){var t=n.getComputedStyle(e.element,null);e.currentFontSize=parseInt(t.getPropertyValue("font-size"),10),e.display=t.getPropertyValue("display"),e.whiteSpace=t.getPropertyValue("white-space")},d=function(e){var t=!1;return!e.preStyleTestCompleted&&(/inline-/.test(e.display)||(t=!0,e.display="inline-block"),"nowrap"!==e.whiteSpace&&(t=!0,e.whiteSpace="nowrap"),e.preStyleTestCompleted=!0,t)},p=function(e){e.originalStyle||(e.originalStyle=e.element.getAttribute("style")||""),e.element.style.cssText=e.originalStyle+";white-space:"+e.whiteSpace+";display:"+e.display+";font-size:"+e.currentFontSize+"px"},m=function(e){e.element.dispatchEvent(new CustomEvent("fit",{detail:{oldValue:e.previousFontSize,newValue:e.currentFontSize,scaleFactor:e.currentFontSize/e.previousFontSize}}))},v=function(e,t){return function(){e.dirty=t,u()}},y=function(e){e.newbie=!0,e.dirty=!0,o.push(e)},h=function(t){return function(){o=o.filter(function(e){return e.element!==t.element}),t.observeMutations&&t.observer.disconnect(),t.element.style.cssText=t.originalStyle}},S=function(e){e.observeMutations&&(e.observer=new MutationObserver(v(e,r.DIRTY_CONTENT)),e.observer.observe(e.element,e.observeMutations))},b={minSize:16,maxSize:512,multiLine:!0,observeMutations:"MutationObserver"in n&&{subtree:!0,childList:!0,characterData:!0}},w=null,T=function(){n.clearTimeout(w),w=n.setTimeout(t(r.DIRTY_LAYOUT),g.observeWindowDelay)},z=["resize","orientationchange"];return Object.defineProperty(g,"observeWindow",{set:function(e){var t=(e?"add":"remove")+"EventListener";z.forEach(function(e){n[t](e,T)})}}),g.observeWindow=!0,g.observeWindowDelay=100,g.fitAll=t(r.DIRTY),g}function F(e,t){var n=D({},b,t),i=e.map(function(e){var t=D({},n,{element:e});return y(t),S(t),{element:e,fit:v(t,r.DIRTY),unsubscribe:h(t)}});return u(),i}function g(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return"string"==typeof e?F(i(document.querySelectorAll(e)),t):F([e],t)[0]}}("undefined"==typeof window?null:window),e.exports=t.default});



// ----- ----- web2/assets/js/vendor/polyfill.js ----- ----- 

(function () {

    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();


// ----- ----- web2/assets/js/vendor/simple-scrollbar.js ----- ----- 

(function(w, d) {
  var raf = w.requestAnimationFrame || w.setImmediate || function(c) { return setTimeout(c, 0); };

  function initEl(el) {
    if (Object.prototype.hasOwnProperty.call(el, 'data-simple-scrollbar')) return;
    Object.defineProperty(el, 'data-simple-scrollbar', new SimpleScrollbar(el));
  }

  // Mouse drag handler
  function dragDealer(el, context) {
    var lastPageY;

    el.addEventListener('mousedown', function(e) {
      lastPageY = e.pageY;
      el.classList.add('ss-grabbed');
      d.body.classList.add('ss-grabbed');

      d.addEventListener('mousemove', drag);
      d.addEventListener('mouseup', stop);

      return false;
    });

    function drag(e) {
      var delta = e.pageY - lastPageY;
      lastPageY = e.pageY;

      raf(function() {
        context.el.scrollTop += delta / context.scrollRatio;
      });
    }

    function stop() {
      el.classList.remove('ss-grabbed');
      d.body.classList.remove('ss-grabbed');
      d.removeEventListener('mousemove', drag);
      d.removeEventListener('mouseup', stop);
    }
  }

  // Constructor
  function ss(el) {
    this.target = el;

    this.direction = w.getComputedStyle(this.target).direction;

    this.bar = '<div class="ss-scroll">';

    this.wrapper = d.createElement('div');
    this.wrapper.setAttribute('class', 'ss-wrapper');

    this.el = d.createElement('div');
    this.el.setAttribute('class', 'ss-content');

    if (this.direction === 'rtl') {
      this.el.classList.add('rtl');
    }

    this.wrapper.appendChild(this.el);

    while (this.target.firstChild) {
      this.el.appendChild(this.target.firstChild);
    }
    this.target.appendChild(this.wrapper);

    this.target.insertAdjacentHTML('beforeend', this.bar);
    this.bar = this.target.lastChild;

    dragDealer(this.bar, this);
    this.moveBar();

    w.addEventListener('resize', this.moveBar.bind(this));
    this.el.addEventListener('scroll', this.moveBar.bind(this));
    this.el.addEventListener('mouseenter', this.moveBar.bind(this));

    this.target.classList.add('ss-container');

    var css = w.getComputedStyle(el);
  	if (css['height'] === '0px' && css['max-height'] !== '0px') {
    	el.style.height = css['max-height'];
    }
  }

  ss.prototype = {
    moveBar: function(e) {
      var totalHeight = this.el.scrollHeight,
          ownHeight = this.el.clientHeight,
          _this = this;

      this.scrollRatio = ownHeight / totalHeight;

      var isRtl = _this.direction === 'rtl';
      var right = isRtl ?
        (_this.target.clientWidth - _this.bar.clientWidth + 18) :
        (_this.target.clientWidth - _this.bar.clientWidth) * -1;

      raf(function() {
        // Hide scrollbar if no scrolling is possible
        if(_this.scrollRatio >= 1) {
          _this.bar.classList.add('ss-hidden')
        } else {
          _this.bar.classList.remove('ss-hidden')
          _this.bar.style.cssText = 'height:' + Math.max(_this.scrollRatio * 100, 10) + '%; top:' + (_this.el.scrollTop / totalHeight ) * 100 + '%;right:' + right + 'px;';
        }
      });
    }
  }

  function initAll() {
    var nodes = d.querySelectorAll('*[ss-container]');

    for (var i = 0; i < nodes.length; i++) {
      initEl(nodes[i]);
    }
  }

  d.addEventListener('DOMContentLoaded', initAll);
  ss.initEl = initEl;
  ss.initAll = initAll;

  w.SimpleScrollbar = ss;
})(window, document);



// ----- ----- web2/assets/js/features/search-phonemes-level-based.js ----- ----- 

var SearchPhonemes = {
    init: function () {
        var searchKey = document.getElementById('searchKey').value;

        PhonemeService.searchV2Phonemes(searchKey)
            .then((response) => {
                if (response.phoneme && response.phoneme.length == 0) {
                    Render.emptySearchResult();
                    return;
                }
                var phonemeList = response.phoneme.map((phonemeJSON) => new PhonemeModel(phonemeJSON));
                Render.phonemes(phonemeList, SearchPhonemes.onPhonemeElementClick);
                document.getElementById(phonemeList[0].phonemeId).click();

            }).catch((errorResponse) => {
                console.log('errorResponse = ' + JSON.stringify(errorResponse));
            });
    },

    onPhonemeElementClick: function () {
        var phonemeModel = JSON.parse(this.dataset.phonemeModel);

        // Set Selected Class To Current Element
        CommonUtil.deselectPhonemes();
        this.classList.add('phoneme-element-selected');

        // GetWords 
        WordsService.getV2Words(phonemeModel.phonemeId)
            .then(function (response) {
                var wordList = response.words.map((wordJSON) => new WordModel(wordJSON));
                Render.words(wordList, SearchPhonemes.onWordElementClick, phonemeModel);
            })
            .catch(function (errorResponse) {
                console.log('error => ' + JSON.stringify(errorResponse));
            });
    },

    onWordElementClick: function () {
        var wordModel = JSON.parse(this.dataset.wordModel);

        // Open Pop Up
        PopUp.open(wordModel);
    },

    onKeyUp: function(event) {
        if(event.keyCode == 13) {
            this.init();
        }
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
    this.imageUrl = wordObj.imageUrl;
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
    },

    searchPhonemes: function (key) {
        var baseUrl = AppConfig.baseUrl;
        var url = baseUrl + '/phoneme/search/' + key;
        return ReqProcessor.GET(url);
    },

    // V2 Services
    getV2Phonemes: function () {
        var level = LEVEL;
        var baseUrl = AppConfig.baseUrl;
        var url = `${baseUrl}/v2/${level}/phoneme/`;
        return ReqProcessor.GET(url);
    },
    
    searchV2Phonemes: function (key) {
        var level = LEVEL;
        var baseUrl = AppConfig.baseUrl;
        var url = `${baseUrl}/v2/${level}/phoneme/search/${key}`;
        return ReqProcessor.GET(url);
    },
}


// ----- ----- web2/assets/js/services/words-service.js ----- ----- 

var WordsService = {
    getWords: function (phonemeId) {
        var baseUrl = AppConfig.baseUrl;
        var url = baseUrl + '/words/' + phonemeId;
        return ReqProcessor.GET(url);
    },

    // V2 Services
    getV2Words: function (phonemeId) {
        var level = LEVEL;
        var baseUrl = AppConfig.baseUrl;
        var url = `${baseUrl}/v2/${level}/words/${phonemeId}`;
        return ReqProcessor.GET(url);
    }
};