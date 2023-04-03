ElEMENT_FROM_LIST = '.element'
BUTTON_DELETE = 'btnDelete'
const todoList = document.querySelector('#todoList')
const inputMessage = document.querySelector('#inputMessage')
const button = document.querySelector('#btnSend')

button.addEventListener('click', onButtonSendClick)
todoList.addEventListener('click', onTodoListClick)

TodoAPI
    .getList()
    .then((list) => {
        renderServerList(list)
    })
    .catch(e => showError(e))


function onButtonSendClick() {
    const message = getMessage()

    if (isMessageValid(message)){
        TodoAPI
            .createElem(message)
            .then((newTodo) => {
                renderList(newTodo)
                clear()
            })
            .catch(e => showError(e))
    } else {
        showError(new Error('Не корректные данные!'))
    }
}

function onTodoListClick(e) {
    const target = e.target
    const elementFromList = findElement(target)
    const indexOfDeleteElem = elementFromList.dataset.id
    if (isButtonDelete(target)){
        TodoAPI
            .deleteElem(indexOfDeleteElem)
            .then()
            .catch(e => showError(e))
        elementFromList.remove()
    } else {
        if (elementFromList.style.backgroundColor === 'lightgreen'){
            elementFromList.style.backgroundColor = 'white'
        } else {
            elementFromList.style.backgroundColor = 'lightgreen'
        }
    }
}

function findElement(area) {
    return area.closest(ElEMENT_FROM_LIST)
}

function isButtonDelete(area) {
    return area.classList.contains(BUTTON_DELETE)
}

function getMessage() {
    return { title: inputMessage.value }
}

function isMessageValid(message) {
    return (message.title !== '')
}

function renderList(message) {
    const html = htmlElem(message)

    todoList.insertAdjacentHTML('beforeend', html)
}

function renderServerList(list) {
    const html = list.map(htmlElem).join('')

    todoList.innerHTML = html
}

function htmlElem(message) {
    return `
        <li class="element" data-id="${message.id}">
        <span class="element__text">${message.title}</span>
        <button class="btnDelete">Delete</button></li>
    `
}

function clear() {
    inputMessage.value = ''
}

function showError(e) {
    alert(e.message)
}