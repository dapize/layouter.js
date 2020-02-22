const {watch} = require('gulp');
const browserSync = require('browser-sync').create();
const fs = require('fs');
const Terser = require('terser');

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

const build = function (deploy) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync('./dist')) fs.mkdirSync('./dist');
    fs.readFile('./src/layouter.js', 'utf8', (err, contents) => {
      if (err) reject(err);
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
      const pathDist = './dist/layouter.js';
      fs.writeFile(pathDist, layouterCode, (err) => {
        if (err) reject(err);
        console.log('Archivo compilado!');
        browserSync.reload();
        resolve();
      });
      // just in deploy
      if (deploy) {
        const result = Terser.minify({ 'layouter.js': layouterCode }, {
          output: {
            comments: false
          }
        });

        let layouterPathMin = pathDist.split('.');
        layouterPathMin.pop();
        fs.writeFileSync('.' + layouterPathMin.join('') + '.min.js', result.code, 'utf8');
        if (result.error) console.log(result.error);
        if (result.warnings) console.log(result.warnings);
      }
    });
  });
};

const deploy = function () {
  return build(true);
};

exports.build = build;
exports.serve = serve;
exports.deploy = deploy;