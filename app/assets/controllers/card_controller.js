import {Controller} from 'stimulus';

const CARD_TEXT_MAX_LENGTH = 300;

export default class extends Controller {
    static targets = ['edit', 'delete', 'check', 'listItem', 'listItemText'];
    static values = {
        cardText: String,
        url: String
    };

    cardOnClickToEdit() {
        this.editTarget.style.visibility = 'hidden';
        this.deleteTarget.style.visibility = 'hidden';
        this.checkTarget.style.display = 'block';
        this.listItemTarget.draggable = false;
        this.listItemTextTarget.contentEditable = true;
        this.listItemTextTarget.focus();
    }

    cardCheckPressed() {
        this.checkTarget.style.display = "none";
        this.editTarget.style.visibility = 'visible';
        this.deleteTarget.style.visibility = 'visible';
        this.listItemTarget.draggable = true;
        this.listItemTextTarget.contentEditable = false;
    }

    async cardLeftWithoutSubmission() {
        this.checkTarget.style.display = 'none';
        this.editTarget.style.visibility = 'visible';
        this.deleteTarget.style.visibility = 'visible';

        this.listItemTextTarget.contentEditable = false;
        this.listItemTarget.draggable = true;

        if (!this.listItemTextTarget.innerHTML || this.listItemTextTarget.innerHTML.length > CARD_TEXT_MAX_LENGTH) {
            this.listItemTextTarget.innerHTML.innerHTML = this.cardTextValue;
            return;
        }

        if (this.listItemTextTarget.innerHTML === this.cardTextValue) {
            return;
        }

        await this.sendCardEditRequest(this.listItemTextTarget.innerHTML);
        this.cardTextValue = this.listItemTextTarget.innerHTML;
    }

    async cardOnClickToDelete() {
        this.deleteTarget.style.display = "none";
        this.editTarget.style.display = "none";
        this.listItemTarget.remove();
        await this.sendCardDeleteRequest();
    }

    async sendCardEditRequest(text) {
        await $.ajax({
            method: "PATCH",
            url: this.urlValue,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({text: text}),
            success: function (response) {

            },
            error: function (response) {

            }
        });
    }

    async sendCardDeleteRequest() {
        await $.ajax({
            method: "DELETE",
            url: this.urlValue,
            contentType: "application/json; charset=utf-8",
            success: function (response) {

            },
            error: function (response) {

            }
        });
    }

    cardOnMouseOver() {
        this.deleteTarget.style.display = 'block';
        this.editTarget.style.display = 'block';
    }

    cardOnMouseOut() {
        this.deleteTarget.style.display = 'none';
        this.editTarget.style.display = 'none';
    }

    dragStart(event) {
        console.log('dragStart');
    }

    dragEnd() {
        console.log('dragEnd');
    }
}
