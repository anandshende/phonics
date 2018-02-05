var RequestProcessor = {

    getRequest: (url) => {
        return new Promise(function (resolve, reject) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", url, true);
            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState == 4) {
                    resolve(JSON.parse(xmlHttp.responseText));
                }
            }
            xmlHttp.send(null);
        });
    },

    postRequest: (url, data) => {
        return new Promise(function (resolve, reject) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", url, true);
            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState == 4) {
                    resolve(JSON.parse(xmlHttp.responseText));
                }
            }
            xmlHttp.setRequestHeader('Content-Type', 'application/json');
            xmlHttp.send(JSON.stringify(data));
        });
    },

    putRequest: (url, data) => {
        return new Promise(function (resolve, reject) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("PUT", url, true);
            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState == 4) {
                    resolve(JSON.parse(xmlHttp.responseText));
                }
            }
            xmlHttp.setRequestHeader('Content-Type', 'application/json');
            xmlHttp.send(JSON.stringify(data));
        });
    },

    deleteRequest: (url) => {
        return new Promise(function (resolve, reject) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("DELETE", url, true);
            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState == 4) {
                    resolve(JSON.parse(xmlHttp.responseText));
                }
            }
            xmlHttp.send(null);
        });
    }
};