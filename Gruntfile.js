'use strict';

module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    column_lint: {
      files: {
        src: ['./lib/**/*.js']
      },
    },

    jshint: {
      src: ['./lib/**/*.js'],
      options: {
        globals: {},
        curly: true,
        camelcase: false,
        evil: false,
        browser: true,
        trailing: true,
        sub: true,
        eqeqeq: false,
        eqnull: true,
        devel: false,
        smarttabs: false,
        laxbreak: false,
        laxcomma: true,
        jquery: false,
        loopfunc: true,
        indent: 2,
        bitwise: true,
        noarg: true,
        noempty: true,
        nonew: true,
        undef: true,
        boss: true,
        node: true,
        newcap: true,
        quotmark: 'single',
        unused: true,
        strict: true,
        maxparams: 5,
        maxdepth: 5,
        maxstatements: 20,
        maxcomplexity: 10
      }
    },

    lintspaces: {
      javascript: {
        src: ['./lib/**/*.js'],
        options: {
          indentation: 'spaces',
          spaces: 2,
          newline: true,
          trailingspaces: true,
          ignores: ['js-comments']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-lintspaces');
  grunt.loadNpmTasks('grunt-column-lint');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['lintspaces', 'jshint', 'column_lint']);
};
