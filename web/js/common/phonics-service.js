var PhonicsService = {
    getPhonemes: (url) => {
        var requestProcessor = new RequestProcessor();
        var xmlHttp = requestProcessor.getRequest(url);
        xmlHttp.onreadystatechange = () => {
            if (this.readyState == 4) {
                
            }
        }
    }
};