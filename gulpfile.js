//le fichier gulpfile.js

var gulp = require("gulp");
var connect = require("gulp-connect");
var sass = require("gulp-sass");

var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var minifyCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');

var imagemin = require('gulp-imagemin');

var del = require("del");

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var maps = require("gulp-sourcemaps");

//des taches en dev
//des taches pour la production

//compresser les images

gulp.task("hello", function(){
    console.log("Hello Kedis");
    
    return gulp.src("*.css")
    .pipe(connect.reload());
    
    //travailler avec sass
    //ajouter les prefix
    //concatener
    //minifier
    
});

//save .css refresh le browser
//*.*css +-= *.scss

gulp.task("compileSass", function(){
   return gulp.src("./assets/scss/style.scss") 
   .pipe(maps.init())
   .pipe(sass().on("error", sass.logError))
   .pipe(postcss([autoprefixer()]))
   .pipe(maps.write('./'))
   .pipe(gulp.dest('./'))
   .pipe(connect.reload());
});

gulp.task("watch", function(){
   gulp.watch("./assets/scss/*.scss", ["compileSass"]); 
    
    //watch html
    //watch js
    gulp.watch("*.html", ["html"]);
    gulp.watch("*.js", ["js"]);
    
});

//une task pour html
//une task pour js

gulp.task("html", function(){
    return gulp.src("*.html")
    .pipe(connect.reload());
});

gulp.task("js", function(){
    return gulp.src("*.js")
    .pipe(connect.reload());
});


gulp.task("connect", function(){
    connect.server({
        root: [__dirname],
        livereload:true,
        port: 3000
    });
});

gulp.task("default", ["connect", "watch"]);

gulp.task("build", ["compileSass", "img"], function(){
    return gulp.src(["*.html"])
    
    .pipe(useref())
    .pipe(gulpif("*.js", uglify()))
    .pipe(gulpif("*.css", minifyCss()))
    //copier, minifier le style.css
    //copier, minifier le js
    
    .pipe(gulp.dest('_build'));
});

gulp.task("img", ["clean"], function(){
    gulp.src("./assets/img/*")
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({plugins: [{removeViewBox: true}]})  
    ], {
        verbose: true
    }))
    .pipe(gulp.dest("./_build/assets/img/"))
});


gulp.task("clean", function(){
    return del(["_build", "style.css"])
})










