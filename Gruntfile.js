module.exports = function (grunt) {
	grunt.initConfig({
		clean : {
			build : [
				'build'
			]
		},
		sass: {
	        options: {
	            sourceMap: true
	        },
	        dist: {
	            files: {
	                'build/css/main.css': 'src/css/main.scss'
	            }
	        }
	    },
		cssmin : {
			target : {
				files : [{
						expand : true,
						cwd : 'build/css',
						src : ['*.css'],
						dest : 'build/css',
						ext : '.css'
					}
				]
			}
		},
		wintersmith_compile: {
			production: {
				options: {
					config: 'config.build.json',
					output: 'build'
				}
			}
		},
		uncss: {
		   dist: {
		      options: {},
		      files: {
		         'build/css/main.css': ['build/*.html', 'build/page/*.html', 'build/articles/*.html']
		      }
		   }
		},
		copy: {
		  main: {
		    files: [
		      {expand: true, src: ['src/cache.manifest'], dest: 'build', flatten: true, filter: 'isFile'},
		    ],
		  },
		},
		hashres : {
			options : {
				encoding : 'utf8',
				fileNameFormat : '${name}.${hash}.cache.${ext}',
				renameFiles : true
			},
			css : {
				options : {},
				src : ['build/css/*.css'],
				dest : 'build/**/*.html'
			}
		}
		// ftp_push : {
		// 	build : {
		// 		options : {
		// 			host : 'westroppstudios.com',
		// 			port : 21,
		// 			dest : '/public_html/corywestropp.com/develop',
		// 			authKey : 'westroppstudios.com'
		// 		},
		// 		files : [{
		// 				expand : true,
		// 				cwd : 'build',
		// 				src : ['**/*']
		// 			}
		// 		]
		// 	}
		// }
	});
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-wintersmith-compile');
	grunt.loadNpmTasks('grunt-hashres');
	//grunt.loadNpmTasks('grunt-ftp-push');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-uncss');


	grunt.registerTask('deploy', [
			'clean:build',
			'sass',
			'cssmin',
			'wintersmith_compile',
			'copy',
			//'hashres:css'
			//'ftp_push:build'
		]);
};
