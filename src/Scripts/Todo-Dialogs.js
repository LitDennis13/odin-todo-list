import {storage, saveStorage,resetStorage} from "./WebStorageAPI.js";


import { loadTodoList } from "./Todo-DOM-Loading.js";
import { projectTitle } from "./Todo-DOM-Loading.js";
import { findProject } from "./Project-Functionality";
const createTodoDialog = document.querySelector("#create-todo-dialog");

function addEventListenToCreateTodo(createTodoButton) {
    createTodoButton.addEventListener("click", () => {
        resetInputs();
        createTodoDialog.showModal();
    });
}

const closeTodoDialog = document.querySelector("#create-todo-close");

closeTodoDialog.addEventListener("click", () => {
    createTodoDialog.close();
});

const todoName = document.querySelector("#todoName");
const todoDescription = document.querySelector("#todoDescription");
const todoPriority = document.querySelector("#todoPriority");
const todoDate = document.querySelector("#todoDate");

const submitTodoDialog = document.querySelector("#create-todo-dialog-button");

todoName.addEventListener("keydown", () => todoName.setCustomValidity(""));

submitTodoDialog.addEventListener("click", () => {
    if (checkInputValidities()) {
        if (checkIfTodoExists(todoName.value)) {
            todoName.setCustomValidity("Todo Name Already Exists");
        }
        else {
            createTodo();
            loadTodoList(findProject(projectTitle.textContent));
        }
    }
});


function createTodo() {
    let i = 0;
    for (const proj of storage) {
        if (proj.name === projectTitle.textContent) {
            break;
        }
        else {
            i++;
            continue;
        }
    }

    let newTodo = {
        "name": todoName.value,
        "description": todoDescription.value,
        "dueDate": todoDate.value,
        "priority": todoPriority.value
    }
    storage[i].projectTodoList.push(newTodo);
}


function checkIfTodoExists(newTodoName) {
    let currentProjectTodoList = findProject(projectTitle.textContent).projectTodoList;

    for (const todo of currentProjectTodoList) {
        if (todo.name === newTodoName) {
            return true;
        }
    }
    return false;
}

function checkInputValidities() {
    if (todoName.checkValidity() === false) {
        return false;
    }
    if (todoDate.checkValidity() === false) {
        return false;
    }
    return true;
}

function resetInputs() {
    todoName.value = "";
    todoDescription.value = "";
    todoDate.value = getFormattedDate();
    
}


export {addEventListenToCreateTodo};


function getFormattedDate() {
    let date = new Date();
    let str = date.getFullYear() + "-" + addZero(date.getMonth()+1) + "-" + addZero(date.getDate());

    return str;
}
function addZero(num) {
    if (num < 10) {
        return "0"+num;
    }
    else return num;
}