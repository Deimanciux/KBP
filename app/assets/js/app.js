const listsContainerHtml = document.getElementById('lists'); //container for all lists in page
const BOARD_TITLE_MAX_LENGTH = 35;
const LIST_TITLE_MAX_LENGTH = 100;
const CARD_TEXT_MAX_LENGTH = 400;
let listsPlaceholdersHtml = document.querySelectorAll('.list_placeholders'); //placeholders of specific lists
let listsHtml = document.querySelectorAll('.list'); //sarasai html pavidalu
let cardsHtml = document.querySelectorAll('.list-item'); //korteliu html
let draggedItem = null; //tempiamas elementas
let dragBox = null; //vieta i kuria tempiamas elementas
let cardsArray = [];
let currentBoard = [];
let boards = [];
let boardTitle = document.getElementById('board-title');
let listsArray = [];

// used temporary
let boardId = document.getElementById('lists').dataset.board_id;


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


async function getBoardByIdFromDatabase() {
    await jQuery.ajax({
        method: "GET",
        url: "/board/get/" + boardId,
        dataType: 'json',

        success: function (response) {
            currentBoard.push(response);
        },
        error: function (response) {

        }
    });
}

function getAllBoardsFromDatabase() {
    $.ajax({
        method: "GET",
        url: "/board/",
        dataType: 'json',

        success: function (response) {
            let data = response.data;

            for (item of data) {
                boards.push(item);
            }
        },
        error: function (response) {

        }
    });
}

async function getAllTablesByBoard() {
    await $.ajax({
        method: "GET",
        url: "/table/1",
        dataType: 'json',

        success: function (response) {
            for (let table of response) {
                listsArray.push(table);
            }
        },
        error: function (response) {

        }
    });
}

function sendBoardEditRequest() {
    $.ajax({
        method: "PATCH",
        url: "/board/1",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({title: currentBoard[0].title}),
        success: function (response) {

        },
        error: function (response) {

        }
    });
}

async function sendTableAddRequest(tableTitle) {
    await $.ajax({
        method: "POST",
        url: "/table/1",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({title: tableTitle}),
        success: function (response) {
            listsArray.push(response);
        },
        error: function (response) {

        }
    });
}

async function sendTableEditRequest(index, title) {
    await $.ajax({
        method: "PATCH",
        url: "/table/title/" + index,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({title: title}),
        success: function (response) {
            setListTitle(response);
        },
        error: function (response) {

        }
    });
}

function getListTitle(id) {

    for (let i = 0; i < listsArray.length; i++) {
        if (listsArray[i].id == id) {
            return listsArray[i].title;
        }
    }
}

function setListTitle(response) {
    for (let i = 0; i < listsArray.length; i++) {
        if (listsArray[i].id === response.id) {
            listsArray[i].title = response.title;
        }
    }
}

async function getAllCardsByTable() {
    await $.ajax({
        method: "GET",
        url: "/card/1",
        dataType: 'json',

        success: function (response) {
            for (let card of response) {
                cardsArray.push(card);
            }
        },
        error: function (response) {

        }
    });
}

async function sendCardAddRequest(id, text) {
    await $.ajax({
        method: "POST",
        url: "/card/" + id,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({text: text}),
        success: function (response) {
            cardsArray.push(response);
        },
        error: function (response) {

        }
    });
}

async function sendCardEditRequest(index, text) {
    await $.ajax({
        method: "PATCH",
        url: "/card/" + index,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({text: text}),
        success: function (response) {

        },
        error: function (response) {

        }
    });
}

async function sendCardPositionEditRequest(card_id, table_id) {
    await $.ajax({
        method: "PATCH",
        url: "/card/" + card_id + "/table/" + table_id,
        dataType: 'json',
        success: function (response) {

        },
        error: function (response) {

        }
    });
}

async function sendCardDeleteRequest(index) {
    await $.ajax({
        method: "DELETE",
        url: "/card/" + index,
        contentType: "application/json; charset=utf-8",
        success: function (response) {

        },
        error: function (response) {

        }
    });
}

