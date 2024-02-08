import {storage, saveStorage} from "./WebStorageAPI.js";
import { loadTodoList,todoList } from "./Todo-DOM-Loading.js";
import { findProjectNumber } from "./Todo-Dialogs.js";

import { projectTitle } from "./Todo-DOM-Loading.js";

import { findProject } from "./Project-Functionality.js";

todoList.addEventListener("click", (event) => {
    let target = event.target;

    if (target.id === "check-button") {
        if (storage[findProjectNumber()].projectTodoList[findTodoByName(target.parentNode.querySelector("#todo-name").textContent)].checked === true) {
            storage[findProjectNumber()].projectTodoList[findTodoByName(target.parentNode.querySelector("#todo-name").textContent)].checked = false;
        }
        else {
            storage[findProjectNumber()].projectTodoList[findTodoByName(target.parentNode.querySelector("#todo-name").textContent)].checked = true;
        }
        saveStorage();
        loadTodoList(findProject(projectTitle.textContent));
    }
});

function findTodoByName(name) {
    let i = 0;
    for (const todo of storage[findProjectNumber()].projectTodoList) {
        if (todo.name === name) {
            return i;
        }
        else {
            i++;
        }
    }

}