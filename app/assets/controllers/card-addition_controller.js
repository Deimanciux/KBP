import {Controller} from 'stimulus';

const CARD_TEXT_MAX_LENGTH = 300;

export default class extends Controller {
    static targets = ['addCard'];
    static values = {
        url: String
    };

    connect() {
        this.adjustTextAreaHeight();
    }

    async onEnterAddCard(event) {
        if (event.key === "Enter") {
            event.preventDefault();

            if (!event.target.value || event.target.value > CARD_TEXT_MAX_LENGTH) {
                return;
            }

            event.target.disabled = true;
            await this.sendCardAddRequest(event.target.value, this.addCardTarget);
            event.target.disabled = false;
            event.target.value = '';
        }
    }

    async sendCardAddRequest(text, addCardTarget) {
        await $.ajax({
            method: "POST",
            url: this.urlValue,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                text: text,
                preview: 1
            }),
            success: function (response) {
                addCardTarget.parentElement.children[0].insertAdjacentHTML('beforeend', response['body']);
            },
            error: function (response) {

            }
        });
    }

    adjustTextAreaHeight() {
        $('.input_item').autoHeight();

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
    }
}
