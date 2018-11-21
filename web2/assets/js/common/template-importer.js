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