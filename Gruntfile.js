module.exports = function(grunt) {

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        watch: {
            options: {
              livereload: true,
            },
            js: {
                files: ['js/*.js'],
                tasks: ['jshint', 'uglify']
            },
            html: {
                files: ['index.html']
            },
            css: {
                files: ['scss/*.scss'],
                tasks: ['sass', 'cssmin']
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'scss/*.scss',
                        'js/*.js',
                        '*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: '.'
                }
            }
        },

        jshint: {
            all: {
                src: ['gruntfile.js', 'js/*.js' , '!node_modules/**/*.js', '!js/*.min.js'],
                options: {
                    node: true,
                    jquery: true,
                    browser : true,
                    strict: 'implied',
                    esversion: 6
                }
            }
        },

        // configure uglify to minify js files -------------------------------------
        uglify: {
          options: {
            banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
          },
          build: {
            expand: true,
            cwd: 'js/',
            src: ['**/*.js', '!*.min.js'],
            dest: 'js/',
            ext: '.min.js'
          }
        },

        // compile less stylesheets to css -----------------------------------------
        sass: {
          dist: {
            files: {
              'css/styles.css': 'scss/styles.scss'
            }
          }
        },

        // configure cssmin to minify css files ------------------------------------
        cssmin: {
          options: {
            banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
          },
          build: {
            files: {
              'css/styles.min.css' : 'css/styles.css'
            }
          }
        },

        copy: {
          main: {
            files: [
                {expand: true, cwd: 'node_modules/bootstrap/dist/', src: ['**/*.min.*', '!**/bootstrap-theme.*', '!**/*.map'], dest: 'vendor/bootstrap/', filter: 'isFile'},
                {expand: true, cwd: 'node_modules/jquery/dist/', src: ['jquery.min.js'], dest: 'vendor/jquery/', filter: 'isFile'},
                {expand: true, cwd: 'node_modules/font-awesome/', src: ['*/font-awesome.min.css', '**/*.ttf', 'fonts/*'], dest: 'vendor/font-awesome/', filter: 'isFile'},
                {expand: true, cwd: 'node_modules/popper.js/dist/', src: ['popper.min.js'], dest: 'vendor/popper/', filter: 'isFile'}

            ],
          },
        },
    });

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('default', ['browserSync', 'jshint', 'uglify', 'sass', 'cssmin', 'copy', 'watch']);

};