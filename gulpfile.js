var gulp = require('gulp');
var markdown = require('gulp-markdown');
var directoryMap = require('gulp-directory-map');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var stylus = require('gulp-stylus');
var deploy = require('gulp-gh-pages');


gulp.task('static', function () {
    gulp.src('src/static/**/*')
        .pipe(gulp.dest('out'))
        .pipe(reload({stream: true}));
});

gulp.task('static-watch', ['static'], function () {
    gulp.watch('src/static/**/*', ['static']);
});

gulp.task('markdown-watch', ['markdown'], function () {
    gulp.watch('src/md/**/*.md', ['markdown']);
});


gulp.task('markdown', function () {
    return gulp.src('src/md/**/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('out/content'))
        .pipe(reload({stream: true}));
});

gulp.task('sitemap', function () {
    return gulp.src('src/md/**/*.md')
        .pipe(directoryMap({
            filename: 'urls.json'
        }))
        .pipe(gulp.dest('out'));
});


gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: "out"
        }
    });
});


gulp.task('stylus', function () {
    gulp.src('src/stylus/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('out/css'))
        .pipe(reload({stream: true}));
});

gulp.task('stylus-watch', ['stylus'], function () {
    gulp.watch('src/stylus/**/*.styl', ['stylus']);
});

gulp.task('deploy', function () {
    gulp.src('out/**/*').pipe(deploy({
        remoteUrl: 'https://github.com/kirjs/code-howtos.git'
    }));
});
gulp.task('default', ['static-watch', 'markdown-watch', 'stylus-watch', 'sitemap', 'serve']);
