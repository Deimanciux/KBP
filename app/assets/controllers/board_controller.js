import {Controller} from 'stimulus'

const BOARD_TITLE_MAX_LENGTH = 35;

export default class extends Controller {
    static targets = ['boardTitle'];
    static values = {
        boardTitle: String,
        editUrl: String
    };

    onEnterEdit(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            event.target.blur();
        }
    }

    async boardOnBLurEdit(event) {
        if (!event.target.value || (event.target.value.length > BOARD_TITLE_MAX_LENGTH)) {
            event.target.value = this.boardTitleValue;
            return;
        }

        if (event.target.value === this.boardTitleValue) {
            return;
        }

        await this.sendBoardEditRequest(event.target.value);
        this.boardTitleValue = event.target.value;
    }

    async sendBoardEditRequest(boardTitle) {
        $.ajax({
            method: "PATCH",
            url: this.editUrlValue,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({title: boardTitle}),
        });
    }
}
