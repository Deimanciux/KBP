const listsContainerHtml = document.getElementById('lists'); //container for all lists in page
let listsPlaceholdersHtml = document.querySelectorAll('.list_placeholders'); //placeholders of specific lists
let listsHtml = document.querySelectorAll('.list'); //sarasai html pavidalu
let cardsHtml = document.querySelectorAll('.list-item'); //korteliu html
let draggedItem = null; //tempiamas elementas
let dragBox = null; //vieta i kuria tempiamas elementas
let cardsArray = []; //visu korteliu masyvas kuriame korteles pavadinimas ir saraso id

let currentBoard = [];
let boards = [];
let boardTitle = document.getElementById('board-title');

let listsArray = [];

async function getBoardByIdFromDatabase() {
    await jQuery.ajax({
        method: "GET",
        url: "/board/1",
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

function getDragBox(event) {

    if (event.target.tagName == 'H3') {
        dragBox = event.target.parentElement;
    } else if (event.target.tagName == 'DIV' && event.target.className == 'list-item-text') {
        dragBox = event.target.parentElement.parentElement;
    } else if (event.target.tagName == 'DIV' && event.target.children[0].tagName == 'INPUT') {
        dragBox = event.target.parentElement.children[0];
    } else if (event.target.tagName == 'INPUT') {
        dragBox = event.target.parentElement.parentElement.children[0];
    } else if (event.target.tagName == 'DIV' && event.target.className == 'list') {
        dragBox = event.target;
    } else if (event.target.tagName == 'DIV' && event.target.className == 'list-item') {
        dragBox = event.target.parentElement;
    } else if (event.target.tagName == 'DIV' && event.target.className == 'list_placeholders') {
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

const dragEnd = (event) => {
    event.preventDefault();
    setTimeout(function () {
        event.target.style.display = 'block';
        cardsArray[event.target.dataset.card_index].list_id = event.target.parentElement.dataset.id;
        event.target = null;
    }, 0);
};

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

async function listOnBlurEdit(event) {
    await sendTableEditRequest(this.dataset.listIndex, this.innerHTML);
}

function onEnterEdit(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        event.target.blur();
    }
}

function boardOnBLurEdit() {
    currentBoard[0].title = boardTitle.innerHTML;
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
    console.log(event);
    event.target.classList.remove("edit-button");
    event.target.classList.add('edit-button-invisible');
    event.target.parentElement.children[3].classList.remove("delete-button");
    event.target.parentElement.children[3].classList.add('delete-button-invisible');

    let cardForEdit = event.target.closest('.list-item');

    event.target.parentElement.children[2].style.display = 'block';

    cardForEdit.children[0].contentEditable = true;
    cardForEdit.children[0].focus();

    console.log(event.target.parentElement.children[2]);
    event.target.parentElement.children[2].addEventListener('click', checkPressed);
    event.target.parentElement.children[0].addEventListener('blur', editFieldLeftWithoutSubmission);
};

function checkPressed() {
    console.log("cia iej");
    this.style.display = "none";
    this.style.display = "none";
    this.parentElement.children[1].classList.remove("edit-button-invisible");
    this.parentElement.children[1].classList.add('edit-button');
    this.parentElement.children[3].classList.remove("delete-button-invisible");
    this.parentElement.children[3].classList.add('delete-button');
}

async function editFieldLeftWithoutSubmission() {
    console.log('without submition');
    this.parentElement.children[2].style.display = 'none';
    this.parentElement.children[1].classList.remove("edit-button-invisible");
    this.parentElement.children[1].classList.add('edit-button');
    this.parentElement.children[3].classList.remove("delete-button-invisible");
    this.parentElement.children[3].classList.add('delete-button');

    this.contentEditable = false;
    let cardsArrayIndex = this.parentElement.dataset.card_index;
    cardsArray[cardsArrayIndex].text = this.innerHTML;
    await sendCardEditRequest(cardsArray[cardsArrayIndex].id, cardsArray[cardsArrayIndex].text);
}

async function cardOnClickToDelete() {
    let cardsArrayIndex = this.parentElement.dataset.card_index;
    await sendCardDeleteRequest(cardsArray[cardsArrayIndex].id);
    delete cardsArray[cardsArrayIndex];
    this.parentElement.remove();
}

function biggestListId() {
    let biggestId = 0;
    for (let i = 0; i < listsArray.length; i++) {
        if (listsArray[i].id > biggestId) {
            biggestId = listsArray[i].id;
        }
    }
    return biggestId;
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

    boardTitle.innerHTML = currentBoard[0].title;
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

        let heading = document.createElement("h3");
        heading.innerHTML = listsArray[i].title;
        heading.className = 'list-heading';
        heading.contentEditable = true;
        heading.dataset.listIndex = listsArray[i].id;
        list.appendChild(heading);

        heading.addEventListener('blur', listOnBlurEdit);
        heading.addEventListener('keydown', onEnterEdit);
        // heading.addEventListener('click', headingOnClickToEdit);

        listsHtml = document.querySelectorAll('.list');

        for (let j = 0; j < cardsArray.length; j++) {
            if (cardsArray[j] && cardsArray[j].list_id === listsArray[i].id) {
                displayCard(cardsArray[j], j);
            }
        }
    }
    cardsHtml = document.querySelectorAll('.list-item');

    insert_new_list();

    insert_new_task();
}

function insert_new_list() {
    let new_list_input_container = document.createElement("div");
    new_list_input_container.className = 'new-list-input-container';
    listsContainerHtml.appendChild(new_list_input_container);

    //kad po visais sarasais leistu sukurti nauja sarasa
    let write_list = document.createElement("div");
    write_list.className = 'input-container';
    write_list.innerHTML = "<input class = 'input_item' type = 'text' placeholder = '+ Make new list'>";
    new_list_input_container.appendChild(write_list);

//kad paspaudus enter submitintu, sukurtu masyve nauja sarasa
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
                    // display_list();
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
}

init();
