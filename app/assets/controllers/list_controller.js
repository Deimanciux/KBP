import { Controller } from 'stimulus'

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

        if(event.target.value === this.listTitleValue) {
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

    dragOver(event) {
        console.log('dragover');
        // event.preventDefault();
        // //cia turetu but priseta tik su koretele TO DO div
        // getDragBox(event);
        //
        // if (dragBox) {
        //     dragBox.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        //     dragBox.style.transition = '0.1s';
        //     dragBox.parentElement.lastChild.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        //     dragBox.parentElement.lastChild.style.transition = '0.1s';
        // }
    }

    dragEnter(event) {
        console.log('dragenter');
        // event.preventDefault();
        //
        // // TO DO
        // if (dragBox) {
        //     dragBox.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        //     dragBox.style.transition = '0.1s';
        //     dragBox.parentElement.lastChild.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        //     dragBox.parentElement.lastChild.style.transition = '0.1s';
        // }
    }

    dragLeave(event) {
        console.log('dragleave');
        // event.preventDefault();
        // if (dragBox) {
        //     dragBox.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        //     dragBox.parentElement.lastChild.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        // }

    }

    dragDrop(event) {
        console.log('dragdrop');
        //     event.preventDefault();
        //     if (event.target.tagName === 'DIV' && event.target.className === 'list-item') {
        //         dragBox = event.target.parentElement;
        //     }
        //
        //     if (dragBox) {
        //         dragBox.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        //         dragBox.parentElement.lastChild.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        //         dragBox.append(draggedItem);
        //     }
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
