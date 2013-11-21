// Grunt file for HelenGsonWallin
"use strict";

// HTML and CSS debug/dev syntax?
// removed in production

// "grunt-contrib-copy": "~0.4.1",
//      Fonts
//      Images
// "grunt-contrib-concat": "~0.3.0",     // Concat css and javascript
//      JS
//      Uglify does the work?
// "grunt-contrib-uglify": "~0.2.0",     // Javascript minification?
//      No options?
//      What do you do?
// "grunt-contrib-cssmin": "~0.6.0",     // Different from usemin?
//      Minify css (uglify?)
//      Also concat css?
//      This task is pre-configured if you do not wish to use Usemin
//      blocks for your CSS. By default, the Usemin block from your
//      `index.html` will take care of minification, e.g.
//          <!-- build:css({.tmp,app}) styles/main.css -->
// "grunt-contrib-htmlmin": "~0.1.3"     // Minify html? usefull? WHAT DO YOU DO?!
//      app.dev/*.html
// "grunt-contrib-imagemin": "~0.2.0",   // Minify images?
//      TROUBLE INSTALLING
//      images
// "grunt-rev": "~0.1.0",                // Revision names for files?  CDN
//      script
//      style
//      image
//      font
// "grunt-usemin": "~0.1.10",            // File types? WHAT DO YOU DO?
//      html
//      css
// "grunt-modernizr": "~0.3.0",          // Minify modernizr to only compile used features?
//      scripts
//      styles
//      !scripts/vendor

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    app: {
      dev: 'dev',
      dist: 'dist'
    },

    watch: {
      options: {
        nospawn: false
      },
      styles: {
        files: ['<%= app.dev %>/styles/*.less'],
        tasks: ['less:dev', 'autoprefixer:dev']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= app.dev %>/*.html',
          '<%= app.dev %>/scripts/*.js',
          '<%= app.dev %>/styles/*.css'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // hostname: '192.168.0.192'
        hostname: null
      },
      livereload: {
        options: {
          // open: true,
          base: '<%= app.dev %>'
        }
      },
      test: {
        options: {
          base: [
            'test',
            '<%= app.dev %>'
          ]
        }
      }
    },

    mocha: {
      all: {
        options: {
          run: true,
          urls: [ 'http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html' ]
        }
      }
    },

    less: {
      options: {
        files: [
        ]
      },
      dev: {
        files: {
          '<%= app.dev %>/styles/main.css': '<%= app.dev %>/styles/*.less',
        }
      },
      dist: {
        files: {
          '<%= app.dist %>/styles/main.css': '<%= app.dev %>/styles/*.less',
        }
      }
    },

    autoprefixer: {
      options: {
      },
      dev: {
        src: '<%= app.dev %>/styles/main.css'
      },
      dist: {
        src: '<%= app.dist %>/styles/main.css'
      }
    },

    clean: {
      dev: {
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= app.dist %>'
          ]
        }]
      }
    },

    uglify: {
      dist: {
        options: {
          report: 'gzip'
        },

        files : {
          'dist/scripts/parallax.js': [ 'dev/scripts/parallax.js' ],
          'dist/scripts/fixed_header.js': [ 'dev/scripts/fixed_header.js' ]

          // '<%= app.dist %>/scripts/parallax.js': [ '<%= app.dev %>/scripts/parallax.js' ],
          // '<%= app.dist %>/scripts/fixed_header.js': [ '<%= app.dev %>/scripts/fixed_header.js' ]
          // '<%= app.dist %>/scripts/main.min.js': [
          //   '<%= app.dev %>/scripts/parallax.js',
          //   '<%= app.dev &>/scripts/fixed_header.js'
          // ]  
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= app.dev %>',
          src: '*.html',
          dest: '<%= app.dist %>'
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= app.dev %>',
          dest: '<%= app.dist %>',
          src: [
            'logo.ico',
            'images/*.{jpg,png}',
            'styles/fonts/*.*',
            // #TEMP
            // Should be fixed in some other way
            'bower_components/jquery/jquery.min.js',
            'bower_components/modernizr/modernizr.js'
          ]
        }]
      }
    },

    cssmin: {
      dist: {
        cwd: '<%= app.dist %>/styles/',
        src: [ '*.css' ],
        dest: '<%= app.dist %>/styles/',
        ext: 'min.css'
      }
    }
  });

  grunt.registerTask('test', [
    'connect:test',
    'mocha'
  ]);

  grunt.registerTask('server', [
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('dev', [
    'less:dev',
    'autoprefixer:dev'
  ]);

  grunt.registerTask('dist', [
    'clean:dist',
    'less:dist',
    'autoprefixer:dist',
    'uglify:dist',
    'htmlmin:dist',
    'copy:dist',
    'cssmin:dist'
  ]);

  grunt.registerTask('default', [
    'dist'
  ]);
};