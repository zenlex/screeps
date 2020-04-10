var gulp = require('gulp');

//Define your paths to deploy
const SCREEPSPATH1 = "c:\\users\\erichKeil\\appData\\local\\screeps\\scripts\\screeps.com\\default";
const SCREEPSPATH2 = "c:\\users\\erichKeil\\appData\\local\\screeps\\scripts\\screeps.com\\default";

//Copies all js Files from scripts to SCREEPSPATH1
gulp.task('deploy_1', async function () {
    gulp.src('scripts/*.js')
        .pipe(gulp.dest(SCREEPSPATH1));
});

//Copies all js Files from scripts to SCREEPSPATH2
gulp.task('deploy_2', async function () {
    gulp.src('scripts/*.js')
        .pipe(gulp.dest(SCREEPSPATH2));
});