module.exports = function(grunt) {
    'use strict';
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
                'js/{,*/}*.js',
                '!js/plugins.js',
                '!js/vendor/*',
            ]
        },
        server: {
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
//    grunt.registerTask('server', function (target) {
//        if (target === 'dist') {
//            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
//        }
//
//        grunt.task.run([
//            //'clean:server',
//            //'compass:server',
//            'connect:livereload',
//            //'copy',
//            'open',
//            'watch'
//        ]);
//    });
    
    grunt.registerTask('default', ['jshint']);
};
