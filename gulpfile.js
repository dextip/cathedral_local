var gulp          = require('gulp');
var $             = require('gulp-load-plugins')();
var browserSync   = require('browser-sync');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

var themeName     = 'test'; // テーマフォルダ名に変更する
var wpProxy     = 'cathedral.local'; // wpのホストIPに変更
var themeDir      = './wordpress/wp-content/themes/' + themeName;

var paths = {
  "htmlSrc" : './*.html',
  "scssSrc" : themeDir + '/src/scss/**/*.scss',
  "jsSrc"   : themeDir + '/src/js/*.js',
  "jsLib"   : themeDir + '/src/js/lib/*.js',
  "imgSrc"  : themeDir + '/src/images/**',
  "rootDir" : themeDir + '/dist/',
  "imgDir"  : themeDir + '/dist/images/',
  "jsDir"  : themeDir + '/dist/js/'
}

gulp.task('bs', function() {
  browserSync.init({
    proxy: wpProxy
  });
});


// gulp.task('bs', function() {
//   browserSync.init({
//     server: {
//       baseDir: "./"
//     },
//     notify  : true,
//     xip     : false
//   });
// });

gulp.task('scss', function() {
  return gulp.src(paths.scssSrc)
    .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe($.sourcemaps.init())
    .pipe($.sass()).on('error', $.sass.logError)
    .pipe($.autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'ie >= 9', 'Android >= 4', 'ios_saf >= 8']
    }))
    // .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.rootDir + 'css')) // .cssの書き出し[dist/css]
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe($.csso())
    .pipe($.sourcemaps.write('.')) //　min.mapの書き出し[dist/css]
    .pipe(gulp.dest(paths.rootDir + 'css')) // min.cssの書き出し[dist/css]
    .pipe(browserSync.reload({
      stream: true,
      once  : true
    }))
    //.pipe(notify('Sassをコンパイルしました！'));
    .pipe(notify({
      title: '成功!!!　Sass',
      message: 'Sassのコンパイルしました',
    }));
});

gulp.task('bs-reload', function() {
   browserSync.reload();
});

gulp.task('image', function() {
  return gulp.src(paths.imgSrc)
    .pipe($.changed(paths.imgDir))
    .pipe($.imagemin({
      optimizationLevel: 3
    }))
    .pipe(gulp.dest(paths.imgDir));
});

gulp.task('js', function() {
  return gulp.src([paths.jsLib, paths.jsSrc])
    .pipe($.uglify({preserveComments: 'license'}))
    .pipe($.concat('main.min.js', {newLine: '\n'})
    )
    .pipe(gulp.dest(paths.jsDir));
});

gulp.task('default', ['image', 'js', 'bs', 'scss', 'bs-reload'], function() {
  $.watch([paths.htmlSrc],function(e) {
    gulp.start("bs-reload")
  });
  $.watch([paths.scssSrc],function(e) {
    gulp.start("scss")
  });
  $.watch([paths.imgSrc],function(e) {
    gulp.start("image")
  });
  $.watch([paths.jsSrc],function(e) {
    gulp.start("js")
  });
});
