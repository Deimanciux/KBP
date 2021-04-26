import {Controller} from 'stimulus'

export default class extends Controller {
    static targets = ['list', 'inputContainer', 'card'];
    static values = {
        listId: Number
    };

    dragStart(event) {
        event.dataTransfer.setData("text/plain", event.currentTarget.getAttribute('id'));
        let dragItem = document.getElementById(event.dataTransfer.getData("text"));

        setTimeout(function (dragItem) {
            dragItem.style.display = 'none';
        }, 0, dragItem);
    };

    async dragEnd(event) {
        let dragItem = event.currentTarget;
        setTimeout(function (dragItem) {
            dragItem.style.display = 'block';
        }, 0, dragItem);

        await this.sendCardPositionEditRequest(event.currentTarget.getAttribute('id').substr(4));
    }

    dragEnter(event) {
        event.preventDefault();

        this.listTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        this.listTarget.style.transition = '0.1s';
        this.inputContainerTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        this.inputContainerTarget.style.transition = '0.1s';
    }

    dragOver(event) {
        event.preventDefault();
    };

    dragLeave(event) {
        event.preventDefault();

        this.listTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        this.inputContainerTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    }

    dragDrop(event) {
        event.preventDefault();
        let element = document.getElementById(event.dataTransfer.getData("text"));

        this.listTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        this.inputContainerTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        this.listTarget.append(element.parentElement);
    }

    async sendCardPositionEditRequest(cardId) {
        await $.ajax({
            method: "PATCH",
            url: '/card/' + cardId + '/table/' + this.listIdValue,
            dataType: 'json',
        });
    }
}
