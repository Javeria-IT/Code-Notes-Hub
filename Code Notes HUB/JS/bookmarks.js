/* ========================================== CodeNotes Hub - Notepad & Bookmarks ========================================= */

// ========================== Auth Guard ==========================

const workspaceUser = CNH.getCurrentUser();

if(!workspaceUser){

    alert("Please login first!");

    window.location.href = "login.html";

}

document.getElementById("logout").addEventListener("click", () => {

    if(confirm("Are you sure you want to logout?")){

        localStorage.removeItem("currentUser");

        window.location.href = "login.html";

    }

});

// ========================== Bookmarks ==========================

const bookmarkList = document.getElementById("bookmarkList");

function loadBookmarks(){

    const bookmarks = CNH.getBookmarks();

    if(bookmarks.length === 0){

        bookmarkList.innerHTML = "<p>No bookmarks yet. Bookmark a topic from any notes page!</p>";

        return;

    }

    bookmarkList.innerHTML = "";

    bookmarks.forEach((title,index)=>{

        bookmarkList.innerHTML += `

        <div class="bookmark-item">

            <div class="bookmark-title"><i class="fa-solid fa-bookmark"></i> ${title}</div>

            <div>
                <button class="action-btn delete-btn" onclick="deleteBookmark(${index})">🗑 Remove</button>
            </div>

        </div>

        `;

    });

}

function deleteBookmark(index){

    let bookmarks = CNH.getBookmarks();

    bookmarks.splice(index,1);

    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));

    loadBookmarks();

}

loadBookmarks();

/* ========================= PERSONAL NOTEPAD (multi-note CRUD) ========================== */

const noteForm = document.getElementById("noteForm");
const noteIdInput = document.getElementById("noteId");
const noteTitleInput = document.getElementById("noteTitle");
const noteContentInput = document.getElementById("noteContent");
const notesList = document.getElementById("notesList");
const noteSearch = document.getElementById("noteSearch");
const newNoteBtn = document.getElementById("newNoteBtn");
const cancelNoteBtn = document.getElementById("cancelNoteBtn");

function getNotes(){
    return JSON.parse(localStorage.getItem("myNotes")) || [];
}

function saveNotes(notes){
    localStorage.setItem("myNotes", JSON.stringify(notes));
}

function openNoteForm(note){

    noteForm.style.display = "flex";

    if(note){

        noteIdInput.value = note.id;
        noteTitleInput.value = note.title;
        noteContentInput.value = note.content;

    }else{

        noteIdInput.value = "";
        noteTitleInput.value = "";
        noteContentInput.value = "";

    }

    noteTitleInput.focus();

}

function closeNoteForm(){

    noteForm.style.display = "none";

    noteForm.reset();

}

newNoteBtn.addEventListener("click", ()=> openNoteForm(null));

cancelNoteBtn.addEventListener("click", closeNoteForm);

noteForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const title = noteTitleInput.value.trim();

    const content = noteContentInput.value.trim();

    if(!title || !content) return;

    let notes = getNotes();

    const id = noteIdInput.value;

    if(id){

        // Edit existing note

        notes = notes.map(n => n.id === id ? { ...n, title, content, updated: new Date().toLocaleString() } : n);

    }else{

        // Create new note

        notes.unshift({

            id: "note_" + Date.now(),
            title,
            content,
            created: new Date().toLocaleString(),
            updated: new Date().toLocaleString()

        });

    }

    saveNotes(notes);

    closeNoteForm();

    renderNotes();

});

function deleteNote(id){

    if(!confirm("Delete this note?")) return;

    const notes = getNotes().filter(n => n.id !== id);

    saveNotes(notes);

    renderNotes();

}

function editNote(id){

    const note = getNotes().find(n => n.id === id);

    if(note) openNoteForm(note);

}

function renderNotes(){

    const query = (noteSearch.value || "").toLowerCase().trim();

    let notes = getNotes();

    if(query){

        notes = notes.filter(n =>
            n.title.toLowerCase().includes(query) ||
            n.content.toLowerCase().includes(query)
        );

    }

    if(notes.length === 0){

        notesList.innerHTML = `<p class="empty-msg">${query ? "No notes match your search." : "No notes yet. Click \"+ New Note\" to write your first one."}</p>`;

        return;

    }

    notesList.innerHTML = notes.map(note => `

        <div class="note-card">

            <div class="note-card-header">
                <h3>${escapeHtml(note.title)}</h3>
                <div class="note-card-actions">
                    <button onclick="editNote('${note.id}')" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button onclick="deleteNote('${note.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>

            <p>${escapeHtml(note.content)}</p>

            <span class="note-date">Updated ${note.updated}</span>

        </div>

    `).join("");

}

function escapeHtml(str){

    const div = document.createElement("div");

    div.innerText = str;

    return div.innerHTML;

}

noteSearch.addEventListener("keyup", renderNotes);

renderNotes();

/* ========================= TODO LIST ========================== */

const todoInput = document.getElementById("todoInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const todoList = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos(){

    localStorage.setItem("todos", JSON.stringify(todos));

}

function loadTodos(){

    todoList.innerHTML = "";

    if(todos.length === 0){

        todoList.innerHTML = "<p class='empty-msg'>No tasks yet. Add one above!</p>";

        return;

    }

    todos.forEach((task,index)=>{

        const li = document.createElement("li");

        li.className = "todo-item";

        if(task.completed){

            li.classList.add("completed");

        }

        li.innerHTML = `

            <span onclick="toggleTask(${index})">${escapeHtml(task.text)}</span>

            <button class="delete-task" onclick="deleteTask(${index})">🗑</button>

        `;

        todoList.appendChild(li);

    });

}

addTaskBtn.addEventListener("click",()=>{

    const text = todoInput.value.trim();

    if(text==="") return;

    todos.push({ text, completed:false });

    saveTodos();

    loadTodos();

    todoInput.value="";

});

todoInput.addEventListener("keyup", (e)=>{

    if(e.key === "Enter") addTaskBtn.click();

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
