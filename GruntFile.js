module.exports = function (grunt) {

    grunt.initConfig({
        concat: {
            phonicsHTML: {
                src: phonicsJSFiles,
                dest: 'web2/assets/js/phonics.js'
            },
            length: {
                src: lengthBasedJSFiles,
                dest: 'web2/assets/js/lengthBasedViews.js'
            },
            searchView: {
                src: searchViewJSFiles,
                dest: 'web2/assets/js/searchView.js'
            },
            searchPhonemes: {
                src: searchPhonemesJSFiles,
                dest: 'web2/assets/js/searchPhonemes.js'
            },
            searchPhonemesLevelBased: {
                src: searchPhonemesJSFiles,
                dest: 'web2/assets/js/searchPhonemesLevelBased.js'
            },
            options: {
                process: function (src, filepath) {
                    return '\n\n' + '// ----- ----- ' + filepath + ' ----- ----- \n\n' + src;
                }
            }
        },
        watch: {
            files: ['<%= concat.phonicsHTML.src %>'],
            tasks: ['clean', 'concat']
        },
        clean: {
            js: ['<%= concat.phonicsHTML.dest %>']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'concat', 'watch']);

};

var CommonJSFiles = [
    'web2/assets/js/common/**/*.js',
    'web2/assets/js/vendor/**/*.js',
];

var phonicsJSFiles = [
    ...CommonJSFiles,
    'web2/assets/js/models/*.js',
    'web2/assets/js/features/phonics-init.js',
    'web2/assets/js/services/phoneme-service.js',
    'web2/assets/js/services/words-service.js'
];

var lengthBasedJSFiles = [
    ...CommonJSFiles,
    'web2/assets/js/features/length-based-views.js',
    'web2/assets/js/models/word-model.js',
    'web2/assets/js/services/phonics-service.js'
];

var searchViewJSFiles = [
    ...CommonJSFiles,
    'web2/assets/js/features/search-view-init.js',
    'web2/assets/js/models/word-model.js',
    'web2/assets/js/services/phonics-service.js'
];

var searchPhonemesJSFiles = [
    ...CommonJSFiles,
    'web2/assets/js/features/search-phonemes-level-based.js',
    'web2/assets/js/models/*.js',
    'web2/assets/js/services/phoneme-service.js',
    'web2/assets/js/services/words-service.js'
];