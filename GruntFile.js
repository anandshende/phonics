module.exports = function (grunt) {

    grunt.initConfig({
        concat: {
            phonicsHTML: {
                src: ['web2/assets/js/*/*.js'],
                dest: 'web2/assets/js/phonics.js'
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