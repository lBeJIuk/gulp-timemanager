# gulp-timemanager
Simple time manager for frontend

Helps to evaluate the time spent on development.

First step: initialization

  gulp.task('timer', function(cb) {
    timer().init();
    cb();
  });

Second step: Start count

  gulp.watch([path]).on("change", timer().count);
