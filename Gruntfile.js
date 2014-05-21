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
    // vendor prefixing
    autoprefixer: {
        options: {},
        files: {
          src: './css/style.css'
        }
    },
    // compress and minify
    csso: {
      compress: {
        options: {
          report: 'min'
        },
        files: {
          "./css/style.css": ["./css/style.css"]
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },

      css: {
        // Which files to watch (all .less files recursively in the less directory)
        files: ['./css/**/*.less'],
        tasks: ['less', 'autoprefixer', 'csso'],
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
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-csso');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
  grunt.registerTask('default', ['watch']);
};