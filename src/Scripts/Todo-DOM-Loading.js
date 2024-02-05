import {storage, saveStorage,resetStorage} from "./WebStorageAPI.js";
import { deleteButton,renameButton } from "./Project-Functionality.js";

//todo format {"name":"name","description":"description","dueDate":"dueDate","priority"}

let projectTitle = document.querySelector("#project-title");
let todoList = document.querySelector("#todo-list");

function createTodoButton() {
    return `<button id="create-todo"><p>Create Todo</p></button>`;
}

function todoTemplate(name,priority) {
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
    let newTodoList = ``;
    for (const todo of currentProject.projectTodoList){
        newTodoList += todoTemplate(todo.name,todo.priority);
    }
    newTodoList += createTodoButton();
    
    todoList.innerHTML = newTodoList;
    
}

export {loadTodoList,todoList,projectTitle};