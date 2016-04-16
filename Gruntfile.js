module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'dist/css/main.css': './src/scss/index.scss',
          'dist/css/vendor.css': './src/scss/vendor.scss'
        }
      }
    },

    serve: {
      options: {
        port: 9000
      }
    },

    ngAnnotate: {
      options: {
        singleQuote: true  
      },
      production: {
        files: {
          'production/.tmp/vendors.js': [
            'dist/bower_main/underscore/*.js',
            'dist/bower_main/jquery/*.js',
            'dist/bower_main/angular/*.js',
            'dist/bower_main/**/*.js'
          ],
          'production/.tmp/main.js': [
            'dist/js/app.js',
            'dist/js/**/*.js'
          ]
        }
      }
    },

    cssmin: {
      production: {
        files: {
          'production/css/main.css': [
            'dist/css/vendor.css',
            'dist/css/main.css'
          ]
        }
      }
    },

    copy: {
      dist: {
        files: [
          {
            expand: true,
            src: 'assets/**/*',
            cwd: 'src/',
            dest: 'dist/'
          },
          {
            expand: true,
            src: ['js/**/*', '!js/**/*.spec.js'],
            cwd: 'src/',
            dest: 'dist/'
          }
        ]
      },
      production: {
        files: [{
          expand: true,
          src: 'assets/**/*',
          cwd: 'src/',
          dest: 'production/'
        }, {
          expand: true,
          cwd: 'src/',
          src: 'index.html',
          dest: 'production/'
        }]
      }
    },

    includeSource: {
      options:{
        rename: function (dest, matchedSrcPath, options) {
          if (matchedSrcPath.match(/\.scss$/)) {
            return matchedSrcPath;
          }
          return matchedSrcPath.replace(/^dist\//, '');
        },
        templates: {
          scss: {
            scss: '@import "{filePath}";',
            css: '@import "{filePath}";',
          },
        }
      },
      dist: {
        files: [
          {src: 'src/index.html', dest: 'dist/index.html'}
        ]
      }
    },

    wiredep: {
      sass: {
        src: 'src/scss/vendor.scss',
        devDependencies: false
      },
      fileTypes: {
        scss: {
          block: /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
          detect: {
            scss: /@import\s['"](.+scss)['"]/gi
          },
          replace: {
            scss: '@import "{{filePath}}";'
          }
        }
      }
    },

    replace: {
      productionIndex: {
        options: {
          patterns: [
            {match: /<link[^>]+?href="css\/vendor.css"[^>]+?>/, replacement: ''},
            {match: /<!-- <script src="js\/app.js"><\/script> -->/, replacement: '<script src="js/app.js"></script>'},
          ]
        },
        files: [{
          expand: true, flatten: true, src: ['src/index.html'], dest: 'production/'
        }]
      }
    },

    clean: {
      dist: ['dist'],
      production: ['production'],
      productionTmp: ['production/.tmp']
    },

    watch: {
      compile: {
        files: ['src/**/*'],
        tasks: ['compile'],
        options: {
          debounceDelay: 250,
          atBegin: true
        }
      }
    },

    ngtemplates: {
      app: {
        cwd: 'dist/',
        src: 'js/**/*.html',
        dest: 'production/.tmp/templates.js',
        options: {
          quotes: 'single'
        }
      }
    },

    uglify: {
      production: {
        files: {
          'production/js/app.js': [
            'production/.tmp/vendors.js',
            'production/.tmp/main.js',
            'production/.tmp/templates.js'
          ]
        }
      }
    },

    bower_main: {
      dist: {
        options: {
          dest: 'dist/bower_main'
        }
      }
    }
  });

  grunt.registerTask('compile', [
    'clean:dist',
    'bower_main:dist',
    'wiredep:sass',
    'sass:dist',
    'copy:dist',
    'includeSource:dist'
  ]);

  grunt.registerTask('create-production', [
    'clean:production',
    'copy:production',
    'cssmin:production',
    'ngAnnotate:production',
    'ngtemplates:app',
    'uglify:production',
    'clean:productionTmp',
    'replace:productionIndex'
  ]);
  grunt.registerTask('default', []);
};
