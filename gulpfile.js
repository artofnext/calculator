const { series, parallel } = require('gulp');
let gulp = require('gulp');
let sass = require('gulp-sass');
let minify = require('gulp-minify');
let sourcemaps = require('gulp-sourcemaps');
let autoprefixer = require('gulp-autoprefixer');

let cleanCSS = require('gulp-clean-css');


function compile() {
    return gulp.src("./css/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass(/*{outputStyle: 'compressed'}*/))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest((file) => {
            return file.base;
        }));
};

function autoPrefix() {
    return gulp.src("./css/*.css")
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest((file) => {
        return file.base;
    }));
}

function minifyCSS() {
    // Folder with files to minify
    return gulp.src('css/*.css')
    //The method pipe() allow you to chain multiple tasks together 
    //I execute the task to minify the files
   .pipe(cleanCSS())
   //I define the destination of the minified files with the method dest
   .pipe(gulp.dest((file) => {
    return file.base;
    }));
}

function minifyJS() {
    return gulp.src('js/main.js', { allowEmpty: true }) 
        .pipe(minify({noSource: true}))
        .pipe(gulp.dest('js/'))
}

function watch() {
    return gulp.watch('./css/**/*.scss', compile);
};

exports.default = function() {
    return compile();
};

exports.compile = compile;
exports.watch = watch;
exports.minifyCSS = minifyCSS;
exports.minifyJS = minifyJS;
exports.prefix = autoPrefix;
exports.build = parallel(minifyJS, series(compile, autoPrefix, minifyCSS));


// gulp --tasks  to see registered tasks