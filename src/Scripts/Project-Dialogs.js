import {storage, saveStorage,resetStorage} from "./WebStorageAPI.js";
import { Project,resetActiveProject } from "./Project-Functionality";
import { loadProjects } from "./Project-DOM-Loading.js";
import { loadTodoList } from "./Todo-DOM-Loading.js";
import { projectTitle } from "./Todo-DOM-Loading.js";

let createProjectDialog = document.querySelector("#create-project-dialog");


let closeProjectDialog = document.querySelector("#create-project-close");

let createNewProject = document.querySelector("#create-project-dialog-button");

let newProjectName = document.querySelector("#createProjectForm > input");

function addEventListenToCreateButton(createButton) {
    createButton.addEventListener("click",() => {
        newProjectName.value = "";
        createProjectDialog.showModal();
    });
}


closeProjectDialog.addEventListener("click", () => {
    createProjectDialog.close();
});

createNewProject.addEventListener("click", () => {
    
    newProjectName.setCustomValidity("");
    if (newProjectName.checkValidity()) {
        let exists = checkExists(newProjectName.value);
        if (exists) {
            newProjectName.setCustomValidity("This Project already Exists");
        }
        else {
            createProject(newProjectName.value);
        }
    }
    
});

newProjectName.addEventListener("keydown",() => {
    newProjectName.setCustomValidity("");
});

function createProject(projectName) {
    let nextProjectNumber = storage.length;
    storage[nextProjectNumber] = Project(projectName);
    saveStorage();
    loadProjects();
    loadTodoList(storage[nextProjectNumber]);
    resetActiveProject();

    let projectHTML = document.querySelector(`#project[text="${projectName}"]`);

    projectHTML.classList.remove("not-active-project");
    projectHTML.classList.add("active-project");
}

function checkExists(projectName) {
    for (const proj of storage) {
        if (proj.name.toLowerCase() === projectName.toLowerCase()) {
            return true;
        }
        else {
            continue;
        }
    }
    return false;
}


let renameProjectDialog = document.querySelector("#rename-project-dialog");

let renameButton = document.querySelector("#rename-project");

let closeProjectRenameDialog = document.querySelector("#rename-project-close");

let renameProjectButton = document.querySelector("#rename-project-dialog-button");

let newRenameName = document.querySelector("#renameProjectForm > input");



renameButton.addEventListener("click", () => {
    newRenameName.value = "";
    if (renameButton.textContent === "Cannot Rename") {
        return;
    }
    newRenameName.placeholder = projectTitle.textContent;
    renameProjectDialog.showModal();
});

closeProjectRenameDialog.addEventListener("click",() => {
    renameProjectDialog.close();
});

renameProjectButton.addEventListener("click",() => {
    newRenameName.setCustomValidity("");
    if (newRenameName.checkValidity()) {
        let exists = checkExists(newRenameName.value);
        if (exists) {
            newRenameName.setCustomValidity("This Project already Exists");
        }
        else {
            
            renameProject(projectTitle,newRenameName.value);
        }
    }
});

newRenameName.addEventListener("keydown",() => {
    newRenameName.setCustomValidity("");
});


function renameProject(currentProjectName,newProjectName) {
    let i = 0;
    for (const proj of storage) {
        
        if (proj.name === currentProjectName) {
            break;
        }
        else {
            i++;
            continue;
        }
    }
    
    storage[i-1].name = newProjectName;
    saveStorage();
    loadProjects();
    loadTodoList(storage[i-1]);
    resetActiveProject();

    let projectHTML = document.querySelector(`#project[text="${newProjectName}"]`);

    projectHTML.classList.remove("not-active-project");
    projectHTML.classList.add("active-project");
}



export {addEventListenToCreateButton};
