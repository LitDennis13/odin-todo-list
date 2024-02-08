import {storage, saveStorage} from "./WebStorageAPI.js";


import { loadTodoList,todoList } from "./Todo-DOM-Loading.js";
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
        "priority": todoPriority.value,
        "checked": false,
    }
    storage[i].projectTodoList.push(newTodo);
    saveStorage();
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

const editTodoDialog = document.querySelector("#edit-todo-dialog");

const deleteTodoButton = document.querySelector("#delete-todo");

const editTodoName = document.querySelector("#editTodoName");

const editTodoDescription = document.querySelector("#editTodoDescription");

const editTodoPriority = document.querySelector("#editTodoPriority");

const editTodoDate = document.querySelector("#editTodoDate");

const editTodoCloseButton = document.querySelector("#edit-todo-close");

const saveTodoButton = document.querySelector("#edit-todo-dialog-button");

let currentTodoNumber = 0;

todoList.addEventListener("click", (event) => {
    let target = event.target;
    
    if (target.id === "edit-todo-button") {
        
        editTodoDialog.showModal();
        currentTodoNumber = returnCurrentTodo(target);
        editTodoName.value = storage[findProjectNumber()].projectTodoList[currentTodoNumber].name;

        editTodoDescription.value = storage[findProjectNumber()].projectTodoList[currentTodoNumber].description;

        editTodoPriority.value = storage[findProjectNumber()].projectTodoList[currentTodoNumber].priority;

        editTodoDate.value = storage[findProjectNumber()].projectTodoList[currentTodoNumber].dueDate;        
    }
});

editTodoCloseButton.addEventListener("click", () => {
    editTodoDialog.close();
});

saveTodoButton.addEventListener("click", (event) => {
    if (checkIfTodoExists(editTodoName.value) && editTodoName.value !== storage[findProjectNumber()].projectTodoList[currentTodoNumber].name) {
        editTodoName.setCustomValidity("Todo Name Already Exists");
    }
    else {
        editTodo();
        loadTodoList(findProject(projectTitle.textContent));
    }
});

deleteTodoButton.addEventListener("click", () => {
    storage[findProjectNumber()].projectTodoList.splice(currentTodoNumber,1);
    saveStorage();
    loadTodoList(findProject(projectTitle.textContent));
    editTodoDialog.close();
    
});



function editTodo() {
    storage[findProjectNumber()].projectTodoList[currentTodoNumber].name = editTodoName.value;

    storage[findProjectNumber()].projectTodoList[currentTodoNumber].description  = editTodoDescription.value;

    storage[findProjectNumber()].projectTodoList[currentTodoNumber].priority =  editTodoPriority.value;

    storage[findProjectNumber()].projectTodoList[currentTodoNumber].dueDate = editTodoDate.value;

    saveStorage();
    
}

function findProjectNumber() {
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
    return i;
}

function returnCurrentTodo(target) {
    return findTodo(target.parentNode.parentNode.querySelector("#todo-name").textContent);
}

function findTodo(todoName) {
    let currentProjectTodoList = findProject(projectTitle.textContent).projectTodoList;
    let i = 0;
    for (const todo of currentProjectTodoList) {
        if (todo.name === todoName) {
            return i;
        }
        else {
            i++;
            continue;
        }
    }
}


export {addEventListenToCreateTodo,returnCurrentTodo,findProjectNumber};


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