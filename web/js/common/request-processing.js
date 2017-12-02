var RequestProcessor = {
    getRequest: (url) => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, false);
        return xmlHttp;
    },
    postRequest: () => {

    }
};