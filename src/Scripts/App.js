import {storage, saveStorage,resetStorage} from "./WebStorageAPI.js";

import { loadProjects } from "./Project-DOM-Loading.js";
import { loadTodoList } from "./Todo-DOM-Loading.js";

storage[0].projectTodoList = [
    {"name":"Todo One","description":"description","dueDate":"dueDate","priority":"1"},
    {"name":"Todo Two","description":"descriptionTWO","dueDate":"dueDateTWO","priority":"2"}];



loadProjects();
loadTodoList(storage[0]);
console.log(storage);