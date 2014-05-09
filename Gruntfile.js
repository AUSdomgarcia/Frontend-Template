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

        // Task configuration.
        sass: {
            dist: {
                files: {
                    '<%= config.app %>/assets/css/main.css': '<%= config.app %>/assets/sass/main.scss'
                },
                options: {
                    style: 'compressed'
                }
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    flatten: false,
                    cwd: '<%= config.app %>/assets/img/',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/assets/img/'
                }]
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
                        'assets/img/*',
                        'assets/js/*.js',
                        'assets/fonts/{,*/}*.*',
                        'assets/css',
                        'vendors/{,*/}*.*',
                        '{,*/}*.html'
                    ]
                }]
            }

        },






    }); //end initConfig

    // These plugins provide necessary tasks.

    // Default task.
    grunt.registerTask('default', ['sass']);
    grunt.registerTask('build', [
        'clean:dist',
        'sass',
        'imagemin',
        'copy:dist'

    ]);

};
