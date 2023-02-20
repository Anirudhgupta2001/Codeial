// const gulp = require('gulp');
async function buildCSS() {
    const [gulp, rev] = await Promise.all([
      import('gulp'),
      import('gulp-rev')
    ]);

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
// const rev= require('gulp-rev');

gulp.task('css',function(){
    console.log('minifiying css...');
    gulp.src('./assets/sasss/**/*.scsss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'))

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))    
    .pipe(gulp.dest('./public/assets'));
})