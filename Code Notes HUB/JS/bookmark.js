/* ========================================== CodeNotes Hub - Study Workspace========================================= */

// ========================== Back Button==========================

document.getElementById("backBtn").addEventListener("click", () => {

    window.location.href = "dashboard.html";

});

// ========================== Load Data ==========================

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let highlights = JSON.parse(localStorage.getItem("highlights")) || [];

const bookmarkList = document.getElementById("bookmarkList");
const favoriteList = document.getElementById("favoriteList");
const highlightList = document.getElementById("highlightList");

// ========================== Show Bookmarks==========================

 function loadBookmarks(){

    bookmarkList.innerHTML = "";

    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    if(bookmarks.length === 0){

        bookmarkList.innerHTML = "<p>No Bookmarks Yet.</p>";

        return;

    }

    bookmarks.forEach((title,index)=>{

        bookmarkList.innerHTML += `

        <div class="bookmark-item">

            <div>

                <h3> ${title}</h3>

            </div>

            <div>

                <button class="action-btn delete-btn"
                onclick="deleteBookmark(${index})">

                🗑 Delete

                </button>

            </div>

        </div>

        `;

    });

}

// ========================== Open Bookmark ==========================

function openBookmark(page,id){

    window.location.href = page + "#" + id;

}

// ========================== Delete Bookmark ==========================

function deleteBookmark(index){

    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    bookmarks.splice(index,1);

    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));

    loadBookmarks();

}

// ========================== Personal Notes ==========================

const notes=document.getElementById("personalNotes");

notes.value=localStorage.getItem("personalNotes") || "";

notes.addEventListener("input",()=>{

    localStorage.setItem("personalNotes",notes.value);

});

document.getElementById("saveNotes").addEventListener("click",()=>{

    localStorage.setItem("personalNotes",notes.value);

    alert("Notes Saved Successfully!");

});


/* ========================= TODO LISt========================== */

const todoInput = document.getElementById("todoInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const todoList = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos(){

    localStorage.setItem("todos", JSON.stringify(todos));

}

function loadTodos(){

    todoList.innerHTML = "";

    todos.forEach((task,index)=>{

        const li = document.createElement("li");

        li.className = "todo-item";

        if(task.completed){

            li.classList.add("completed");

        }

        li.innerHTML = `

            <span onclick="toggleTask(${index})">

                ${task.text}

            </span>

            <button class="delete-task"

            onclick="deleteTask(${index})">

                🗑

            </button>

        `;

        todoList.appendChild(li);

    });

}

addTaskBtn.addEventListener("click",()=>{

    const text = todoInput.value.trim();

    if(text==="") return;

    todos.push({

        text:text,

        completed:false

    });

    saveTodos();

    loadTodos();

    todoInput.value="";

});

function toggleTask(index){

    todos[index].completed = !todos[index].completed;

    saveTodos();

    loadTodos();

}

function deleteTask(index){

    todos.splice(index,1);

    saveTodos();

    loadTodos();

}

loadTodos();