/**
 * Gulp Packages
 */

// General
var package = require('./package.json');

var fs = require('fs');
var elixir = require('laravel-elixir');
var header = require('gulp-header');
var elixirConfig = require('laravel-elixir-config');

// Scripts and tests
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

// SVGs
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');

// Docs
var markdown = require('gulp-markdown');

var config = elixir.config;

/**
 * Template for banner to add to file headers
 */

var banner = {
    full: '/*!\n' +
    ' * <%= package.name %> v<%= package.version %>: <%= package.description %>\n' +
    ' * (c) ' + new Date().getFullYear() + ' <%= package.author.name %>\n' +
    ' * Apache 2.0\n' +
    ' * <%= package.repository.url %>\n' +
    ' */\n\n',
    min: '/*!' +
    ' <%= package.name %> v<%= package.version %>' +
    ' | (c) ' + new Date().getFullYear() + ' <%= package.author.name %>' +
    ' | Apache 2.0' +
    ' | <%= package.repository.url %>' +
    ' */\n'
};

/*
 |--------------------------------------------------------------------------
 | Elixir Tasks
 |--------------------------------------------------------------------------
 |
 | Elixir additional tasks.
 |
 */

elixir.extend('header', function (banner, src, output, baseDir, options) {

    /**
     * Prep the Gulp src and output paths.
     *
     * @param  {string|Array} src
     * @param  {string|null}  baseDir
     * @param  {string|null}  output
     * @return {GulpPaths}
     */
    function getPaths(src, baseDir, output) {
        return new Elixir.GulpPaths()
            .src(src, baseDir || Elixir.config.get('assets.css.less.folder'))
            .output(output || Elixir.config.get('public.css.outputFolder'), 'app.css');
    };

    new elixir.Task('header', function () {
        this.recordStep('Header on Files');
        return gulp.src(this.src.path)
            .pipe(header(banner, options))
            .on('error', this.onError())
            .pipe(this.saveAs(gulp))
            .pipe(this.onSuccess('Header Banner Added!'))
    }, getPaths(src, baseDir, output));
});

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application as well as publishing vendor resources.
 |
 */

elixir(function (mix) {

    /*
     * Bower Assets & Theme
     */
    mix.less([
        'bootstrap.less',
        'theme.less',
    ], config.publicPath + '/css/style.css')
        .header(
            (config.production) ? banner.min : banner.full,
            config.publicPath + '/css/style.css',
            config.publicPath + '/css/style.css',
            config.publicPath,
            {package: package}
        );

    // Bootstrap Font
    mix.copy(config.bowerPath + '/bootstrap/dist/fonts/', config.publicPath + '/fonts/');

    // FontAwesome Fonts
    mix.copy(config.bowerPath + '/components-font-awesome/fonts/', config.publicPath + '/fonts/');


    // JS
    mix.scripts([
        config.bowerPath + '/jquery/dist/jquery.js',
        config.bowerPath + '/bootstrap/dist/js/bootstrap.js',
        config.bowerPath + '/nouislider/distribute/nouislider.js',
        config.bowerPath + '/isotope/dist/isotope.pkgd.js',
        config.bowerPath + '/jquery-form-validator/form-validator/jquery.form-validator.js',
        config.bowerPath + '/jquery-form-validator/form-validator/lang/it.js',
        config.bowerPath + '/jquery.easy-pie-chart/dist/jquery.easypiechart.js',
        config.bowerPath + '/select2/dist/js/select2.full.js',
        config.bowerPath + '/wow/dist/wow.js',
        config.bowerPath + '/waypoints/lib/jquery.waypoints.js',
        config.bowerPath + '/flexslider/jquery.flexslider.js',
        config.assetsPath + '/js/app.js',
    ], config.publicPath + '/js/app.js', '.')
        .header(
            (config.production) ? banner.min : banner.full,
            config.publicPath + '/js/app.js',
            config.publicPath + '/js/app.js',
            config.publicPath,
            {package: package}
        );

    //

    // /*
    //  * Theme
    //  */
    // // Less
    // mix.less('app.less', config.publicPath + '/style.css')
    //     .header(fs.readFileSync('HEADER', 'utf8'), config.publicPath + '/style.css', config.publicPath + '/style.css', config.publicPath);
    // mix.less('rtl.less', config.publicPath + '/rtl.css')
    //     .header(fs.readFileSync('HEADER', 'utf8'), config.publicPath + '/rtl.css', config.publicPath + '/rtl.css', config.publicPath);
    //
    // // JS
    // mix.scripts('widget.js');
    // mix.scripts('scripts.js');

    // Imgs & SVGs & Static
    mix.copy('src/img/', config.publicPath + '/img');
    mix.copy('src/svg/', config.publicPath + '/svg');
    mix.copy('src/static/', config.publicPath);
});


/*
 // Lint, minify, and concatenate scripts
 gulp.task('build:scripts', ['clean:dist'], function() {
 var jsTasks = lazypipe()
 .pipe(header, banner.full, { package : package })
 .pipe(gulp.dest, paths.scripts.output)
 .pipe(rename, { suffix: '.min' })
 .pipe(uglify)
 .pipe(header, banner.min, { package : package })
 .pipe(gulp.dest, paths.scripts.output)
 .pipe(livereload);

 return gulp.src(paths.scripts.input)
 .pipe(plumber())
 .pipe(tap(function (file, t) {
 if ( file.isDirectory() ) {
 var name = file.relative + '.js';
 return gulp.src(file.path + '/*.js')
 .pipe(concat(name))
 .pipe(jsTasks());
 }
 }))
 .pipe(jsTasks());
 });

 // Process, lint, and minify Sass files
 gulp.task('build:styles', ['clean:dist'], function() {
 return gulp.src(paths.styles.input)
 .pipe(header(banner.full, { package : package }))
 .pipe(gulp.dest(paths.styles.output))
 .pipe(rename({ suffix: '.min' }))
 .pipe(minify({
 discardComments: {
 removeAll: true
 }
 }))
 .pipe(header(banner.min, { package : package }))
 .pipe(gulp.dest(paths.styles.output))
 .pipe(livereload());
 });*/



/*
 // Lint scripts
 gulp.task('lint:scripts', function () {
 return gulp.src(paths.scripts.lint)
 .pipe(jshint())
 .pipe(jshint.reporter('jshint-stylish'));
 });
 */

/*
 // Generate SVG sprites
 gulp.task('build:svgs', ['clean:dist'], function () {
 return gulp.src(paths.svgs.input)
 .pipe(plumber())
 .pipe(tap(function (file, t) {
 if ( file.isDirectory() ) {
 var name = file.relative + '.svg';
 return gulp.src(file.path + '/*.svg')
 .pipe(svgmin())
 .pipe(svgstore({
 fileName: name,
 prefix: 'icon-',
 inlineSvg: true
 }))
 .pipe(gulp.dest(paths.svgs.output));
 }
 }))
 .pipe(svgmin())
 .pipe(gulp.dest(paths.svgs.output));
 });
 */
