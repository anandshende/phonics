var PhonicsUtil = {

    isDefined: (obj) => {
        return (typeof obj == undefined || obj == null) ? false : true;
    },

    broadcastEvent: function (eventName, eventData) {
        var customEvent = new CustomEvent(eventName, { detail: eventData });
        document.dispatchEvent(customEvent);
    },
};