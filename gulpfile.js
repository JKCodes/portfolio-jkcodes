var gulp = require('gulp')
var gp_concat = require('gulp-concat')
var gp_rename = require('gulp-rename')
var gp_uglify = require('gulp-uglify')
var minifyCSS = require('gulp-minify-css')
var autoprefixer = require('gulp-autoprefixer')

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

gulp.task('css', function() {
  return gulp.src(
      [
        './public/css/bootstrap.css',
        './public/style.css',
        './public/css/swiper.css',
        './public/css/dark.css',
        './public/css/font-icons.css',
        './public/css/animate.css',
        './public/css/magnific-popup.css',
        './public/css/responsive.css',
        './public/css/custom.css',        
      ]
    )
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(gp_concat('style.min.css'))
    .pipe(gulp.dest('./public/build/css/'))
})
gulp.task('default', ['build'], function(){})