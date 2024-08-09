const gulp = require('gulp');
const { series } = gulp;
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
           .pipe(gulp.dest('dist/css'));
});

gulp.task('webp', async function() {
    const webp = await loadWebp();
    return gulp.src('app/img/*.jpg')
           .pipe(webp())
           .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function() {
    // Спостерігає за змінами в SCSS файлах і виконує 'sass'
    gulp.watch('app/scss/*.scss', gulp.series('sass'));

    // Спостерігає за додаванням нових .jpg файлів і виконує 'webp'
    gulp.watch('app/img/*.jpg', gulp.series('webp'));
});
