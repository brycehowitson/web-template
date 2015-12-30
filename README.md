My web template
-----------------------------------------

This is my foundation for all the sites I build. I can't take credit for most of the code. I've organized the content but its all based on the work of others (HTML5 Boilerplate, Grunt, LESS CSS, etc)

**Libraries referenced:**

* jQuery 1.11.3
* Modernizr 2.5.3 (haven't felt the need to upgrade)

**Libraries/plugins not referenced but included:**

* jQuery migrate 1.2.1
* Snap SVG
* jQuery Simple Modal 1.4.3 (plugins.js)
* jQuery HoverIntent r7 (plugins.js)
* jQuery helpers - tabs, fancy select menus, equal height columns, IE8 input placeholders, mark off-site links (jquery.extensions.js)


Setting up the build system for LESS
-----------------------------------------

1. Make sure Node.js is installed: http://nodejs.org - If you're using Windows restart or Node won't get added to the system path

2. Install Livereload browser plugins available here: http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-

3. Make sure Gruntfile.js & package.json exist in your project directory
4. Open a command prompt
5. prompt> npm install -g grunt-cli 
    (installs the command line interface globally and should only be required once.)
6. prompt> navigate to project directory 
7. prompt> npm install  (should install a bunch of dependancies)
8. prompt> grunt (this will start the file watcher)
9. Activate browser plugin
10. Start editing files (if they're .html, .htm, or .php it'll reload, if they're .less it will compile + reload) 


**What it does**

Grunt scripts do stuff to your base code. In this case it watches your project
directory and any time a LESS file is changed, that file will be compiled to CSS,
browser prefixed and compressed. If the Live Reloaded browser plugin exists it will
also reload your page with the newest compiled CSS

CSS is transformed with Javascript using PostCSS for IE compatibility, vendor prefixes and minification.

**Current packages:**

* grunt-contrib-less    https://github.com/gruntjs/grunt-contrib-less
* grunt-contrib-watch    https://github.com/gruntjs/grunt-contrib-watch
* grunt-contrib-concat    https://github.com/gruntjs/grunt-contrib-concat
* PostCSS autoprefixer     https://github.com/postcss/autoprefixer
* PostCSS CSSGrace     https://github.com/cssdream/cssgrace
* CSS Nano     http://cssnano.co/


Future
-----------------------------------------
Considering adding Icon stuff
http://filamentgroup.com/lab/grunticon.html