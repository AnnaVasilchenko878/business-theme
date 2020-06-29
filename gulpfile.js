var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
browserSync.create();

function transferToCss(done) {
    gulp.src('./scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename({ suffix: '-min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream())
    done();
};

function browserReload(done) {
    browserSync.reload();
    done();
};

function watchAll() {
    gulp.watch('./scss/**/*', transferToCss);
    gulp.watch('./**/*.html', browserReload);
    gulp.watch('./**/*.js', browserReload);
    gulp.watch('./**/*.php', browserReload);
}

function autoUpdates(done) {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 1000
    });
    done();
};

gulp.task('default', gulp.parallel(autoUpdates, watchAll));