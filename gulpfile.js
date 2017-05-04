var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var open = require('gulp-open');
var wait = require('gulp-wait');
var autoprefixer = require('gulp-autoprefixer');


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
    gulp.src('./sass/*.scss')
    	.pipe(wait(250))
    	.pipe(plumber({
    		errorHandler: function (error) {
    			var msg = JSON.stringify(error.message);
    			console.error('\033[31m', msg,'\x1b[0m'); 
    		}
    	}))
        .pipe(sass({includePaths: ['./sass', './sass/**']}).on('error', sass.logError))
        .pipe(autoprefixer({
			browsers: ['>1%', 'last 2 versions'],
			cascade: false
		}))
        .pipe(gulp.dest('./public/css/'))
        .pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch(['./sass/**/*.scss', './public/**/*.*', '!./public/css/*.*'], ['sass']);
});

gulp.task('default', ['connect', 'watch']);