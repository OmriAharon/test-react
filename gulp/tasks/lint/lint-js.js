/**
 * @fileoverview Initializing the tasks that are related to the js linting
 */

"use strict";

const eslint = require('gulp-eslint');
const gulpUtils = rootRequire('./gulp/gulp-utils');
const gulpdebug = require('gulp-debug');
const gulpif = require('gulp-if');
const git = require('gulp-git');
const config = rootRequire('./gulp/config');
const Q = require('q');
const through = require('through2');
const args = rootRequire('./gulp/gulp-args');

/**
 * Checks if the file has been modified by fix or not
 * @param {eslintFIle} file - the eslint file
 * @return {boolean|*} - if the file has been modified by fix or not
 */
function isFixed(file) {
    // Has ESLint fixed the file contents?
  return file.eslint !== null && file.eslint.fixed;
}

let filesToLint;
let lintDeferred;
let filesCounter;

/* eslint-disable consistent-return */
/**
 * Runs eslint
 * @param {Object} gulp - the gulp instance
 * @param {Array} files - an array of file paths to lint
 * @param {Q.Defer} deferred - The deferred to finish the task. Used when --all is undefined
 *
 * @return {Stream} - returns the stream in case we need it for non deferred mode
 */
function runEslint(gulp, files, deferred) {
  const ProgressBar = require('progress');
  const bar = new ProgressBar('[:bar] :current/:total | :percent :elapseds', { total: filesCounter, width: 80, incomplete: ' ' });

  let passedLinting = true;
  const stream = gulp.src(files, { base: './' })
      .pipe(gulpif(args.showProccesedFiles, gulpdebug()))
      .pipe(through.obj(function(file, enc, cb) {
        bar.tick();
        cb(null, file);
      }))
      .pipe(eslint(config.eslintOptions))
      // Prints to the console each row of an error
      .pipe(eslint.format('stylish'))
      .pipe(gulpif(isFixed, gulp.dest('./')))
      // Reports the task as failed if errors were found (so the git commit will fail)
      .pipe(eslint.failAfterError());

  stream.on('error', function(error) {
    passedLinting = false;

    if (deferred) {
      deferred.reject(error);
    }
  });

  stream.on('finish', function() {
    if (passedLinting && deferred) {
      deferred.resolve();
    }
  });

  if (!deferred) {
    return stream;
  }
}
/* eslint-enable consistent-return*/

/**
 * Initialize the gulp tasks regarding the js linting
 * @param {Object} gulp - the gulp instance
 */
const registerTasks = function registerTasks(gulp) {
  if (!gulp) {
    console.log('Trying to register gulp tasks without an instance of gulp');
  } else {
        // A task to count all the files to lint
    gulp.task('js:lint:count-files', function() {
      filesCounter = 0;
      return gulp.src(filesToLint)
                .pipe(through.obj(function(file, enc, cb) {
                  filesCounter++;
                  cb();
                }));
    });

        // A task to find all the files to lint
    gulp.task('js:lint:find-files', function(callback) {
      filesToLint = [];
      lintDeferred = undefined;

      if (args.all) {
        filesToLint = config.sources.eslint;
        callback();
      } else {
                // Why do we use this defer?
                // Gulp has a bug that for a long list of file sources it works only with regular streams, while for short list (< 16)
                // it breaks the stream and the task ends before the time.
                // To fix that we're using promises to finish the gulp task by calling the promise callback when the task finishes.
        lintDeferred = Q.defer();

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
                filter: '.+\.js$',
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

    gulp.task('js:lint:run', function() {
      if (args.fix) {
        config.eslintOptions.fix = true;
      }

      if (lintDeferred) {
        runEslint(gulp, filesToLint, lintDeferred);
        return lintDeferred.promise;
      } else {
        return runEslint(gulp, filesToLint, lintDeferred);
      }
    });

        // A task for running linting of the js files
    gulp.task('js:lint', function(callback) {
      const runSequence = require('run-sequence').use(gulp);

      runSequence(['js:lint:find-files'], ['js:lint:count-files'], ['js:lint:run'], function() {
        callback();
      });
    });
  }
};

module.exports = registerTasks;
