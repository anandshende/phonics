module.exports = function (grunt) {

    grunt.initConfig({
        concat: {
            phonicsHTML: {
                src: ['web2/assets/js/*/*.js'],
                dest: 'web2/assets/js/phonics.js'
            },
            length: {
                src: lengthBasedJSFiles,
                dest: 'web2/assets/js/lengthBasedViews.js'
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

var lengthBasedJSFiles = [
    'web2/assets/js/common/**/*.js',
    'web2/assets/js/vendor/**/*.js',
    'web2/assets/js/features/length-based-views.js',
    'web2/assets/js/models/word-model.js',
    'web2/assets/js/services/phonics-service.js'
]