/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

const $ = require('jquery');
require('bootstrap');
import './stimulusBootstrap';
import './js/app.js';

$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
});