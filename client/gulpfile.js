import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
const sass = gulpSass(dartSass)

import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

var config = {
    sassPath: './src/sass',
    jsPath: './src',
    jsDist: './public/javascript/',
    cssDist: './public/css/'
};

gulp.task('imagemin', () => {
    return gulp.src('./src/images/*.png')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('public/images/'));
});

gulp.task('connect', () => {
    browserSync({
        port: 3456,
        proxy: 'localhost:3456'
    });
});

//import style sheet partials into app.scss.
gulp.task('mainStyles', () => {
    return gulp.src(config.sassPath + '/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "compressed" }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.cssDist))
        .pipe(browserSync.stream());
});

//watch sass files for changes
gulp.task('watch:sass', gulp.parallel('connect', () => {
    gulp.watch(config.sassPath + '/*.scss', gulp.series('mainStyles'));
}));

gulp.task('react', () => {
    browserify(config.jsPath + '/main.js')
        .transform('babelify', { presets: ["es2015", "react"] })
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('myapp.js'))
        .pipe(buffer())
        .pipe(gulp.dest(config.jsDist));
});

gulp.task('watch:react', () => {
    gulp.watch(config.jsPath + "/**/*", ['react']);
});

gulp.task('default', gulp.series('connect', 'watch:react', 'watch:sass'));