import {storage, saveStorage,resetStorage} from "./WebStorageAPI.js";
import { loadTodoList } from "./Todo-DOM-Loading.js";
import { loadProjects } from "./Project-DOM-Loading.js";

function Project(name) {
    let projectTodoList = [];
    return {name,projectTodoList};
}
let renameButton = document.querySelector("#rename-project");
let deleteButton = document.querySelector("#delete-project");
let projectsArea = document.querySelector("#projects");

projectsArea.addEventListener("click",(event) => {
    let target = event.target;
    if (target.id === "project"){
        resetActiveProject();
        target.classList.remove("not-active-project");
        target.classList.add("active-project");
        loadTodoList(findProject(target.innerText));
    }
});

deleteButton.addEventListener("click",deleteProject);

function resetActiveProject() {
    for (const proj of document.querySelectorAll("#project")) {
        proj.classList.remove("active-project");
        proj.classList.add("not-active-project");
    }
}

function findProject(name) {
    for (const proj of storage) {
        if (proj.name === name) {
            return proj;
        }
        else {
            continue;
        }
    }
}

function deleteProject(event) {
    let target = event.target;
    if (target.innerText === "Cannot Delete") {
        return;
    }
    let defaultProject = document.querySelector("#project:first-child");
    let currentProject = document.querySelector("#todos > h1").innerText;
    resetActiveProject();
    defaultProject.classList.remove("not-active-project");
    defaultProject.classList.add("active-project");
    let i = 0;
    for (const proj of storage) {
        if (proj.name === currentProject) {
            storage.splice(i,1);
            break;
        }
        else {
            i++;
            continue;
        }
    }
    saveStorage();
    loadProjects();
    loadTodoList(storage[0]);
}


renameButton.addEventListener("click",renameProject);

function renameProject(event) {
    let target = event.target;
    if (target.innerText === "Cannot Rename") {
        return;
    }
}


export {Project,deleteButton,renameButton,resetActiveProject,findProject};

