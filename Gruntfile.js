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
    
    postcss: {
      options: {
        map: {
            inline: false, // save all sourcemaps as separate files...
            annotation: './css/' // ...to the specified directory
        },

        processors: [
          require('autoprefixer')({browsers: 'last 3 versions'}), // add vendor prefixes
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

    watch: {
      options: {
        livereload: true
      },

      css: {
        // Which files to watch (all .less files recursively in the less directory)
        files: ['./css/**/*.less'],
        tasks: ['less', 'postcss'],
        options: {
          nospawn: true
        }
      },
      // Page will reload for changes to the following file types too
      otherFiles: {
        files: ['./**/*.php', './**/*.html', './**/*.htm'],
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
 
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
  grunt.registerTask('default', ['watch']);
};