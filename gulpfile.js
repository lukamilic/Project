'use strict';

// Node Require

           var gulp = require('gulp'),
             concat = require('gulp-concat'),
             uglify = require('gulp-uglify'),
           cleanCSS = require('gulp-clean-css'),
             rename = require('gulp-rename'),
         sourcemaps = require('gulp-sourcemaps'),
    convertEncoding = require('gulp-convert-encoding');

// Gulp Tasks definition

gulp.task('minifyJS', function(){
    return gulp.src('src/js/**/*.js')
        .pipe(convertEncoding({to: 'utf8'}))
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minifyCss', function() {
    return gulp.src(['node_modules/basscss/css/basscss.min.css', 'src/css/**/*.css'])
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css'));
});

// Watch, Build and Default

gulp.task('watchJs', function(){
    gulp.watch(['src/js/**/*.js'], ['minifyJS'])
});

gulp.task('watchCss', function(){
    gulp.watch(['src/css/**/*.css'], ['minifyCss'])
});

gulp.task('watch', ['watchJs', 'watchCss'], function(){
    console.log('Waiting for changes in JS or CSS');
});

gulp.task('build', ['minifyJS', 'minifyCss'], function(){
    console.log('Build Complete');
});

gulp.task('default', ['build'], function(){
    console.log('All Tasks Complete');
});