/* ================= CodeNotes Hub - Profile JS ================= */

const user = CNH.getCurrentUser();

if(!user){

    alert("Please login first!");

    window.location.href = "login.html";

}

document.getElementById("logout").addEventListener("click", () => {

    if(confirm("Are you sure you want to logout?")){

        localStorage.removeItem("currentUser");

        window.location.href = "login.html";

    }

});

// ========================== Basic Info ==========================

function initials(name){

    return name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();

}

function renderBasicInfo(){

    document.getElementById("profileName").innerText = user.fullname;

    document.getElementById("profileEmail").innerText = user.email;

    document.getElementById("avatar").innerText = initials(user.fullname);

}

renderBasicInfo();

// ========================== Edit Profile ==========================

const editBtn = document.getElementById("editProfileBtn");

const editForm = document.getElementById("editProfileForm");

const editFullname = document.getElementById("editFullname");

const editUsername = document.getElementById("editUsername");

editBtn.addEventListener("click", ()=>{

    editFullname.value = user.fullname;

    editUsername.value = user.username;

    editForm.style.display = editForm.style.display === "flex" ? "none" : "flex";

});

editForm.addEventListener("submit", (e)=>{

    e.preventDefault();

    const newFullname = editFullname.value.trim();

    const newUsername = editUsername.value.trim();

    if(newFullname.length < 3 || newUsername.length < 3){

        alert("Name and Username must be at least 3 characters.");

        return;

    }

    CNH.updateCurrentUser({ fullname: newFullname, username: newUsername });

    user.fullname = newFullname;

    user.username = newUsername;

    renderBasicInfo();

    editForm.style.display = "none";

});

// ========================== Stats ==========================

function renderStats(){

    document.getElementById("statOverall").innerText = CNH.getOverallProgress() + "%";

    const topicsCompleted = Object.keys(CNH.technologies)
        .reduce((sum,key)=> sum + CNH.getCompletedTopics(key).length, 0);

    document.getElementById("statTopics").innerText = topicsCompleted;

    document.getElementById("statBookmarksP").innerText = CNH.getBookmarks().length;

    document.getElementById("statNotesP").innerText = CNH.getPersonalNotes().length;

    const scores = CNH.getQuizScores();

    document.getElementById("statQuizCount").innerText = scores.length;

    if(scores.length){

        const avgPct = Math.round(
            scores.reduce((sum,s)=> sum + (s.score/s.total*100), 0) / scores.length
        );

        document.getElementById("statQuizAvg").innerText = avgPct + "%";

    }

}

renderStats();

// ========================== Progress by Technology ==========================

function renderTechProgress(){

    const wrap = document.getElementById("profileTechList");

    wrap.innerHTML = "";

    Object.keys(CNH.technologies).forEach(key=>{

        const tech = CNH.technologies[key];

        const pct = CNH.getProgressPercent(key);

        wrap.innerHTML += `
            <div class="progress-row">
                <i class="${tech.icon}"></i>
                <span class="label">${tech.name}</span>
                <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
                <span class="pct">${pct}%</span>
            </div>
        `;

    });

}

renderTechProgress();

// ========================== Bookmarked Topics ==========================

function renderBookmarks(){

    const wrap = document.getElementById("profileBookmarkList");

    const bookmarks = CNH.getBookmarks();

    if(bookmarks.length === 0){

        wrap.innerHTML = "<p class='empty-msg'>No bookmarks yet. Bookmark topics from any notes page!</p>";

        return;

    }

    wrap.innerHTML = bookmarks.map(title => `
        <div class="bookmark-chip"><i class="fa-solid fa-bookmark"></i> ${title}</div>
    `).join("");

}

renderBookmarks();
