const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('src/js/calendar.js', 'public/js');
mix.js('src/js/results.js', 'public/js');

mix.sass('src/css/home.scss', 'public/css').options({
    processCssUrls: false
});

mix.sass('src/css/calendar.scss', 'public/css').options({
    processCssUrls: false
});

mix.sass('src/css/results.scss', 'public/css').options({
    processCssUrls: false
});

mix.sass('src/css/rules-forms.scss', 'public/css').options({
    processCssUrls: false
});

mix.copy('src/*.html', 'public');
mix.copyDirectory('src/documents', 'public/documents');
mix.copyDirectory('src/images', 'public/images');