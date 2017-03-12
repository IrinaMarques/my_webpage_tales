var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var open = require('gulp-open');

gulp.task('connect', function() {
	connect.server({
		root: 'public',
    	livereload: true
	});
	gulp.src(__filename)
		.pipe(open({uri: 'http://localhost:8080'}));
});

gulp.task('public', function () {
	gulp.src('./public/**/*.*')
		.pipe(connect.reload());
});

gulp.task('sass', function() {
    gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'))
        .pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch(['./public/**/*.*', '!./public/css/*.*'], ['public']);
	gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['connect', 'watch']);