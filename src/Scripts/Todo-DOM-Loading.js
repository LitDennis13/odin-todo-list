import { deleteButton,renameButton } from "./Project-Functionality.js";
import {addEventListenToCreateTodo} from "./Todo-Dialogs.js"



let projectTitle = document.querySelector("#project-title");
let todoList = document.querySelector("#todo-list");

function createTodoButton() {
    return `<button id="create-todo"><p>Create Todo</p></button>`;
}

function todoTemplate(name,priority,check) {
    if (check === true) {
        return `<button id="todo" class="checked-todo">
        <div id="check-button"></div>
        <p id="todo-name">${name}</p>
        <p id="todo-priority">Priority ${priority}</p>
        <img src="${require('../Images/more-options-img.png')}" alt="More Options Button">
        </button>`;
    }
    return `<button id="todo">
    <div id="check-button"></div>
    <p id="todo-name">${name}</p>
    <p id="todo-priority">Priority ${priority}</p>
    <img src="${require('../Images/more-options-img.png')}" alt="More Options Button">
    </button>`;
}

function loadTodoList(currentProject) {
    
    projectTitle.textContent = currentProject.name;
    if (currentProject.name === "Default") {
        deleteButton.textContent = "Cannot Delete";
        renameButton.textContent = "Cannot Rename";
    }
    else {
        deleteButton.textContent = "Delete";
        renameButton.textContent = "Rename";
    }
    let newTodoListUC = ``;
    let newTodoListC = ``;
    for (const todo of currentProject.projectTodoList){
        if (todo.checked === true) {
            newTodoListC += todoTemplate(todo.name,todo.priority,true);
        }
        else {
            newTodoListUC += todoTemplate(todo.name,todo.priority);
        }
    }
    newTodoListUC += newTodoListC;
    newTodoListUC += createTodoButton();
    
    todoList.innerHTML = newTodoListUC;
    let createTodoButtonHTML = document.querySelector("#create-todo");
    addEventListenToCreateTodo(createTodoButtonHTML);
}

export {loadTodoList,todoList,projectTitle};