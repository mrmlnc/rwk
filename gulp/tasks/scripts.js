'use strict';

const $ = use(
  'chalk',
  'slash',
  'gulp-babel',
  'babel-preset-es2015',
  'gulp-concat',
  'gulp-sourcemaps'
);

function babelErrorHandler(err) {
  let msg = [err.name + ': ' + err.message.replace($.slash(process.cwd) + '/', '')];
  msg = msg.concat(err.codeFrame.split('\n'));
  msg.forEach((line) => {
    console.log($.chalk.red('>> ') + line);
  });

  this.emit('end');
}

function task() {
  return $.gulp.src([
    // If you want to observe the sequence of files in
    // the build - specify files here
    '**/*.js',
    '!{inline,vendor,tests}/**'
    // Other scripts
  ], { cwd: 'app/scripts' })
    .pipe($.babel({
      presets: ['es2015']
    }).on('error', babelErrorHandler))
    .pipe($.concat('scripts.bundle.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe($.gulp.dest('build/scripts'));
}

module.exports = {
  task
};
