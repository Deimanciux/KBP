import {Controller} from 'stimulus';

export default class extends Controller {
    static targets = ['background', 'select', 'check'];
    static values = {
        backgroundId: String
    };

    connect() {
        this.selectTarget.classList.add('d-none');
    }

    selectBackground(event) {
        this.backgroundIdValue = event.currentTarget.dataset.backgroundId;
    }

    backgroundIdValueChanged() {
        this.selectTarget.selectedIndex = this.backgroundIdValue;

        this.backgroundTargets.forEach(element => {
            if (element.dataset.backgroundId === this.backgroundIdValue) {
                element.classList.add('selected');
                element.children[0].classList.remove('d-none');
                console.log(element.children[0]);
            } else {
                element.classList.remove('selected');
                element.children[0].classList.add('d-none');
            }
        })
    }
}
