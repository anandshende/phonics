var RequestProcessor = {

    getRequest: (url, callback) => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, true);
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                callback(JSON.parse(xmlHttp.responseText));
            }
        }
        xmlHttp.send(null);
    },
    
    postRequest: (url, data, callback) => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", url, true);
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                callback(xmlHttp);
            }
        }
        xmlHttp.send(data);
    },
    
    putRequest: (url, data, callback) => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("PUT", url, true);
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                callback(xmlHttp);
            }
        }
        xmlHttp.send(data);
    },
    
    deleteRequest: (url, callback) => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("DELETE", url, true);
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                callback(xmlHttp);
            }
        }
        xmlHttp.send(null);
    }
};