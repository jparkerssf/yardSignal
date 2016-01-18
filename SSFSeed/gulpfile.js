var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var Server = require('karma').Server;
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
gulp.task('test', function(done) {

  new Server({
    configFile: __dirname + '/tests/my.conf.js',
    singleRun: true,
    autoWatch: false
  }, done).start();
});

var preprocess = require('gulp-preprocess');
gulp.task('dev', function() {
  gulp.src('./AppSettings.js')
    .pipe(preprocess({context: { NODE_ENV: 'DEVELOPMENT', DEBUG: true}}))
    .pipe(gulp.dest('./www/js/'));
});

gulp.task('prod', function() {
  gulp.src('./AppSettings.js')
    .pipe(preprocess({context: { NODE_ENV: 'PRODUCTION'}}))
    .pipe(gulp.dest('./www/js/'));
});