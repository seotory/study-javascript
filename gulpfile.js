let gulp = require('gulp');
let browserSync = require('browser-sync').create();

let cfg = {
  path: './app/',
  dist: './dist/'
}

gulp.task('build', function () {
  return gulp
    .src(cfg.path+'**')
    .pipe(gulp.dest(cfg.dist)); 
});

gulp.task('serve', function () {
  // 서버 실행
  browserSync.init({
    server: {
      baseDir: cfg.path
    }
  });
  // 감시
  gulp.watch(cfg.path + '*', ['watch']);
});

gulp.task('watch', ['build'], function () {
  browserSync.reload();
  console.log('finish reload');
});

gulp.task('default', function () {
  console.log('default run.');
});