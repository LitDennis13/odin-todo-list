import {storage, saveStorage,resetStorage} from "./WebStorageAPI.js";
import { Project } from "./Project-Functionality";
import { loadProjects } from "./Project-DOM-Loading.js";
import { loadTodoList } from "./Todo-DOM-Loading.js";

storage[0].projectTodoList = [{"name":"Todo One","description":"description","dueDate":"dueDate","priority":"1"}];


storage[1] = Project("TestProject");

loadProjects();
loadTodoList(storage[0]);
console.log(storage);