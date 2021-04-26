import {Controller} from 'stimulus'

export default class extends Controller {
    static targets = ['addList', 'listInput'];
    static values = {
        url: String
    };

    async onEnterAddList(event) {
        if (event.key === "Enter") {
            event.preventDefault();

            if (event.target.value) {
                event.target.disabled = true;
                await this.sendTableAddRequest(event.target.value, this.addListTarget);
                this.listInputTarget.value = '';
                event.target.disabled = false;
            }
        }
    }

    async sendTableAddRequest(tableTitle, addListTarget) {
        await $.ajax({
            method: "POST",
            url: this.urlValue,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                title: tableTitle,
                preview: 1
            }),
            success: function (response) {
                addListTarget.insertAdjacentHTML('beforebegin', response['body']);
            }
        });
    }
}
