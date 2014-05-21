What is it
-----------------------------------------

This is my foundation for all the sites I build. I can't take credit for most of the code. I've organized the content but its all based on the work of others (HTML5 Boilerplate, Grunt, LESS CSS, etc)


Setting up the build system for LESS
-----------------------------------------

1. Make sure Node.js is installed: http://nodejs.org - If you go this route restart Windows or it won't get added to the system path

2. Install Livereload browser plugins available here: http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-

3. Make sure Gruntfile.js & package.json exist in your project directory
4. Open a command prompt
5. prompt> npm install -g grunt-cli 
    (installs the command line interface globally and should only be required once.)
6. prompt> navigate to project directory 
7. prompt> npm install  (should install a bunch of dependancies)
8. prompt> grunt (this will start the file watcher)
9. Activate browser plugin
10. Start editing files (if they're .js or .cshtml it'll reload, if they're .less it will compile + reload) 


What it does
-----------------------------------------

Grunt scripts do stuff to your base code. In this case it watches your project
directory and any time a LESS file is changed, that file will be compiled to CSS,
browser prefixed and compressed. If the Live Reloaded browser plugin exists it will
also reload your page with the newest compiled CSS

Current packages:
    grunt-contrib-less    https://github.com/gruntjs/grunt-contrib-less
    grunt-contrib-watch    https://github.com/gruntjs/grunt-contrib-watch
    grunt-contrib-concat    https://github.com/gruntjs/grunt-contrib-concat
    grunt-autoprefixer    https://github.com/nDmitry/grunt-autoprefixer
    grunt-csso     https://github.com/t32k/grunt-csso


Future
-----------------------------------------
Considering adding Icon stuff
http://filamentgroup.com/lab/grunticon.html