module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      // compile less files but don't compress
      development: {
        options: {},
        files: {
          // target.css file: source.less file
          "./css/style.css": "./css/style.less"
        }
      }
    },
    
    sass: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                './css/style.css': './css/style.scss'
            }
        }
    },

    postcss: {
      options: {
        map: {
            inline: false, // save all sourcemaps as separate files...
            annotation: './css/' // ...to the specified directory
        },

        processors: [
          require('cssgrace'), // IE fallbacks
          require('autoprefixer')({
            browsers: 'last 3 versions', // add vendor prefixes
            remove: true // doesn't strip un-needed prefixes - only use with new code.
          }), 
          require('cssnano')({
            zindex: false,
            autoprefixer: false
          }) // minify the result
        ]
      },
      dist: {
        src: './css/style.css'
      }
    },

    chokidar: {
      options: {
        interval: 600,
        livereload: true
      },

      css: {
        files: ['./css/**/*.scss'],
        tasks: ['sass', 'postcss'],
        options: {
          nospawn: true
        }
      },
      // Page will reload for changes to the following file types too
      otherFiles: {
        files: ['./**/*.php', './**/*.html', './**/*.htm', '!node_modules/**/*.*'],
        tasks: [],
        options: {
          nospawn: true
        }
      },
      // Force Grunt to restart if the config changes
      configFiles: {
        files: [ 'Gruntfile.js', 'config/*.js' ],
        options: {
          reload: true
        }
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-chokidar');
 
  grunt.registerTask('default', ['chokidar']);
};