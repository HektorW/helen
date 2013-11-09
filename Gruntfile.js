// Grunt file for HelenGsonWallin
"use strict";

module.exports = function(grunt) {
  grunt.initConfig({
    app: {
      dev: 'dev',
      dist: 'dist'
    },
    less: {
      options: {
        files: [
        ]
      },
      development: {
        files: {
          '<%= app.dev %>/main.css': '<%= app.dev %>/styles/*.less',
        }
      },
      dist: {
        files: {
          '<%= app.dist %>/main.css': '<%= app.dev %>/styles/*.less',
        }
      }
    },
    autoprefixer: {

    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('default', [
    'less:dist'
    // 'autoprefixer'
  ]);
};