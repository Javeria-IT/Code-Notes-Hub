/*=========================================   CodeNotes Hub - Notes Reader JS ====================================*/
/* Works on any notes page: html-notes.html, css-notes.html, js-notes.html,
   react-notes.html, tailwind-notes.html - as long as the page has:
   <body data-tech="html">, a .sidebar with anchor links, and <section id="..."> blocks. */

const TECH = document.body.getAttribute("data-tech") || "html";

const PAGE_KEY = "highlights_" + (CNH ? CNH.technologies[TECH]?.page || TECH : TECH);

const sections = document.querySelectorAll("section[id]");

// ========================== Restore Saved Highlights (must run first) ==========================

function restoreHighlights(){

    const saved = JSON.parse(localStorage.getItem(PAGE_KEY)) || {};

    sections.forEach(section=>{

        const id = section.getAttribute("id");

        if(saved[id]){

            section.innerHTML = saved[id];

        }

    });

}

restoreHighlights();

function saveHighlightSnapshot(section){

    const clone = section.cloneNode(true);

    clone.querySelectorAll(".cnh-ui").forEach(el => el.remove());

    const saved = JSON.parse(localStorage.getItem(PAGE_KEY)) || {};

    saved[section.getAttribute("id")] = clone.innerHTML;

    localStorage.setItem(PAGE_KEY, JSON.stringify(saved));

}

// ========================== Search Topics ==========================

const search = document.getElementById("searchTopic");

if(search){

    search.addEventListener("keyup", () => {

        const value = search.value.toLowerCase();

        sections.forEach(section => {

            const text = section.innerText.toLowerCase();

            section.style.display = text.includes(value) ? "block" : "none";

        });

    });

}

// ==========================Copy Code Button ==========================

const codeBlocks = document.querySelectorAll("pre");

codeBlocks.forEach((block)=>{

    if(block.querySelector(".copy-btn")) return; // already added (e.g. restored)

    const button = document.createElement("button");

    button.innerText = "📋 Copy";

    button.classList.add("copy-btn","cnh-ui");

    block.appendChild(button);

    button.addEventListener("click",()=>{

        navigator.clipboard.writeText(
            block.innerText.replace("📋 Copy","").replace("✅ Copied","")
        );

        button.innerText="✅ Copied";

        // small toast

        showToast("Code copied successfully!");

        setTimeout(()=>{

            button.innerText="📋 Copy";

        },1500);

    });

});

// ========================== Small Toast Notification ==========================

function showToast(message){

    let toast = document.getElementById("cnhToast");

    if(!toast){

        toast = document.createElement("div");

        toast.id = "cnhToast";

        document.body.appendChild(toast);

    }

    toast.innerText = message;

    toast.classList.add("show");

    clearTimeout(toast._hideTimer);

    toast._hideTimer = setTimeout(()=>{

        toast.classList.remove("show");

    },1800);

}

// ========================== Reading Progress Bar ==========================

let progress = document.getElementById("progressBar");

if(!progress){

    progress = document.createElement("div");

    progress.id = "progressBar";

    document.body.appendChild(progress);

}

window.addEventListener("scroll",()=>{

    let totalHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

    let progressHeight =
    (window.pageYOffset/totalHeight)*100;

    progress.style.width = progressHeight + "%";

});

// ========================== Back To Top Button ==========================

let topBtn = document.getElementById("topBtn");

if(!topBtn){

    topBtn = document.createElement("button");

    topBtn.innerHTML="⬆";

    topBtn.id="topBtn";

    document.body.appendChild(topBtn);

}

window.addEventListener("scroll",()=>{

    topBtn.style.display = window.scrollY>400 ? "block" : "none";

});

topBtn.onclick=()=>{

    window.scrollTo({ top:0, behavior:"smooth" });

};

// ========================== Active Sidebar Link ==========================

const links=document.querySelectorAll(".sidebar a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-120;

        if(window.scrollY>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    links.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")=="#"+current){

            link.classList.add("active");

        }

    });

});

// ========================== Bookmark + Mark Complete per Topic ==========================

