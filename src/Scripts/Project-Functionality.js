import {storage, saveStorage,resetStorage} from "./WebStorageAPI.js";


function Project(name) {
    let projectTodoList = [];
    return {name,projectTodoList};
}

