const gulp = require('gulp');
const ts = require('gulp-typescript');

gulp.task('default', () => {
  let tsProject = ts.createProject('tsconfig.json');
  const tsResult = gulp.src(['**/*.ts', '!./node_modules/**'])
    .pipe(tsProject())

  return tsResult.js.pipe(gulp.dest(''))
});
