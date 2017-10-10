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
		wintersmith_compile: {
			production: {
				options: {
					config: 'config.build.json',
					output: 'build'
				}
			}
		},
        postcss: {
            options: {
              map: true, // inline sourcemaps
              processors: [
                require('pixrem')(), // add fallbacks for rem units
                require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                require('cssnano')() // minify the result
              ]
            },
            dist: {
              src: 'build/css/*.css'
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
	});
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-wintersmith-compile');
	grunt.loadNpmTasks('grunt-hashres');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-postcss');


	grunt.registerTask('default', [
			'clean:build',
			'sass',
			'wintersmith_compile',
			'copy',
			'postcss',
			//'hashres:css'
		]);
};
