

const url = 'http://localhost:3000/interns';

function getData() {
    fetch(url)
        .then(res => res.json())
        .then(data => createTable(data))
}
getData();


function createElement(tagName, parent) {
    let element = document.createElement(tagName);
    parent.append(element);
    return element;

}
function createElementTh(tagName, parent, textContent) {
    let element = document.createElement(tagName);
    element.textContent = textContent;
    parent.append(element);
    return element;
};


const divContainer = createElement('div', document.body);
divContainer.className = 'divContainer';

const divAdd = createElement('div', divContainer);
divAdd.className = 'container';

const inpName = createElement('input', divAdd);

const inpEmail = createElement('input', divAdd)
const btnAdd = createElement('button', divAdd);
btnAdd.textContent = 'Add';
const table = createElement('table', divContainer);
const tr = createElement('tr', table);
const thName = createElementTh('th', tr, 'name');
const thEmail = createElementTh('th', tr, 'email');


function createTable(data) {

    data.forEach(el => {
        let tr = document.createElement('tr');
        table.append(tr);
        let td = document.createElement('td');
        td.textContent = el.name;
        tr.append(td)
        let td2 = document.createElement('td');
        td2.textContent = el.email;
        tr.append(td2)
        let btnEdit = document.createElement('button');
        btnEdit.textContent = 'Edit';
        btnEdit.id = el.id;
        btnEdit.addEventListener('click', openPopup)
        tr.append(btnEdit);
        let btnDelete = document.createElement('button');
        btnDelete.id = el.id;
        btnDelete.addEventListener('click', deleteIntern)
        tr.append(btnDelete);
        btnDelete.textContent = 'Delete';

    })
};


function openPopup() {
    let modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'simpleModal';
    divContainer.append(modal);
    let modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modal.append(modalContent);
    let inputName = createElement('input', modalContent);

    let inputEmail = createElement('input', modalContent);
    let btns = createElement('div', modalContent);
    let closeModal = createElement('button', modalContent);
    closeModal.className = 'close-modal';
    closeModal.textContent = 'Close';
    btns.append(closeModal)
    let saveModal = createElement('button', modalContent);
    saveModal.className = 'close-modal';
    saveModal.textContent = 'Save';
    btns.append(saveModal)
    console.log('asd')
}


function deleteIntern(e) {
    e.preventDefault();
    fetch(`${url}/${e.target.id}`, {
        method: "DELETE",
    });
}


let obj = {};
btnAdd.addEventListener('click', () => {
    if (inpName.value === '' || inpEmail.value === '') {
        console.log('asd')

    } else {
        obj.name = inpName.value;
        obj.email = inpEmail.value;
        addIntern(obj);
    }
})



function addIntern(norIntern) {
    fetch(url, {
        method: "POST",
        body: JSON.stringify(norIntern),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
};




