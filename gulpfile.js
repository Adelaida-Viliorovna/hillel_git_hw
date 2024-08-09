const { watch, series } = require('gulp');
var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
const sass = require('gulp-sass')(require('sass'));

gulp.task('sass', function() {
    return gulp.src('app/scss/style.scss')
           .pipe(sass().on('error', sass.logError))
        //    .pipe(cssnano())
           .pipe(gulp.dest('dist/css'))
})

gulp.task('watch', function() {
    gulp.watch('app/scss/*.scss', gulp.series('sass'))
})
