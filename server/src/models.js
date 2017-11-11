var PhonemeModel = function() {
    this.id;
    this.timestamp;
    this.order_no;
    this.name;
};

var WordsModel = function() {
    this.id;
    this.timestamp;
    this.order_no;
    this.name;
    this.phoneme_id;
}

module.exports = {
    PhonemeModel: PhonemeModel,
    WordsModel: WordsModel
}