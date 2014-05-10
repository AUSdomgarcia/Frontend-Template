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
        processhtml: {
            dist: {
                files: {
                    '<%= config.dist %>/index.html': ['<%= config.app %>/index.php']
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= config.dist %>/assets/js/app.min.js': ['<%= config.app %>/vendors/jquery/jquery.js', '<%= config.app %>/assets/js/*.js'] // make sure we load jQuery first
                }
            }
        },

        // Task configuration.
        sass: {
            dist: {
                files: {
                    '<%= config.app %>/assets/css/styles.css': '<%= config.app %>/assets/sass/main.scss'
                }
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>assets/img',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>assets/img'
                }]
            }
        },
        uncss: {
            dist: {
                files: {
                    '<%= config.dist %>/assets/css/styles.css': ['app/index.php']
                },
                options: {
                    report: 'min' // optional: include to report savings
                }
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
                        'assets/fonts/{,*/}*.*',
                        'assets/css',
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
        'uglify',
        'uncss',
        'processhtml',
        'copy:dist'

    ]);

};
