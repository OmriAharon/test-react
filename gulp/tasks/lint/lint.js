module.exports = (gulp) => {

  if (!gulp)
    return;

  gulp.task('lint', function(callback) {

    const runSequence = require('run-sequence').use(gulp);

        // We run the lints using the run-sequence so we won't get all the errors all mixed up with
        // each other when we'll have more than 1 lint task
    runSequence(['js:lint'], ['sass:lint'], function() {
      callback();
    });
  });
};
