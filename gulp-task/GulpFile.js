const {src,dest,series,parallel,watch}=require("gulp");
const htmlmin=require("gulp-htmlmin");
var concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');

let glops={
    html:"project/*.html",
    css:"project/css/**/*.css",
    js:"project/js/**/*.js",
    img:"project/pics/*"

}
function htmlTask(){
return src(glops.html).pipe(htmlmin({collapseWhitespace:true,removeComments:true})).pipe(dest("dist"));
}

function cssTask(){
    return src(glops.css).pipe(concat("style.min.css")).pipe(cleanCSS()).pipe(dest("dist/assets"));
}

function jsTask(){
    return src(glops.js).pipe(concat("script.min.js")).pipe(terser()).pipe(dest("dist/assets"));
}

function imgTask(){
    return src(glops.img).pipe(imagemin()).pipe(dest("dist/assets/image"));
}

function watchTask(){
    watch(glops.html,htmlTask);
    watch(glops.css,cssTask);
    watch(glops.js,jsTask);
    watch(glops.img,imgTask);
}

function extractTask(cb){
    console.log("eman");
    cb();
}

exports.default=series(parallel(htmlTask,cssTask,jsTask,imgTask),extractTask, watchTask) ;
