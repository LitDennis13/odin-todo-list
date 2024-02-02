import {storage, saveStorage,resetStorage} from "./WebStorageAPI.js";
import { loadTodoList } from "./Todo-DOM-Loading.js";

function Project(name) {
    let projectTodoList = [];
    return {name,projectTodoList};
}

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
export {Project};

