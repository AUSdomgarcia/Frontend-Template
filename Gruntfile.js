module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    // Project configuration.
    grunt.initConfig({

        //Read the package.json (optional)
        pkg: grunt.file.readJSON('package.json'),

        // Project settings
        config: config,

        banner: '/*\n<%= pkg.name %> - v<%= pkg.version %>\n'+'Authored by:<%= pkg.author %>\n' +'Website: https://aindevonshire.com ' +'\nCopyright (c) <%= grunt.template.today("yyyy") %>\n */',
        usebanner: {
            dist: {
              options: {
                position: 'top',
                banner: '<%= banner %>'
              },
              files: {
                src: [ '<%= config.dist %>/assets/js/app.min.js', '<%= config.dist %>/assets/css/main.min.css' ]
              }
            }
        },
        jshint: {
            all: ['Gruntfile.js']
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    expand  :true,
                    src: [
                         '<%= config.dist %>/*'
                    ]
                }]
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: '<%= config.app %>/assets/css/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= config.dist %>/assets/css/',
                ext: '.min.css'
            }
        },
        compass: { // Task
            dist: { // Target
                options: { // Target options
                    sassDir: '<%= config.app %>/assets/sass/',
                    cssDir: '<%= config.app %>/assets/css/'
                }
            }
        },

        processhtml: {
            dist: {
                files: {
                    '<%= config.dist %>/index.html': ['<%= config.app %>/index.html']
                }
            }

        },
        uglify: {
            dist: {
                files: {
                    '<%= config.dist %>/assets/js/app.min.js': ['<%= config.app %>/assets/js/*.js'] // make sure we load jQuery first
                }
            }
        },

        // Task configuration.
        sass: {
            dist: {
                files: {
                    '<%= config.app %>/assets/css/main.css': '<%= config.app %>/assets/sass/main.scss'
                }
            }
        },
        imagemin: { // Task
            dynamic: { // Another target
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: '<%= config.app %>/assets/img', // Src matches are relative to this path
                    src: '**/*.{gif,GIF,jpg,JPG,png,PNG}', // Actual patterns to match
                    dest: '<%= config.dist %>/assets/img/' // Destination path prefix
                }]
            }
        },
        uncss: {
            dist: {
                files: {
                    '<%= config.dist %>/assets/css/main.min.css': ['app/index.html']
                },
                options: {
                    report: 'min' // optional: include to report savings
                }
            }
        },
        watch: {
            options: {
                dateFormat: function(time) {
                    grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
                    grunt.log.writeln('Waiting for more changes...');
                },
                livereload: true
            },
            css: {
                files: '<%= config.app %>/assets/sass/*.scss',
                tasks: ['sass', 'compass'],
                options: {
                    spawn: false
                },
            },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint'],
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        'vendors/{,**/}*.*',
                        '.htaccess',
                        'assets/fonts/{,*/}*.*',
                        '{,*/}*.html'
                    ]
                }]
            }

        },


    }); //end initConfig

    // These plugins provide necessary tasks.

    // Default task.
    grunt.registerTask('default', ['sass', 'compass', 'watch']);
    grunt.registerTask('build', [
        'clean:dist',
        'sass',
        'imagemin',
        'uglify',
        'uncss',
        'cssmin',
        'copy:dist',
        'processhtml',
        'usebanner'

    ]);

};
