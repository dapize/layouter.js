const { src, dest, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const fs = require('fs');
const Terser = require('gulp-terser');
const jsdoc = require('gulp-jsdoc3');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const data = require('gulp-data');
const fm = require('front-matter');
const swig = require('gulp-swig');
const size = require('gulp-filesize');


const template = (content) => {
  return `(function (root) {
'use strict';
  ${content}

  // EXPORTING
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = Layouter;
    }
    exports.Layouter = Layouter;
  } else {
    root.Layouter = Layouter;
  }
}(this));`
};

const dist = () => {
  return new Promise((resolve, reject) => {
    const fDist = './dist';
    fs.access(fDist, fs.F_OK, function(err) {
      if (!err) resolve();
      if (err) {
        fs.mkdir(fDist, { recursive: true }, err => {
          if (err) reject(err);
          resolve()
        });
      } 
    });
  });
};

const build = () => {
  return src([
    './src/utils.js',
    './src/constructor.js',
    './src/methods.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('layouter.js'))
    .pipe(data(function(file) {
      const content = fm(String(file._contents));
      file._contents = template(Buffer.from(content.body));
      return file._contents;
    }))
    .pipe(swig())
    .pipe(rename('layouter.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('./dist'))
    .pipe(size());
};

const buildMin = () => {
  return src('./dist/layouter.js')
    .pipe(rename('layouter.min.js'))
    .pipe(sourcemaps.init())
    .pipe(Terser({ output: { comments: false } }))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('./dist'))
    .pipe(size());
};

const serve = function () {
   browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  return watch(['./src/*.js', './main.js','./main.css' ,'./index.html'], function(cb) {
    build();
    cb();
  });
};

const doc = () => {
  return src([
    './src/utils.js',
    './src/constructor.js',
    './src/methods.js'
    ])
    .pipe(jsdoc({
      "opts": {
        "destination": "./docs",
        "template": "./node_modules/foodoc/template"
      },
      "source": {
        "includePattern": ".+\\.js(doc)?$",
        "excludePattern": "(^|\\/|\\\\)_",
        "include": ["./README.md"]
      }
    }))
};

exports.build = series(dist, build);
exports.min = series(dist, buildMin);
exports.serve = serve;
exports.deploy = series(dist, build, buildMin);
exports.doc = series(dist, build, doc);