import {Controller} from 'stimulus';

export default class extends Controller {
    adjustTextAreaHeight() {
        jQuery.fn.extend({
            autoHeight: function () {
                function autoHeight_(element) {
                    return jQuery(element).css({
                        'height': 'auto',
                        'overflow-y': 'hidden'
                    }).height(element.scrollHeight);
                }

                return this.each(function () {
                    autoHeight_(this).on('input', function () {
                        autoHeight_(this);
                    });
                });
            }
        });

        $('.list-heading').autoHeight();
    }
}