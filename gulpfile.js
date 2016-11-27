// Include gulp
var gulp = require( 'gulp' );
// Include Our Plugins
var jshint = require( 'gulp-jshint' );
var sass = require( 'gulp-sass' );
var concat = require( 'gulp-concat' );
var uglify = require( 'gulp-uglify' );
var rename = require( 'gulp-rename' );
var htmlmin = require( 'gulp-htmlmin' );
var inject = require( 'gulp-inject' );
var gulpif = require( 'gulp-if' );
var argv = require( 'yargs' ).argv;
// Lint Task
gulp.task( 'lint', function() {
	
    return gulp.src( 'js/src/*.js' )
        .pipe( jshint() )
        .pipe( jshint.reporter( 'default' ) );
} );
// Compile Our Sass
gulp.task( 'css', function() {
	
    return gulp.src( 'scss/*.scss' )
		.pipe( gulpif( argv.prod, sass( { outputStyle: 'compressed' } ), sass() ) )
		.pipe( gulpif( argv.prod, concat( 'tiny-slider.min.css' ), concat( 'tiny-slider.css' ) ) )
        .pipe( gulp.dest( 'css' ) );
} );
// Concatenate & uglify JS
gulp.task( 'scripts', [ 'lint' ], function() {
	
    return gulp.src( 'js/src/*.js' )
		.pipe( concat( 'tiny-slider.js' ) )
		.pipe( gulpif( argv.prod, rename( 'tiny-slider.min.js' ) ) )
		.pipe( gulpif( argv.prod, uglify() ) )
		.pipe( gulp.dest( 'js' ) )
} );
// Dependent Inject Task
gulp.task( 'inject', [ 'scripts', 'css' ], function() {
	
    return gulp.src( 'html/index.html' )
		.pipe(
			gulpif(
				argv.prod,
				inject(
					gulp.src( [ 'js/*.min.js', 'css/*.min.css' ], { read: false } ),
					{ addRootSlash: false, removeTags: true }
				),
				inject(
					gulp.src( [ 'js/*.js', '!js/*.min.js', 'css/*.css', '!css/*.min.css' ], { read: false } ),
					{ addRootSlash: false, removeTags: true }
				)
			)
		)
        .pipe( gulp.dest( './' ) );
} );
// Minify the HTML Task
gulp.task( 'minify', [ 'inject' ], function() {
	
	return gulp.src( './index.html' )
		.pipe( gulpif( argv.prod, htmlmin( { collapseWhitespace: true, removeComments: true } ), htmlmin() ) )
		.pipe( gulp.dest( './' ) );
} );
// Watch Files For Changes
gulp.task( 'watch', function() {
	
	gulp.watch( [ 'html/index.html', 'scss/*.scss', 'js/src/*.js' ], [ 'minify' ] );
} );
// Develop Task
gulp.task( 'default', [ 'minify', 'watch' ] );
