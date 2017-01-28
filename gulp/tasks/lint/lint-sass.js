/**
 * @fileoverview Initializing the tasks that are related to the sass linting
 */

"use strict";
const config = rootRequire('./gulp/config');
const sassLint = require('gulp-sass-lint');
const args = rootRequire('./gulp/gulp-args');
const through = require('through2');
const gulpUtils = rootRequire('./gulp/gulp-utils');
const gulpdebug = require('gulp-debug');
const gulpif = require('gulp-if');
const git = require('gulp-git');

let filesToLint;
let filesCounter;

/**
 * Initialize the gulp tasks regarding the sass linting
 * @param {Object} gulp - the gulp instance
 */
const registerTasks = function registerTasks(gulp) {
  if (!gulp) {
    console.log('Trying to register gulp tasks without an instance of gulp');
  } else {
        // A task to count all the files to lint
    gulp.task('sass:lint:count-files', function() {
      filesCounter = 0;
      return gulp.src(filesToLint)
                .pipe(through.obj(function(file, enc, cb) {
                  filesCounter++;
                  cb();
                }));
    });

        // A task to find all the files to lint
    gulp.task('sass:lint:find-files', function(callback) {
      filesToLint = [];

      if (args.all) {
        filesToLint = config.sources.sass;
        callback();
      } else {
        if (args.path) {
          filesToLint.push(args.path);
          callback();
        } else {
          git.status({ args: '--porcelain', quiet: true }, function(err, stdout) {
            if (err) {
              throw err;
            } else {
              const rows = stdout.split('\n');
              const options = {
                filter: '.+\.scss$',
                excludeStatuses: ['d']
              };
              rows.forEach(function(row) {
                if (gulpUtils.doesWorkspaceFileMatch(row, options)) {
                  const statusParts = row.split(' ');
                  const filePath = statusParts[statusParts.length - 1];
                  filesToLint.push(filePath);
                }
              });

              callback();
            }
          });
        }
      }
    });

    gulp.task('sass:lint:run', function() {
      const ProgressBar = require('progress');
      const bar = new ProgressBar('[:bar] :current/:total | :percent :elapseds', { total: filesCounter, width: 80, incomplete: ' ' });

      return gulp.src(filesToLint, { base: './' })
                .pipe(gulpif(args.showProccesedFiles, gulpdebug()))
                .pipe(through.obj(function(file, enc, cb) {
                  bar.tick();
                  cb(null, file);
                }))
                .pipe(sassLint(config.sassLintOptions))
                .pipe(sassLint.format())
                .pipe(sassLint.failOnError());
    });

        // A task for running linting of the js files
    gulp.task('sass:lint', function(callback) {
      const runSequence = require('run-sequence').use(gulp);

      runSequence(['sass:lint:find-files'], ['sass:lint:count-files'], ['sass:lint:run'], function() {
        callback();
      });
    });
  }
};

module.exports = registerTasks;
