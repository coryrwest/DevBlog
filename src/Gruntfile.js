module.exports = function (grunt) {
	grunt.initConfig({
		clean : {
			build : [
				'build'
			]
		},
		wintersmith : {
			production : {
				options : {
					config : './config.json'
				}
			},
			preview : {
				options : {
					action : "preview",
					config : './config.json'
				}
			}
		},
		cssmin : {
			target : {
				files : [{
						expand : true,
						cwd : 'contents/css',
						src : ['*.css'],
						dest : 'build/css',
						ext : '.css'
					}
				]
			}
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
		},
		ftp_push : {
			build : {
				options : {
					host : 'westroppstudios.com',
					port : 21,
					dest : '/public_html/corywestropp.com/develop',
					authKey : 'westroppstudios.com'
				},
				files : [{
						expand : true,
						cwd : 'build',
						src : ['**/*']
					}
				]
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-wintersmith');
	grunt.loadNpmTasks('grunt-hashres');
	grunt.loadNpmTasks('grunt-ftp-push');


	grunt.registerTask('deploy', [
			'clean:build',
			'wintersmith:production',
			'cssmin',
			'hashres:css',
			'ftp_push:build'
		]);
};
