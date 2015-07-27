
'use strict';

module.exports = function(grunt) {
  
// Dynamically load npm tasks
require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

// configuration
grunt.initConfig({
pkg: grunt.file.readJSON('package.json'),

	clean: { // delete files and folders in build dir but ignore mp3s
			src: [ 'public/_assets/build/**/*', ] 
	},


	concat: { // concat js files in source in order
		vendor: {
			src: ['public/_assets/source/bower/jquery/dist/jquery.js'],
			dest: 'public/_assets/build/js/vendor.js'
		}		
	},


	browserify: {	// transpile es6 to es5 and bundle to core.js in build
		dist: {
		    options: {
		       debug: true,
		       transform: [
		          ["babelify", {
		             loose: "all",
		             compact: "true"
		          }]
		       ]
		    },
		    files: {
		       // if the source file has an extension of es6 then
		       // we change the name of the source file accordingly.
		       // The result file's extension is always .js
		       "./public/_assets/build/js/core.js": ["./public/_assets/source/js/core.js"],
		       "./public/_assets/build/js/spa.js": ["./public/_assets/source/js/spa.js"]
		    }
		 }
	},


	eslint: {
        target: ['public/_assets/source/js/**/*.js']
    },


	jshint: {
    	all: {
    		options:{
    			force: true,
    			esnext: true
    		},
    		files: { 
    			src: ['public/_assets/source/js/**/*.js']
    		}
    	}
  	},


	watch: {
		// watch and concat js files
		scripts_watch: {
			files: [ 'public/_assets/source/js/**/*.js'],
			tasks: [ 'concat:vendor', 'browserify', 'jshint' ]
		}
	}

	});


	// Register Tasks
	grunt.registerTask('default', [ 'watch' ]);

	// Initialize Build dir
	grunt.registerTask('init', [ 'clean', 'concat', 'browserify' ]);



};

