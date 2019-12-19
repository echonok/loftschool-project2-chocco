const { src, dest, task, series, watch, parallel } = require('gulp');
const concat = require('gulp-concat');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const fs = require('fs');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const { DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS } = require('./gulp.config');

sass.compiler = require('node-sass');

task('server', () => {
  return browserSync.init({ server: { baseDir: `./${DIST_PATH}` } });
});

const stylesFiles = [...STYLES_LIBS];

task('clean', () => {
  return src(`${DIST_PATH}/*`, { read: false })
    .pipe(rm());
});

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(`${DIST_PATH}`))
    .pipe(reload({ stream: true}));
});

task('styles', () => {
  return src(stylesFiles)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env === 'dev', autoprefixer({ cascade: false })))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}`))
    .pipe(reload({stream: true}));
});

task('scripts', () => {
  return src([...JS_LIBS])
    .pipe(gulpif(env === 'prod', sourcemaps.init()))
    .pipe(concat('index.js', {newLine: ';'}))
    .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(sourcemaps.write())
    .pipe(dest(`${DIST_PATH}/scripts`))
    .pipe(reload({stream: true}));
});

task('icons', () => {
  return src(`${SRC_PATH}/img/**/*.svg`)
    .pipe(svgo({
      plugins: [
        {
          removeAttrs: {
            attrs: "(fill|stroke|style|width|height|data.*)"
          }
        }
      ]
    }))
    .pipe(svgSprite({
      mode: {
        symbol: "../megasprite.svg"
      }
    }))
    .pipe(dest(`${DIST_PATH}/img`))
    .pipe(reload({stream: true}));
});

task('images', () => {
  return src(`${SRC_PATH}/img/**/*.*`)
    .pipe(dest(`${DIST_PATH}/img`))
    .pipe(reload({stream: true}));
});

task('fonts', () => {
  return src(`${SRC_PATH}/fonts/**/*.*`)
    .pipe(dest(`${DIST_PATH}/fonts`))
    .pipe(reload({stream: true}));
});

task('watch', () => {
  return watch(`./${SRC_PATH}/*.*`, allDevTasks);
});

const allDevTasks = series('clean', parallel('copy:html', 'styles', 'scripts', 'images', 'fonts'), parallel('server', 'watch'));

const allProdTasks = series('clean', parallel('copy:html', 'styles', 'scripts', 'images', 'fonts'));

task('default', allDevTasks);
task('build', allProdTasks);
