const { src, dest, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const fs = require('fs');


// Static server
const serve = function () {
   browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  return watch(['./src/layouter.js', './main.js', './index.html'], function(cb) {
    build();
    cb();
  });
};

const build = function () {
  if (!fs.existsSync('./dist')) fs.mkdirSync('./dist');
  return fs.readFile('./src/layouter.js', 'utf8', (err, contents) => {
    const layouterCode = `(function (root) {
  'use strict';
  ${contents}

  // Export Layouter
  if (typeof module === "object" && module.exports) {
    module.exports = Layouter;
  } else {
    root.Layouter = Layouter;
  }
})(this);`
    fs.writeFile('./dist/layouter.js', layouterCode, (err) => {
      if (err) throw err;
      console.log('Archivo compilado!');
      browserSync.reload();
    });
  });
};


exports.build = build;
exports.serve = serve;

