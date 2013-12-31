module.exports = function(grunt) {
    'use strict';
    
    var appDetails = {
        src: 'www',
        dest: '/public_html/milesrauschfamily.com/ccard/2013/'
    };
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            local: {
                options: {
                    port: 3333,
                    base: appDetails.src,
                    debug: true,
                    keepalive: true
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'js/main.js'
            ]
        },
        'ftp-deploy': {
            build: {
                auth: {
                    host: 'milesrausch.com',
                    port: 21,
                    authKey: 'milesrausch'
                },
                src: appDetails.src,
                dest: appDetails.dest,
                exclusions: [ appDetails.src + '/**/.DS_Store' ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    
    grunt.registerTask('about', function() {
        var pkg = grunt.file.readJSON('package.json'),
            bar = '----------------------------------------';
        
        console.log( bar );
        console.log( ' ' + pkg.name );
        console.log( ' By ' + pkg.author );
        console.log( bar );
        console.log( pkg.description );
    });

    grunt.registerTask('server', function () {
        grunt.task.run([
            'connect:local'
        ]);
    });
    
    grunt.registerTask('deploy', function () {
        grunt.task.run([
            'ftp-deploy'
        ]);
    });
    
    grunt.registerTask('default', ['about']);
};
