const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const del = require('del');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const gzip = require('gulp-gzip');
const htmlmin = require('gulp-htmlmin');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

const options = {
    dist: './dist',
    src: {
        assets: [],
        html: './src/index.html',
        js: ['./src/scripts/main.js', './src/scripts/modules/**'],
        sass: ['./src/sass/main.scss']
    },
    watch: {
        sass: ['./src/sass/**/*.scss']
    }
};

let isProduction = false;

function errorHandler() {
    return plumber({
        errorHandler: (err) => {
            notify.onError({
                title: 'Gulp error in ' + err.plugin,
                message: err.toString()
            })(err);
        }
    });
}

gulp.task('prod', ['clean'], () => {
    isProduction = true;
    runSequence(['assets', 'html', 'sass', 'scripts']);
});

gulp.task('clean', () => {
    return del(options.dist);
});

gulp.task('assets', () => {
    return gulp.src(options.src.assets)
        .pipe(gulp.dest(options.dist));
});

gulp.task('html', () => {
    return gulp.src(options.src.html)
        .pipe(gulpIf(isProduction, htmlmin({
            collapseWhitespace: true,
            removeComments: true
        })))
        .pipe(gulp.dest(options.dist))
        .pipe(gulpIf(isProduction, gzip()))
        .pipe(gulp.dest(options.dist))
        .pipe(browserSync.stream());
});

gulp.task('sass', () => {
    return gulp.src(options.src.sass)
        .pipe(gulpIf(!isProduction, errorHandler()))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulpIf(isProduction, cleanCSS()))
        .pipe(gulp.dest(options.dist))
        .pipe(gulpIf(isProduction, gzip()))
        .pipe(gulp.dest(options.dist))
        .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
    return gulp.src(options.src.js)
        .pipe(concat('main.js'))
        .pipe(gulpIf(isProduction, uglify()))
        .pipe(gulp.dest(options.dist))
        .pipe(gulpIf(isProduction, gzip()))
        .pipe(gulp.dest(options.dist))
        .pipe(browserSync.stream());
});

gulp.task('dev', ['html', 'sass', 'scripts'], () => {
    browserSync.init({
        server: {
            baseDir: options.dist
        }
    });

    gulp.watch(options.src.html, ['html']);
    gulp.watch(options.src.js, ['scripts']);
    gulp.watch(options.watch.sass, ['sass']);
});
