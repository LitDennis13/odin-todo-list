import {storage, saveStorage,resetStorage} from "./WebStorageAPI.js";

import { loadProjects } from "./Project-DOM-Loading.js";
import { loadTodoList } from "./Todo-DOM-Loading.js";






loadProjects();
loadTodoList(storage[0]);
console.log(storage);