module.exports = function(grunt) {
    'use strict';
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 3333,
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
        server: {
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    
    grunt.registerTask('about', function() {
        var pkg = grunt.file.readJSON('package.json'),
            bar = '----------------------------------------';
        
        console.log( bar );
        console.log( ' ' + pkg.name );
        console.log( ' By ' + pkg.author );
        console.log( bar );
        console.log( pkg.description );
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }
    
        grunt.task.run([
            //'clean:server',
            //'compass:server',
            //'connect:livereload',
            //'copy',
            'open',
            'watch'
        ]);
    });
    
    grunt.registerTask('default', ['about']);
};
