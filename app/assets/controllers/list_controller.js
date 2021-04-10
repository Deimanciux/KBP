import {Controller} from 'stimulus'

const LIST_TITLE_MAX_LENGTH = 100;

export default class extends Controller {
    static targets = ['heading'];
    static values = {
        listTitle: String,
        editUrl: String
    };

    connect() {
        this.adjustTextAreaHeight();
    }

    onEnterEdit(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            event.target.blur();
        }
    }

    async listOnBlurEdit(event) {
        if (!event.target.value || (event.target.value.length > LIST_TITLE_MAX_LENGTH)) {
            event.target.value = this.listTitleValue;
            return;
        }

        if (event.target.value === this.listTitleValue) {
            return;
        }

        await this.sendTableEditRequest(event.target.value);
        this.listTitleValue = event.target.value;
    }

    async sendTableEditRequest(title) {
        await $.ajax({
            method: "PATCH",
            url: this.editUrlValue,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({title: title}),
            success: function (response) {

            },
            error: function (response) {

            }
        });
    }

    adjustTextAreaHeight() {
        $('.list-heading').autoHeight();

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