// function getDragBox(event) {
//
//     if (event.target.tagName === 'H3') {
//         dragBox = event.target.parentElement;
//     } else if (event.target.tagName === 'DIV' && event.target.className === 'list-item-text') {
//         dragBox = event.target.parentElement.parentElement;
//     } else if (event.target.tagName === 'DIV' && event.target.children[0].tagName === 'INPUT') {
//         dragBox = event.target.parentElement.children[0];
//     } else if (event.target.tagName === 'INPUT') {
//         dragBox = event.target.parentElement.parentElement.children[0];
//     } else if (event.target.tagName === 'DIV' && event.target.className === 'list') {
//         dragBox = event.target;
//     } else if (event.target.tagName === 'DIV' && event.target.className === 'list-item') {
//         dragBox = event.target.parentElement;
//     } else if (event.target.tagName === 'DIV' && event.target.className === 'list_placeholders') {
//         dragBox = event.target.children[0];
//     } else {
//         dragBox = null;
//     }
// }

function getDragBox(event) {

    if (event.target.tagName === 'H3') {
        dragBox = event.target.parentElement;
    } else if (event.target.tagName === 'DIV' && event.target.className === 'list-item-text') {
        dragBox = event.target.parentElement.parentElement;
    } else if (event.target.tagName === 'DIV' && event.target.children[0].tagName === 'INPUT') {
        dragBox = event.target.parentElement.children[0];
    } else if (event.target.tagName === 'INPUT') {
        dragBox = event.target.parentElement.parentElement.children[0];
    } else if (event.target.tagName === 'DIV' && event.target.className === 'list') {
        dragBox = event.target;
    } else if (event.target.tagName === 'DIV' && event.target.className === 'list-item') {
        dragBox = event.target.parentElement;
    } else if (event.target.tagName === 'DIV' && event.target.className === 'list_placeholders') {
        dragBox = event.target.children[0];
    } else {
        dragBox = null;
    }
}

//kortelei
const dragStart = (event) => {
    draggedItem = event.target;
    setTimeout(function () {
        event.target.style.display = 'none';
    }, 0);
};

async function dragEnd (event) {
    event.preventDefault();
    setTimeout(async function () {
        console.log('kada trigeris suveikia');
        event.target.style.display = 'block';
        let cardId = event.target.dataset.card_index;
        await sendCardPositionEditRequest(cardsArray[cardId].id, event.target.parentElement.dataset.id);
        cardsArray[cardId].list_id = event.target.parentElement.dataset.id;
        event.target = null;
    }, 0);
}

//sarasui
const dragOver = (event) => {
    event.preventDefault();
    getDragBox(event);

    if (dragBox) {
        dragBox.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        dragBox.style.transition = '0.1s';
        dragBox.parentElement.lastChild.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        dragBox.parentElement.lastChild.style.transition = '0.1s';
    }
};

function dragEnter(event) {
    event.preventDefault();

    if (dragBox) {
        dragBox.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        dragBox.style.transition = '0.1s';
        dragBox.parentElement.lastChild.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        dragBox.parentElement.lastChild.style.transition = '0.1s';
    }
}

const dragLeave = (event) => {
    event.preventDefault();
    if (dragBox) {
        dragBox.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        dragBox.parentElement.lastChild.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    }
};

const dragDrop = (event) => {
    event.preventDefault();

    if (event.target.tagName === 'DIV' && event.target.className === 'list-item') {
        dragBox = event.target.parentElement;
    }

    if (dragBox) {
        dragBox.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        dragBox.parentElement.lastChild.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        dragBox.append(draggedItem);
    }
};

async function listOnBlurEdit() {
    if (!this.value || (this.value.length > LIST_TITLE_MAX_LENGTH)) {
        this.value = getListTitle(this.dataset.listIndex);
        return;
    }

    if(this.value === getListTitle(this.dataset.listIndex)) {
        return;
    }

    await sendTableEditRequest(this.dataset.listIndex, this.value);
}

function onEnterEdit(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        event.target.blur();
    }
}

function boardOnBLurEdit() {
    if (!boardTitle.value || (boardTitle.value > BOARD_TITLE_MAX_LENGTH)) {
        boardTitle.value = currentBoard[0].title;
        return;
    }

    if(currentBoard[0].title === boardTitle.value) {
        return;
    }

    currentBoard[0].title = boardTitle.value;
    sendBoardEditRequest();
}

function cardOnMouseOver() {
    document.getElementById('delete' + this.dataset.card_index).style.display = 'block';
    document.getElementById('edit' + this.dataset.card_index).style.display = 'block';
}

function cardOnMouseOut() {
    document.getElementById('delete' + this.dataset.card_index).style.display = 'none';
    document.getElementById('edit' + this.dataset.card_index).style.display = 'none';
}

