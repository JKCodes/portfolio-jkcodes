var gulp = require('gulp')
var gp_concat = require('gulp-concat')
var gp_rename = require('gulp-rename')
var gp_uglify = require('gulp-uglify')
var minifyCSS = require('gulp-minify-css')

gulp.task('build', function() {
  return gulp.src(
      [
        './public/js/jquery.js',
        './public/js/plugins.js',
        './public/js/functions.js'
      ]
    )
    .pipe(gp_concat('gulp-concat.js'))
    .pipe(gulp.dest('./public/min/'))
    .pipe(gp_rename('vendor.min.js'))
    .pipe(gp_uglify())
    .pipe(gulp.dest('./public/build/'));
})

gulp.task('default', ['build'], function(){})