import {storage} from "./WebStorageAPI.js";
import { loadProjects } from "./Project-DOM-Loading.js";
import { loadTodoList } from "./Todo-DOM-Loading.js";

loadProjects();
loadTodoList(storage[0]);