const cardOnClickToEdit = (event) => {
    event.target.style.visibility = 'hidden';
    event.target.parentElement.children[3].style.visibility = 'hidden';

    let cardForEdit = event.target.closest('.list-item');

    event.target.parentElement.children[2].style.display = 'block';
    event.target.parentElement.draggable = false;
    cardForEdit.children[0].contentEditable = true;
    console.log(cardForEdit);
    console.log(event.target.parentElement);

    cardForEdit.children[0].focus();

    event.target.parentElement.children[2].addEventListener('click', checkPressed);
    cardForEdit.children[0].addEventListener('blur', editFieldLeftWithoutSubmission);
};

function checkPressed() {
    this.style.display = "none";
    this.parentElement.children[1].style.visibility = 'visible';
    this.parentElement.children[3].style.visibility = 'visible';
    this.parentElement.draggable = true;
    this.parentElement.children[0].contentEditable = false;
}

async function editFieldLeftWithoutSubmission() {
    this.parentElement.children[2].style.display = 'none';
    this.parentElement.children[1].style.visibility = 'visible';
    this.parentElement.children[3].style.visibility = 'visible';

    this.contentEditable = false;
    this.parentElement.draggable = true;

    let cardsArrayIndex = this.parentElement.dataset.card_index;

    if(!this.innerHTML) {
        this.innerHTML = cardsArray[cardsArrayIndex].text;
        return;
    }

    if(this.innerHTML === cardsArray[cardsArrayIndex].text) {
        return;
    }

    cardsArray[cardsArrayIndex].text = this.innerHTML;
    await sendCardEditRequest(cardsArray[cardsArrayIndex].id, cardsArray[cardsArrayIndex].text);
}

async function cardOnClickToDelete() {
    let cardsArrayIndex = this.parentElement.dataset.card_index;
    this.parentElement.children[1].style.display = "none";
    this.parentElement.children[3].style.display = "none";
    this.parentElement.remove();
    await sendCardDeleteRequest(cardsArray[cardsArrayIndex].id);
    delete cardsArray[cardsArrayIndex];
}

function listIndexInListArray(id) {
    let arrayIndex = 0;
    for (let i = 0; i < listsArray.length; i++) {
        if (listsArray[i].id === id) {
            arrayIndex = i;
            break;
        }
    }
    return arrayIndex;
}

async function init() {
    await getBoardByIdFromDatabase();
    await getAllTablesByBoard();
    await getAllCardsByTable();

    boardTitle.value = currentBoard[0].title;
    display_list();
}

function display_list() {
    listsContainerHtml.innerHTML = "";

    boardTitle.addEventListener('blur', boardOnBLurEdit);
    boardTitle.addEventListener('keydown', onEnterEdit);

    for (let i = 0; i < listsArray.length; i++) {
        let list_placeholders = document.createElement("div");
        list_placeholders.className = 'list_placeholders';
        listsContainerHtml.appendChild(list_placeholders);

        let list = document.createElement("div");
        list.className = 'list';
        list.dataset.id = listsArray[i].id;
        list_placeholders.appendChild(list);

        list_placeholders.addEventListener('dragover', dragOver);
        list_placeholders.addEventListener('dragenter', dragEnter);
        list_placeholders.addEventListener('dragleave', dragLeave);
        list_placeholders.addEventListener('drop', dragDrop);

        let heading = document.createElement("textarea");
        heading.value = listsArray[i].title;
        heading.className = 'list-heading';
        heading.classList.add('form-control');
        heading.classList.add('border-0');
        heading.maxLength = LIST_TITLE_MAX_LENGTH;
        heading.rows = 1;

        heading.dataset.listIndex = listsArray[i].id;
        list.appendChild(heading);

        heading.addEventListener('blur', listOnBlurEdit);
        heading.addEventListener('keydown', onEnterEdit);


        listsHtml = document.querySelectorAll('.list');

        for (let j = 0; j < cardsArray.length; j++) {
            if (cardsArray[j] && cardsArray[j].list_id === listsArray[i].id) {
                displayCard(cardsArray[j], j);
            }
        }
    }
    $('.list-heading').autoHeight();
    cardsHtml = document.querySelectorAll('.list-item');

    insert_new_list();

    insert_new_task();
}

