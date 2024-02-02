import {storage, saveStorage,resetStorage} from "./WebStorageAPI.js";

let projectList = document.querySelector("#projects");

function lineBreak() {
    return `<div id="line-break"></div>`;
}

function createButtonHTML() {
    return `<button id="create-project" class="not-active">Create Project</button>`;
}

function projectTemplate(name,active) {
    if (active) {
        return `<button id="project" class="active-project">${name}</button>`;
    }
    else {
        return `<button id="project" class="not-active-project">${name}</button>`;
    }
    
}

function loadProjects() {
    let newProjectList = `${projectTemplate("Default",true)} ${lineBreak()}`;
    for (const project of storage) {
        if (project.name === "Default") {
            continue;
        }
        else {
            newProjectList += `${projectTemplate(project.name,false)}`;
        }
    }
    newProjectList += `${createButtonHTML()}`;

    projectList.innerHTML = newProjectList;
}
loadProjects();
console.log(storage);
