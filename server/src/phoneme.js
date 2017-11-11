var getPhonemeList = () => {
    var op = 'get phoneme list';
    console.log(op);
    return op;
};

var addPhonemeList = () => {
    var op = 'add phoneme';
    console.log(op);
    return op;
};

var orderPhonemeList = () => {
    var op = 'order phoneme';
    console.log(op);
    return op;
};

var deletePhoneme = () => {
    var op = 'delete phoneme';
    console.log(op);
    return op;
};

module.exports = {
    getPhonemeList: getPhonemeList,
    addPhonemeList: addPhonemeList,
    orderPhonemeList: orderPhonemeList,
    deletePhoneme: deletePhoneme
};