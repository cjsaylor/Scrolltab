/*jshint node: true */

'use strict';

module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: [
				'Gruntfile.js',
				'jquery.scrolltab.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> | http://chris-saylor.com/Scrolltab */\n',
				compress: true
			},
			build: {
				files: {
					'build/jquery.scrolltab-<%= pkg.version %>.min.js': 'jquery.scrolltab.js'
				}
			}
		},
		watch: {
			files: [
				'jquery.scrolltab.js'
			],
			tasks: 'default'
		},
		compare_size: {
			files: [
				'build/jquery.scrolltab-<%= pkg.version %>.min.js',
				'jquery.scrolltab.js'
			],
			options: {
				compress: {
					gz: function (fileContents) {
						return require('gzip-js').zip(fileContents, {}).length;
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-compare-size');

	grunt.registerTask('default', ['jshint', 'uglify', 'compare_size']);
	grunt.registerTask('ci', ['jshint']);
};
