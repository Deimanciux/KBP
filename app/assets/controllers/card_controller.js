import { Controller } from 'stimulus'

export default class extends Controller {
    static targets = ['edit', 'delete', 'check', 'listItem', 'listItemText'];
    static values = {
        cardText: String,
        editUrl: String
    };

    connect() {
    }

    cardOnClickToEdit(event) {
        this.editTarget.style.visibility = 'hidden';
        this.deleteTarget.style.visibility = 'hidden';
        this.checkTarget.style.display = 'block';

        this.listItemTarget.draggable = false;
        this.listItemTextTarget.contentEditable = true;
        this.listItemTextTarget.focus();

        this.checkTarget.addEventListener('click', this.checkPressed);
        this.listItemTextTarget.addEventListener(
            'blur', this.editFieldLeftWithoutSubmission(
                this.checkTarget,
                this.editTarget,
                this.deleteTarget,
                this.listItemTarget,
                this.listItemText
            )
        );
    }

    async cardOnClickToDelete() {
        console.log('delete pressed');
        // let cardsArrayIndex = this.parentElement.dataset.card_index;
        // this.parentElement.children[1].style.display = "none";
        // this.parentElement.children[3].style.display = "none";
        // this.parentElement.remove();
        // await sendCardDeleteRequest(cardsArray[cardsArrayIndex].id);
        // delete cardsArray[cardsArrayIndex];
    }

     checkPressed() {
        this.editTarget.style.display = "none";
        this.editTarget.style.visibility = 'visible';
        this.deleteTarget.style.visibility = 'visible';
        this.listItemTarget.draggable = true;
        this.listItemTextTarget.contentEditable = false;
    }

    async editFieldLeftWithoutSubmission(checkTarget, editTarget, deleteTarget, listItemTarget, listItemTextTarget) {
        console.log('checkTarget', checkTarget);
        console.log('editTarget', editTarget);
        console.log('deleteTarget', deleteTarget);

        checkTarget.style.display = 'none';
        editTarget.style.visibility = 'visible';
        deleteTarget.style.visibility = 'visible';

        listItemTextTarget.contentEditable = false;
        listItemTarget.draggable = true;

        if(!listItemTextTarget.innerHTML) {
            listItemTextTarget.innerHTML = this.cardTextValue;
            console.log('pirmas if');
            return;
        }

        if(this.listItemTextTarget.innerHTML === this.cardTextValue) {
            console.log('antras if');
            return;
        }

        // await sendCardEditRequest(cardsArray[cardsArrayIndex].id, cardsArray[cardsArrayIndex].text);
        this.cardTextValue = this.listItemTextTarget.innerHTML;
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
