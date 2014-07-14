var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var watch = require('gulp-watch');

gulp.task('default', function () {
    gulp.src('./coffee/*.coffee')
	    .pipe(watch(function(files) {
	        return files.pipe(coffee({bare: true}).on('error', gutil.log))
                        .pipe(gulp.dest('./public/assets/js'));
	    }));
});

gulp.task('coffee', function() {
  gulp.src('./coffee/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./public/assets/js'))
});