sections.forEach(section=>{

    if(section.querySelector(".topic-toolbar")) return; // already added (restored highlight)

    const toolbar = document.createElement("div");

    toolbar.className = "topic-toolbar cnh-ui";

    const sectionId = section.getAttribute("id");

    const titleEl = section.querySelector("h2");

    const title = titleEl ? titleEl.innerText : sectionId;

    const isBookmarked = CNH.getBookmarks().includes(title);

    const isComplete = CNH.isTopicComplete(TECH, sectionId);

    toolbar.innerHTML = `
        <button class="bookmark-btn">${isBookmarked ? "🔖 Bookmarked" : "🔖 Bookmark"}</button>
        <label class="complete-check">
            <input type="checkbox" ${isComplete ? "checked" : ""}>
            Mark as Completed
        </label>
    `;

    section.appendChild(toolbar);

    const bookmarkBtn = toolbar.querySelector(".bookmark-btn");

    bookmarkBtn.addEventListener("click",()=>{

        let bookmarks = CNH.getBookmarks();

        if(!bookmarks.includes(title)){

            bookmarks.push(title);

            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

            bookmarkBtn.innerText = "🔖 Bookmarked";

            showToast(title + " bookmarked!");

        }else{

            bookmarks = bookmarks.filter(b => b !== title);

            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

            bookmarkBtn.innerText = "🔖 Bookmark";

            showToast("Bookmark removed.");

        }

    });

    const checkbox = toolbar.querySelector("input[type=checkbox]");

    checkbox.addEventListener("change",()=>{

        const nowComplete = CNH.toggleTopicComplete(TECH, sectionId);

        showToast(nowComplete ? "Marked as completed ✅" : "Marked as incomplete");

    });

});

// ====================== Dashboard Back button =============//

const backBtn = document.getElementById("backBtn");

if(backBtn){

    backBtn.addEventListener("click", () => {
        window.location.href = "dashboard.html";
    });

}

/* ==========================================================
   TEXT HIGHLIGHTER
   Select text inside a <section> -> a small toolbar appears
   -> pick a color (or remove existing highlight).
========================================================== */

const highlightToolbar = document.createElement("div");

highlightToolbar.id = "highlightToolbar";

highlightToolbar.innerHTML = `
    <button data-color="yellow" title="Yellow"></button>
    <button data-color="green" title="Green"></button>
    <button data-color="blue" title="Blue"></button>
    <button data-color="pink" title="Pink"></button>
    <button data-color="remove" title="Remove Highlight">✕</button>
`;

document.body.appendChild(highlightToolbar);

let activeSectionForHighlight = null;

document.addEventListener("mouseup", (e)=>{

    // Clicking inside the toolbar itself shouldn't close it early
    if(highlightToolbar.contains(e.target)) return;

    const selection = window.getSelection();

    const text = selection.toString().trim();

    if(!text){

        highlightToolbar.style.display = "none";

        return;

    }

    const anchorNode = selection.anchorNode;

    const section = anchorNode ? anchorNode.parentElement.closest("section[id]") : null;

    if(!section){

        highlightToolbar.style.display = "none";

        return;

    }

    activeSectionForHighlight = section;

    const range = selection.getRangeAt(0);

    const rect = range.getBoundingClientRect();

    highlightToolbar.style.top = (window.scrollY + rect.top - 48) + "px";

    highlightToolbar.style.left = (window.scrollX + rect.left) + "px";

    highlightToolbar.style.display = "flex";

});

highlightToolbar.addEventListener("mousedown", (e)=>{

    // prevent the browser from clearing the text selection before our click fires
    e.preventDefault();

});

highlightToolbar.addEventListener("click", (e)=>{

    const btn = e.target.closest("button");

    if(!btn || !activeSectionForHighlight) return;

    const color = btn.getAttribute("data-color");

    const selection = window.getSelection();

    if(color === "remove"){

        // remove highlight marks that are fully inside the current selection area
        if(selection.rangeCount){

            const range = selection.getRangeAt(0);

            const container = range.commonAncestorContainer.nodeType === 1
                ? range.commonAncestorContainer
                : range.commonAncestorContainer.parentElement;

            container.querySelectorAll("mark.cnh-highlight").forEach(mark=>{

                const parent = mark.parentNode;

                while(mark.firstChild) parent.insertBefore(mark.firstChild, mark);

                parent.removeChild(mark);

            });
        }

    } else if(selection.rangeCount){

        try{

            const range = selection.getRangeAt(0);

            const mark = document.createElement("mark");

            mark.className = "cnh-highlight cnh-" + color;

            range.surroundContents(mark);

        }catch(err){

            showToast("Please select text within a single paragraph.");

        }
    }

    saveHighlightSnapshot(activeSectionForHighlight);

    // Re-render UI on that section (buttons were removed by the innerHTML swap on restore,
    // but since we only touched text nodes here, existing buttons remain intact)

    selection.removeAllRanges();

    highlightToolbar.style.display = "none";

});

// ========================== Welcome ==========================

console.log("%c" + (CNH.technologies[TECH]?.name || "Notes") + " Notes Loaded ",
"color:#3B82F6;font-size:20px;font-weight:bold;");
