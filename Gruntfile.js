/*!
 * Shapes's Gruntfile
 * http://zafree.github.io/shapes
 * Copyright 2014-2015 Zafree
 * Licensed under MIT (https://github.com/shapes/blob/master/LICENSE)
 */

module.exports = function(grunt) {
  'use strict';
  
  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	banner: '/*!\n' +
            ' * Shapes v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2014-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
    
	express: {
	    all: {
	        options: {
	            bases: ['.'],
	            port: 9090,
	            hostname: "localhost",
	            livereload: true
	        }
	    }
	},
    
	open: {
	    all: {
	        path: 'http://localhost:9090/'
	    }
	},
	
    cssmin: {
    	options: {
	        banner: '<%= banner %>\n',
	    },
    	dist: {
	        src: ['dist/css/<%= pkg.name %>.css'],
	        dest: 'dist/css/<%= pkg.name %>.min.css'
	    }
    },
      
    less: {
    	options: {
	        banner: '<%= banner %>\n',
	    },
		development: {
		    options: {
		      paths: ["dist/css"]
		    },
		    files: {
		      "dist/css/<%= pkg.name %>.css": "less/<%= pkg.name %>.less"
		    }
		},
    	build: {
    	  src: ['less/<%= pkg.name %>.less'],
	      dest: 'dist/css/<%= pkg.name %>.css'
		}
	},    
        
	watch: {
		less: {
			files: 'less/*.less',
			tasks: ['less']
		},
		cssmin: {
			files: 'less/*.less',
			tasks: ['cssmin']
		},
		all: {
	        files: '**/*.html',
	        options: {
	            livereload: true
	        }
	    }
	}
  });

  // Load the plugin that provides the task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');

  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['less','cssmin']);
  
  // Creates the `server` task
  grunt.registerTask('serve', ['express','open','watch']);

};