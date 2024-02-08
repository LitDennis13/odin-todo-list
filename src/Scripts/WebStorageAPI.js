/*if(typeof(localStorage.getItem("TodoObjectStorage"))=='undefined') {
    localStorage.setItem("TodoObjectStorage",`[{"name":"Default","projectTodoList":[]}]`);
}

let storage = JSON.parse(localStorage.getItem("TodoObjectStorage"));

function resetStorage() {
    localStorage.setItem("TodoObjectStorage",`[{"name":"Default","projectTodoList":[]}]`);
    storage = JSON.parse(localStorage.getItem("TodoObjectStorage"));
}

function saveStorage() {
    localStorage.setItem("TodoObjectStorage",JSON.stringify(storage));
}
*/
let storage = [{"name":"Default","projectTodoList":[]}];

function saveStorage() {
    return;
}

export {storage, saveStorage};



