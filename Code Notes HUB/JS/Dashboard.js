/* ==  CodeNotes Hub - Dashboard JS   == */

// ========================== Get Current User ==========================

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const welcome = document.getElementById("welcome");

if (!currentUser) {

    alert("Please login first!");

    window.location.href = "login.html";

}

// ========================== Dark Mode ==========================
// Handled globally by js/theme.js (shared across every page).

// ========================== Logout ==========================

const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click",()=>{

    if(confirm("Are you sure you want to logout?")){

        localStorage.removeItem("currentUser");

        alert("Logout Successful!");

        window.location.href="login.html";

    }

});

// ========================== Render Technology Cards ==========================

const techCardsWrap = document.getElementById("techCards");

function renderTechCards(){

    techCardsWrap.innerHTML = "";

    Object.keys(CNH.technologies).forEach(key=>{

        const tech = CNH.technologies[key];

        const pct = CNH.getProgressPercent(key);

        const done = CNH.getCompletedTopics(key).length;

        const card = document.createElement("div");

        card.className = "card";

        card.setAttribute("data-tech", key);

        card.innerHTML = `
            <i class="${tech.icon}"></i>
            <h3>${tech.name}</h3>
            <p>${tech.desc}</p>
            <div class="card-meta">
                <span>${done} / ${tech.topics.length} Topics</span>
                <span>${pct}%</span>
            </div>
            <div class="card-bar">
                <div class="card-bar-fill" style="width:${pct}%"></div>
            </div>
            <button>Start Learning →</button>
        `;

        card.querySelector("button").addEventListener("click",()=>{

            window.location.href = tech.page;

        });

        techCardsWrap.appendChild(card);

    });

}

renderTechCards();

// ========================== Render Per-Tech Progress List ==========================

function renderTechProgressList(){

    const wrap = document.getElementById("techProgressList");

    wrap.innerHTML = "";

    Object.keys(CNH.technologies).forEach(key=>{

        const tech = CNH.technologies[key];

        const pct = CNH.getProgressPercent(key);

        wrap.innerHTML += `
            <div class="tech-progress-item">
                <i class="${tech.icon}"></i>
                <span class="label">${tech.name}</span>
                <div class="bar-track">
                    <div class="bar-fill" style="width:${pct}%"></div>
                </div>
                <span class="pct">${pct}%</span>
            </div>
        `;

    });

}

renderTechProgressList();

// ========================== Stat Cards ==========================

function renderStats(){

    const completedTopics = Object.keys(CNH.technologies)
        .reduce((sum,key)=> sum + CNH.getCompletedTopics(key).length, 0);

    document.getElementById("statCompleted").innerText = completedTopics;

    document.getElementById("statBookmarks").innerText = CNH.getBookmarks().length;

    document.getElementById("statNotes").innerText = CNH.getPersonalNotes().length;

    document.getElementById("statProgress").innerText = CNH.getOverallProgress() + "%";

}

renderStats();

CNH.syncOverallProgress();

// ========================== Live Search ==========================//
// Filters technology cards AND jumps straight to a matching topic

const search = document.getElementById("search");

search.addEventListener("keyup",(e)=>{

    let value = search.value.toLowerCase().trim();

    document.querySelectorAll("#techCards .card").forEach(card=>{

        let text = card.innerText.toLowerCase();

        card.style.display = text.includes(value) ? "block" : "none";

    });

    if(e.key === "Enter" && value){

        const index = CNH.buildSearchIndex();

        const match = index.find(item=>

            item.title.toLowerCase().includes(value) ||
            item.techName.toLowerCase().includes(value)

        );

        if(match){

            window.location.href = match.page + "#" + match.topicId;

        }

    }

});

// ========================== Sidebar Active Menu ==========================

const menuItems = document.querySelectorAll(".sidebar li");

menuItems.forEach(item=>{

    item.addEventListener("click",()=>{

        menuItems.forEach(li=>{

            li.classList.remove("active");

        });

        item.classList.add("active");

    });

});

// ========================== Dashboard Animation ==========================//

window.addEventListener("load",()=>{

    const cards=document.querySelectorAll(".card,.progress-card");

    cards.forEach((card,index)=>{

        card.style.opacity="0";

        card.style.transform="translateY(30px)";

        setTimeout(()=>{

            card.style.transition=".6s";

            card.style.opacity="1";

            card.style.transform="translateY(0)";

        },index*80);

    });

});

// ========================== Welcome Message ==========================

const hour = new Date().getHours();

let greeting = "Hello";

if(hour < 12){

    greeting = "Good Morning";

}
else if(hour < 17){

    greeting = "Good Afternoon";

}
else{

    greeting = "Good Evening";

}

welcome.innerHTML = `${greeting}, ${currentUser.fullname} `;

console.log("%cDashboard Ready",
"color:#22C55E;font-size:20px;font-weight:bold;");