function insert_new_list() {
    let new_list_input_container = document.createElement("div");
    new_list_input_container.className = 'new-list-input-container';
    listsContainerHtml.appendChild(new_list_input_container);

    let write_list = document.createElement("div");
    write_list.className = 'input-container';
    write_list.innerHTML = "<input class = 'input_item' type = 'text' placeholder = '+ Make new list'>";
    new_list_input_container.appendChild(write_list);

    write_list.addEventListener("keydown", async function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (event.target.value) {
                event.target.disabled = true;
                await sendTableAddRequest(event.target.value);
                event.target.disabled = false;
                listsContainerHtml.innerHTML = '';
                display_list();
            }
        }
    });
}

function insert_new_task() {
    listsPlaceholdersHtml = document.querySelectorAll('.list_placeholders');
    for (let i = 0; i < listsPlaceholdersHtml.length; i++) {
        let taskInputContainer = document.createElement("div");
        taskInputContainer.className = 'input-container';
        listsPlaceholdersHtml[i].appendChild(taskInputContainer);

        let write_record = document.createElement("input");
        write_record.dataset.id = listsArray[i].id;
        write_record.className = 'input_item';
        write_record.type = 'text';
        write_record.placeholder = '+ Add a card';
        taskInputContainer.appendChild(write_record);


        write_record.addEventListener("keydown", async function (event) {
            if (event.key === "Enter") {
                event.preventDefault();

                if (event.target.value) {
                    event.target.disabled = true;
                    await sendCardAddRequest(event.target.getAttribute('data-id'), event.target.value);
                    event.target.disabled = false;
                    event.target.value = '';
                    displayCard(cardsArray[cardsArray.length - 1], cardsArray.length - 1);
                }
            }
        });
    }
}

function displayCard(card, index) {
    let place = listIndexInListArray(card.list_id);

    let create_record = document.createElement("div");
    create_record.draggable = true;
    create_record.contentEditable = false;
    create_record.className = 'list-item';
    create_record.dataset.id = card.list_id;
    create_record.dataset.card_index = index;
    listsHtml[place].appendChild(create_record);

    let cardText = document.createElement("div");
    cardText.innerHTML = card.text;
    cardText.contentEditable = false;
    cardText.className = 'list-item-text';
    cardText.dataset.id = card.list_id;
    cardText.dataset.card_index = index;
    create_record.appendChild(cardText);

    // let cardText = document.createElement("textarea");
    // cardText.value = card.text;
    // cardText.maxLength = CARD_TEXT_MAX_LENGTH;
    // cardText.className = 'list-item-text';
    // cardText.classList.add('form-control');
    // cardText.classList.add('border-0');
    // cardText.classList.add('pt-4');
    // cardText.rows = 1;
    // cardText.dataset.id = card.list_id;
    // cardText.dataset.card_index = index;
    // create_record.appendChild(cardText);

    create_record.addEventListener('dragstart', dragStart);
    create_record.addEventListener('dragend', dragEnd);

    let createEditButton = document.createElement("i");
    createEditButton.className = "fa fa-pencil-square-o";
    createEditButton.contentEditable = false;
    createEditButton.dataset.id = card.list_id;
    createEditButton.classList.add('edit-button');
    createEditButton.id = 'edit' + index;
    create_record.appendChild(createEditButton);

    let createCheckButton = document.createElement("i");
    createCheckButton.className = "fa fa-check";
    createCheckButton.classList.add('check-button');
    createCheckButton.dataset.id = card.list_id;
    createCheckButton.contentEditable = false;
    createCheckButton.id = 'check' + index;
    create_record.appendChild(createCheckButton);

    let createDeleteButton = document.createElement("i");
    createDeleteButton.className = "fa fa-trash-o";
    createDeleteButton.classList.add('delete-button');
    createDeleteButton.dataset.id = card.list_id;
    createDeleteButton.contentEditable = false;
    createDeleteButton.id = 'delete' + index;
    create_record.appendChild(createDeleteButton);

    createDeleteButton.addEventListener('click', cardOnClickToDelete);
    createEditButton.addEventListener('click', cardOnClickToEdit);
    create_record.addEventListener('mouseover', cardOnMouseOver);
    create_record.addEventListener('mouseout', cardOnMouseOut);

    createCheckButton.style.display = 'none';
    createEditButton.style.display = 'none';
    createDeleteButton.style.display = 'none';
    // $('.list-item-text').autoHeight();
}

init();
