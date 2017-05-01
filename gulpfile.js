const gulp = require('gulp');
const ts = require('gulp-typescript');
const zip = require('gulp-zip');

gulp.task('default', () => {
  'use strict';
  let tsProject = ts.createProject('tsconfig.json');
  const tsResult = gulp.src(['**/*.ts', '!./node_modules/**'])
    .pipe(tsProject())

  return tsResult.js.pipe(gulp.dest(''))
});

gulp.task('zip', ['default'], () => {
  'use strict';
  return gulp.src(['./index.js', './node_modules/**/*'], {base: '.'})
    .pipe(zip('weather-lambda.zip'))
    .pipe(gulp.dest('.'));
});