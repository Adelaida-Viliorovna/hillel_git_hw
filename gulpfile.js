const gulp = require('gulp');
const { watch, series } = gulp;
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass')(require('sass'));

async function loadWebp() {
    const webp = await import('gulp-webp');
    return webp.default; // для сумісності з ESM
}

gulp.task('sass', function() {
    return gulp.src('app/scss/style.scss')
           .pipe(sass().on('error', sass.logError))
           .pipe(cssnano())
           .pipe(gulp.dest('dist/css'))
});

gulp.task('watch', function() {
    gulp.watch('app/scss/*.scss', gulp.series('sass'))
});

gulp.task('webp', async function() {
    const webp = await loadWebp();
    return gulp.src('app/img/*.jpg')
           .pipe(webp())
           .pipe(gulp.dest('dist/images'))
});
