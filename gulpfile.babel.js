'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import csso from 'gulp-csso';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';

browserSync.create();

// Paths
const dirs = {
  src: './src/',
  dest: './dist/assets/'
};

const sassPath = {
  src: `${dirs.src}/scss/main.scss`,
  dest: `${dirs.dest}/css/`
};

const jsPath = {
  src: `${dirs.src}/js/main.js`,
  dest: `${dirs.dest}/js/`
};

// CSS (SCSS)
gulp.task('scss', () => {
  return gulp.src(sassPath.src)
    .pipe( sourcemaps.init() )
    .pipe( autoprefixer() )
    .pipe( sass().on('error', sass.logError) )
    .pipe( csso() )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest(sassPath.dest) )
    .pipe( browserSync.stream() )
});

// ES6 (Babel)
gulp.task('js', () => {
  return gulp.src(jsPath.src)
    .pipe( sourcemaps.init() )
    .pipe( babel({ presets: ['env'] }) )
    .pipe( uglify() )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest(jsPath.dest) )
    .pipe( browserSync.stream() )
});

// Serve
gulp.task('serve', () => {

  browserSync.init({
    server: { baseDir: 'dist' }
  });

  gulp.watch('src/**/*.scss', ['scss']);
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('dist/**/*.html')
    .on('change', browserSync.reload);
});

// Default
gulp.task('default', ['scss', 'js' , 'serve']);