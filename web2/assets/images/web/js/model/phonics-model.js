var PhonicsModel = {
    phonemes: [],
    words: [],

    getPhonemes: function () {
        return this.phonemes;
    },
    setPhonemes: function (phonemes) {
        this.phonemes = phonemes;
    },

    getWords: function () {
        return this.words;
    },
    setWords: function (words) {
        this.words = words;
    }
}