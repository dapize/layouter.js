const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const terser = require('gulp-terser');

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.tasks('build', function () {
  return gulp
    .src('./src/layouter.js')
    .pipe(terser({
      keep_fnames: true,
      mangle: false,
      output: {
        comments: false
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('default', ['browser-sync'])

exports.build = build;

