module.exports = function(grunt) {
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      watch: {
         options: {
            livereload: true
         },
         scsslint: {
            files: ['<%= scsslint.files %>'],
            tasks: [/*'scsslint',*/ 'sass']
         },
         jshint: {
            files: ['<%= jshint.files %>', '.jshintrc'],
            tasks: ['jshint', 'uglify']
         },
         jade: {
            files: ['<%= sources.jade %>'],
            tasks: ['copy:jade']
         },
      },
      
      scsslint: {
         files: ['<%= sources.scss %>'],
         options: {
            config: '.scss-lint.yml'
         }
      },

      jshint: {
         files: ['<%= sources.gruntfile %>', '<%= sources.js %>', 'index.js'],
         options: {
            jshintrc: '.jshintrc'
         }
      },

      sass: {
         options: {
            loadPath: ['bower_components/bourbon/app/assets/stylesheets'],
            style: 'compressed',
            quiet: true,
         },
         dist: {
            files: [{
               expand: true,
               cwd: 'src/scss',
               src: ['*.scss'],
               dest: 'build/css',
               ext: '.css'
            }]
         }
      },

      uglify: {
         options: {
            mangle: {
               toplevel: true
            },
            report: 'gzip'
         },
         files: {
            src: ['<%= sources.js %>'],
            dest: 'build/js',
            expand: true,
            flatten: true,
            ext: '.min.js'
         }
      },
      
      copy: {
         jade: {
            expand: true,
            cwd: 'src/jade',
            src: '**',
            dest: 'build/jade'
         },
         assets: {
            expand: true,
            cwd: 'assets/',
            src: '**/*',
            dest: 'build/',
         },
      },
      
      clean: {
         data: ['build/*']
      },

      sources: {
         jade: ['src/jade/**/*.jade'],
         js: ['src/js/*.js', '!src/js/ga.js'],
         scss: ['src/**/*.scss', '!src/scss/bourbon/**/*'],
         build: ['build/**/*.js'],
         gruntfile: ['Gruntfile.js']
      }
   });

   for (var dependency in grunt.config('pkg').dependencies) {
      if (dependency.indexOf('grunt-') === 0) { grunt.loadNpmTasks(dependency); }
   }
   
   if (process.env.NODE_ENV !== 'production') {
      for (var devDependency in grunt.config('pkg').devDependencies) {
         if (devDependency.indexOf('grunt-') === 0) { grunt.loadNpmTasks(devDependency); }
      }
   }

   grunt.registerTask('build', ['clean', 'sass', 'uglify', 'copy']);
   grunt.registerTask('test', ['scsslint', 'jshint']);
   grunt.registerTask('default', ['build']);
};