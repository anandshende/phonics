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