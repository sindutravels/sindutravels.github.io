var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');


// Concat and minify the javascript
gulp.task('scripts', function(){
  return gulp.src([
        'js/scripts.js',
    ])
    .pipe(concat('scripts.js'))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('../src/js'));
});

// Build Sass
gulp.task('sass', function () {
 return gulp.src([
    'scss/styles.scss',
    ])
   .pipe(concat('styles.css'))
   .pipe(rename('styles.min.css'))
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('../src/css'));
});

// Watch
gulp.task('watch', function() {
  gulp.watch('./js/*.js', ['scripts']);
   gulp.watch('./scss/**/*.scss', ['sass']);
});

// Default
gulp.task('default', ['scripts', 'sass', 'watch']);
