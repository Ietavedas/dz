import Slider from './classes/slider'

window.App = {
    debug: false,
    // debug: true,
    lang: 'ru'
};


// debug detect

if (window.location.href.indexOf('.ru') !== -1 || window.location.href.indexOf('/en') !== -1) {
    App.debug = false;
}

if (window.SITE_LANG) {
    App.lang = window.SITE_LANG;
}

if (App.debug) {
    console.log('Debug: ' + App.debug);
}

document.addEventListener('DOMContentLoaded', () => {
    new Slider();
});
