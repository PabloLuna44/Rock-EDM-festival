
const {src,dest, watch, parallel} = require("gulp"); //Src sirve para indendtificar un archivo y dest para almacenarlo

//Dependecias CSS
const sass= require("gulp-sass")(require('sass'));
const plumber =require('gulp-plumber');
const autoprefixer=require('autoprefixer');//Se encarga de la compatibildad con navegadores
const cssnano=require('cssnano');//comprime el codigo css
const postcss=require('gulp-postcss');//Hace transformacion por medio de los otros dos
const sourcemaps=require('gulp-sourcemaps');



//Dependecias Para Imagenes
const cache= require('gulp-cache');
const imagein=require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif')


//Javascript 
const terser=require('gulp-terser-js');


function css (done){
    

    src('src/scss/**/*.scss')// Identificar el archivo de SASS
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())//Compilarlo
    .pipe(postcss([autoprefixer(),cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css"));//El pipe es utilizado para ejcutar la funcion y se pueden agregar multiples pipe
    //Almacenarla en el disco duro

    done(); // es un callback que avisa a gulp cuando llegmas al final 
}

function images(done){

    const opcions={
        optimizationLevel:3
    }

    src('src/img/**/*.{png,jpg}')
    .pipe(cache( imagein(opcions) ))
    .pipe( dest('build/img'))

    done();
}

function versionsAvif(done){
    
    const opcions={
        quality:50
    }
    
    
        src('src/img/**/*.{png,jpg}')
        .pipe(avif(opcions))
        .pipe(dest('build/img'))
    
        done();
    }


function versionsWebp(done){
    
    const opcions={
        quality:50
    }
    
    
        src('src/img/**/*.{png,jpg}')
        .pipe(webp(opcions))
        .pipe(dest('build/img'))
    
        done();
    }

function javascript(done){

    src('src/JS/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/JS'));
    

    done();
}
    

function dev(done){

    watch('src/scss/**/*.scss', css);
    watch('src/JS/**/*.js', javascript)
    
    done();
}

exports.css=css;
exports.js=javascript;
exports.images=images;
exports.versionsAvif=versionsAvif;
exports.versionsWebp=versionsWebp;
exports.dev=parallel(images,versionsWebp,versionsAvif,javascript,dev);