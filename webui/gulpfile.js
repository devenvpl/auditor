﻿'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const inject = require('gulp-inject');
const clean = require('gulp-clean');
const series = require('stream-series');
const concat = require('gulp-concat');
const serve = require('gulp-serve');
const copy = require('gulp-copy');
const rename = require('gulp-rename');
const browserify = require('gulp-browserify');

gulp.task('dist:clean', () => {
    return gulp.src('./dist/*')
        .pipe(clean());
});

gulp.task('dist:vendor:lodash', ['dist:clean'], () => {
   return gulp.src('./node_modules/lodash/index.js')
       .pipe(browserify())
       .pipe(rename('lodash.js'))
       .pipe(gulp.dest('./node_modules/lodash/'));
});

gulp.task('dist:vendor', ['dist:clean', 'dist:vendor:lodash'], () => {
    return gulp.src([
            './node_modules/angular/angular.js',
            './node_modules/angular-resource/angular-resource.js',
            './node_modules/angular-animate/angular-animate.js',
            './node_modules/angular-sanitize/angular-sanitize.js',
            './node_modules/angular-loading-bar/build/loading-bar.js',
            './node_modules/angular-ui-router/release/angular-ui-router.js',
            './node_modules/ng-toast/dist/ngToast.js',
            './node_modules/lodash/lodash.js'
        ]).pipe(concat('vendor.js', {newLine: ';'}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('dist:app', ['dist:clean'], () => {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./'));
});

gulp.task('dist:inject', ['dist:clean', 'dist:app', 'dist:vendor'], () => {
    var vendorStream = gulp.src(['./dist/vendor.js'], {read: false});
    var appStream = gulp.src(['./src/*.js'], {read: false});

    return gulp.src('./index.html')
        .pipe(inject(series(vendorStream, appStream), {relative: true}))
        .pipe(gulp.dest('./'));
});

gulp.task('dist', [
    'lint', 'dist:clean', 'dist:app', 'dist:vendor', 'dist:inject'
]);

gulp.task('serve', serve('./'));

gulp.task('lint', function () {
    return gulp.src(['./src/**/*.js', './src/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
