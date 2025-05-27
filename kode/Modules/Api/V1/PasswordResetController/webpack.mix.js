const mix = require('laravel-mix');
require('laravel-mix-merge-manifest');

mix.setPublicPath('../../public').mergeManifest();

mix.js(__dirname + '/Resources/assets/js/app.js', 'js/api/-v1/-password-reset-controller.js')
    .sass( __dirname + '/Resources/assets/sass/app.scss', 'css/api/-v1/-password-reset-controller.css');

if (mix.inProduction()) {
    mix.version();
}