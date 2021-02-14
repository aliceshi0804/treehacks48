
const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('room');
var name = '';
//selectors
const todoInput = document.querySelector('.todo_input');
const todoButton = document.querySelector('.todo_button');
const todoList = document.querySelector('.todo_list');
const filterOption = document.querySelector('.filter_todo');
//event listeners
// todoButton.addEventListener("click", addTodo)
// todoList.addEventListener("click", deleteCheck)
// filterOption.addEventListener("click", filterTodo)
/*
  #####  ####### #     # ######  #     #         ######  ####### ####### #     # 
 #     #    #    #     # #     #  #   #          #     # #     # #     # ##   ## 
 #          #    #     # #     #   # #           #     # #     # #     # # # # # 
  #####     #    #     # #     #    #            ######  #     # #     # #  #  # 
       #    #    #     # #     #    #            #   #   #     # #     # #     # 
 #     #    #    #     # #     #    #            #    #  #     # #     # #     # 
  #####     #     #####  ######     #            #     # ####### ####### #     # 
                                         #######                                 
*/
function JOIN_ROOM() {
    AFTER_JOIN_INTERFACE();
}

function LOGIN(e) {
    if (e.code === "Enter") {
        AFTER_LOGIN_INTERFACE();
        console.log($("#nickname").val());
        name = $("#nickname").val();
        socket.emit('new-user', name);
    }
}

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

function appendMessage(message) {
    const messageElement = document.createElement('p')
    messageElement.innerText = message
    messageContainer.append(messageElement);
}

/*
 ####### #######         ######  ####### 
    #    #     #         #     # #     # 
    #    #     #         #     # #     # 
    #    #     #         #     # #     # 
    #    #     #         #     # #     # 
    #    #     #         #     # #     # 
    #    #######         ######  ####### 
                 #######                 
*/
//functions

// function addTodo(event) {
//     event.preventDefault();
//     //todo DIV
//     const todoDiv = document.createElement('div');
//     todoDiv.classList.add('todo');
//     //todo LI 
//     const newTodo = document.createElement('li');
//     newTodo.innerText = todoInput.value;
//     newTodo.classList.add('todo_item');
//     todoDiv.appendChild(newTodo);
//     if(todoInput.value === ""){
//         return null
//     }
//     //check mark BUTTON
//     const completedButton = document.createElement('button');
//     completedButton.innerHTML = '<i class="fas fa-check"></i>';
//     completedButton.classList.add('complete_btn')
//     todoDiv.appendChild(completedButton);
//     //delete BUTTON
//     const deleteButton = document.createElement('button');
//     deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
//     deleteButton.classList.add('delete_btn')
//     todoDiv.appendChild(deleteButton);
//     //Append to Actual LIST
//     todoList.appendChild(todoDiv);
//     //Clear todo input VALUE
//     todoInput.value = ""
// }

// //DELETE & CHECK
// function deleteCheck(e) {
//     const item = e.target;
//     //DELETE ITEM
//     if (item.classList[0] === "delete_btn") {
//         const todo = item.parentElement;
//         //ANIMATION TRANSITION
//         todo.classList.add("fall")
//         todo.addEventListener('transitionend', function () {
//             todo.remove()
//         })
//     }
//     //COMPLETE ITEM
//     if (item.classList[0] === "complete_btn") {
//         const todo = item.parentElement;
//         todo.classList.toggle("completedItem")
//     }
// }
// //FILTERING THE TASKS ACCORDING THE OPTION
// function filterTodo(e) {
//     const todos = todoList.childNodes;
//     for(let i = 1; i<todos.length; i++ ){
//         switch (e.target.value) {
//             case "all":
//                 todos[i].style.display = "flex";
//                 break;
//             case "completed":
//                 if (todos[i].classList.contains('completedItem')) {
//                     todos[i].style.display = "flex";
//                 } else {
//                     todos[i].style.display = "none";
//                 }
//                 break;
//             case "uncompleted":
//                 if (!todos[i].classList.contains('completedItem')) {
//                     todos[i].style.display = "flex";
//                 } else {
//                     todos[i].style.display = "none";
//                 }
//                 break;
//         }
//     }
// } 

const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

const generateTemplate = (todo) => {
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;

  list.innerHTML += html;
};

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim();

  if (todo.length) {
    generateTemplate(todo);
    addForm.reset();
  }
});

// Delete Todos
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
   socket.emit('complete-task')
  }
});

socket.on('user-completed-task', name => {
    appendMessage(`${name} has just completed a task! `)
})


const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

//Keyup event
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});

