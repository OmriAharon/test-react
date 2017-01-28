module.exports = (gulp) => {

  if (!gulp)
    return;

  gulp.task('pre-commit', ['lint']);
};
