var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    content_includer = require('gulp-content-includer');

/**
 * Make sidebar menu.
 */
gulp.task('make_sidebar_menu', function() {
    // Read ui elements.
    // Put each element into li.
    // Store lis into sidebar menu.
});

gulp.task('default', function() {
    gulp.src("./src/layout.html")
        .pipe(content_includer({
            includerReg:/<!\-\-\sinclude\s+"([^"]+)"\s\-\->/g,
            baseSrc:"src",
            deepConcat:true
        }))
        .pipe(rename('index2.html'))
        .pipe(gulp.dest('./'));
});