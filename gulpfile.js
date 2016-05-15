'use strict';

var gulp = require('gulp');

gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = './';

  swPrecache.write(path.join(rootDir, 'service-worker.js'), {
    handleFetch: true,
    staticFileGlobs: [
        rootDir + '/app/**/*.*',
        rootDir + '/**.html',
        rootDir + '/images/**.*',
        rootDir + '/fonts/**.*'
      ],
    stripPrefix: rootDir
  }, callback);
});

gulp.task('generate-dev-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = './';

  swPrecache.write(path.join(rootDir, 'service-worker.js'), {
    handleFetch: false,
    staticFileGlobs: [
        rootDir + '/app/**/*.*',
        rootDir + '/**.html',
        rootDir + '/images/**.*'
      ],
    stripPrefix: rootDir
  }, callback);
});
