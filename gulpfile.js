const gulp = require('gulp');
const { series } = gulp;
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass')(require('sass'));

const svgSprite = require('gulp-svg-sprite');

const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

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

gulp.task('svg-sprite', function() {
    return gulp.src('app/img/icons/*.svg') // Шлях до ваших SVG-файлів
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg", // Ім'я спрайту та місце його збереження
                    example: false
                }
            },
            shape: {
                id: {
                    separator: '-',
                    generator: function(name) {
                        return name.replace(/^.*[\\\/]/, '').replace('.svg', '');
                    }
                }
            }
        }))
        .pipe(gulp.dest('dist/img/icons')); // Кінцева папка для спрайту
});

gulp.task('watch', function() {
    // Спостерігає за змінами в SCSS файлах і виконує 'sass'
    gulp.watch('app/scss/*.scss', gulp.series('sass'));

    // Спостерігає за додаванням нових .jpg файлів і виконує 'webp'
    gulp.watch('app/img/*.jpg', gulp.series('webp'));

    // Спостерігає за додаванням або зміною SVG-файлів і виконує 'svg-sprite'
    gulp.watch('app/img/icons/*.svg', gulp.series('svg-sprite'));
});

gulp.task('minify-css', () => {
    return gulp.src('app/scss/style.scss')
      .pipe(cleanCSS())
      .pipe(gulp.dest('dist/css'));
  });
  
  // Мінімізація JS
  gulp.task('minify-js', () => {
    return gulp.src('index.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
  });
  
  gulp.task('default', gulp.series('minify-css', 'minify-js'));