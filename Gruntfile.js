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

        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '* Copyright (c) <%= grunt.template.today("yyyy") %> ',
        jshint: {
            all: ['Gruntfile.js']
        },
        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
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
                    cssDir: '<%= config.app %>/assets/css/',
                    config: 'config.rb'
                }
            }
        },

        processhtml: {
            dist: {
                files: {
                    '<%= config.dist %>/index.php': ['<%= config.app %>/index.php']
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= config.dist %>/assets/js/compiled.min.js': ['<%= config.app %>/vendors/jquery/jquery.js', '<%= config.app %>/assets/js/*.js'] // make sure we load jQuery first
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
                    '<%= config.dist %>/assets/css/main.css': ['app/index.php']
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
                        '.htaccess',
                        'assets/js/*.js',
                        'assets/fonts/{,*/}*.*',
                        'assets/css',
                        '{,*/}*.php'
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
        'processhtml',
        'copy:dist'

    ]);

};
