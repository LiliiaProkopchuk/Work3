const gulp = require('gulp'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    cnct = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    cssnano = require('gulp-cssnano');

gulp.task('allcss', function () {
    return gulp.src('src/assets/css/*.css')
        .pipe(cssnano())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('src/assets/css'))
});

gulp.task('scripts', () => {
    return gulp.src([
        'src/assets/plugins/jquery.barrating.min.js',
        'src/assets/plugins/jquery.bxslider.js'
    ])
        .pipe(cnct('plugins.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/assets/js'));
});

gulp.task('img-min', () => {
    return gulp.src('src/assets/images/**/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }]
        }))
        .pipe(gulp.dest('src/assets/images'))
});

gulp.task('clean', (done) => {
    del(['./dist/*']);
    done();
});

gulp.task('move', (done) => {
    const buildCSS = gulp.src('src/assets/css/**/*')
        .pipe(gulp.dest('dist/assets/css'));

    const buildFonts = gulp.src('src/assets/fonts/**/*')
        .pipe(gulp.dest('dist/assets/fonts'));

    const builIMG = gulp.src('src/assets/images/**/*')
        .pipe(gulp.dest('dist/assets/images'));

    const buildJS = gulp.src('src/assets/js/**/*')
        .pipe(gulp.dest('dist/assets/js'));

    const buildPlugins = gulp.src('src/assets/plugins/**/*')
        .pipe(gulp.dest('dist/assets/plugins'));

    const buildData = gulp.src('src/data/**/*')
        .pipe(gulp.dest('dist/data'));

    const buildHTML = gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
    done();
});

gulp.task('build', gulp.series('clean', gulp.parallel('scripts', 'img-min'), 'allcss', 'move'), function (done) {
    done();
});