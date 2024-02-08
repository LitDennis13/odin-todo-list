import { todoList } from "./Todo-DOM-Loading.js";
import { loadTodoList } from "./Todo-DOM-Loading.js";
import { findProject } from "./Project-Functionality.js";

todoList.addEventListener("click",expandTodo);



function expandTodo(event) {
    let target = event.target;
    
    if (target.tagName.toLowerCase() === "img" && target.parentElement.id === "todo") {
        
        let todoName = target.parentElement.querySelector("#todo-name").textContent;
        let project = findProject(document.querySelector("#project-title").textContent);
        
        try {
            document.querySelector("#todo-extra-info").remove();
        }
        catch {}


        if (target.parentElement.classList == "clicked") {
            
            target.parentElement.classList = "";
            loadTodoList(project);
        }
        else {
            
            closeTodos();
            target.parentElement.classList = "clicked";

            let todoExtras = document.createElement("div");
            let description = document.createElement("p");
            let dueDate = document.createElement("p");
            let editTodoButton = document.createElement("button");
            let todo = findTodo(project,todoName);
            
            todoExtras.id = "todo-extra-info";
            description.id = "description";
            dueDate.id = "dueDate";
            editTodoButton.id = "edit-todo-button";
            
            description.textContent = todo.description;
            dueDate.textContent = "Due "+todo.dueDate;
            editTodoButton.textContent = "Edit Todo";


            todoExtras.appendChild(dueDate);
            todoExtras.appendChild(description);
            todoExtras.appendChild(editTodoButton);

            target.parentElement.appendChild(todoExtras);
            
            
        }       
    }
}

function findTodo(project, todoName) {
    for (const todo of project.projectTodoList) {
        if (todo.name === todoName) {
            return todo;
        }
        else {
            continue;
        }
    }
}


function closeTodos(todoExtras) {
    let currentTodos = document.querySelectorAll("#todo");
    currentTodos.forEach((todo) => {
        todo.classList = "";        
    });
}


