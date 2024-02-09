let WSAPI = false;

if (typeof(Storage) !== "undefined") {
    WSAPI = true;
}

if((typeof localStorage["TodoObjectStorage"]) === "undefined" && WSAPI === true) {
    localStorage["TodoObjectStorage"] = `[{"name":"Default","projectTodoList":[]}]`;
    
}
let storage = [];
if (WSAPI === true) {
    storage = JSON.parse(localStorage["TodoObjectStorage"]);
}
else {
    storage = [{"name":"Default","projectTodoList":[]}]
}


function resetStorage() {
    if (WSAPI === true) {
        localStorage["TodoObjectStorage"] = `[{"name":"Default","projectTodoList":[]}]`;
        storage = JSON.parse(localStorage["TodoObjectStorage"]);
    }
}

function saveStorage() {
    if (WSAPI === true) {
        localStorage["TodoObjectStorage"] = JSON.stringify(storage);
    }
}



export {storage, saveStorage};



