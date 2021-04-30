module.exports = function (grunt) {

    grunt.initConfig({
        // Compile sass
        compass: {
            default: {
                options: {
                    config: 'sass/default.rb',
                    cssDir: 'public/styles',
                }
            }
        },        

        copy: {
            css: { 
                files: [
                    { expand: true, cwd: '/', src: ['sass/styles.scss'], dest: 'public/styles' }
                ]
            }
        },

        // Watch
        watch: {
            options: {
                livereload: false,
                nospawn: true
            },

            // Watch sass
            watch_scss: {
                files: ['sass/*.scss'],
                tasks: ['compass'],
                options: {
                    spawn: false, 
                }
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');

    // Default - Command "grunt"
    grunt.registerTask('default', ['compass']);
};