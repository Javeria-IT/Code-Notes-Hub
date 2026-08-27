/* ================= CodeNotes Hub - Quiz Engine ================= */

const currentUserQuiz = JSON.parse(localStorage.getItem("currentUser"));

if(!currentUserQuiz){

    alert("Please login first!");

    window.location.href = "login.html";

}

// ========================== Logout ==========================

document.getElementById("logout").addEventListener("click", () => {

    if(confirm("Are you sure you want to logout?")){

        localStorage.removeItem("currentUser");

        window.location.href = "login.html";

    }

});

// ========================== State ==========================

let activeTech = (window.location.hash || "#html").replace("#","");

if(!CNH.technologies[activeTech]) activeTech = "html";

let userAnswers = [];

// ========================== Render Tabs ==========================

function renderTabs(){

    const tabsWrap = document.getElementById("quizTabs");

    tabsWrap.innerHTML = "";

    Object.keys(CNH.technologies).forEach(key=>{

        const tech = CNH.technologies[key];

        const tab = document.createElement("button");

        tab.className = "quiz-tab" + (key === activeTech ? " active" : "");

        tab.innerHTML = `<i class="${tech.icon}"></i> ${tech.name}`;

        tab.addEventListener("click", ()=>{

            activeTech = key;

            window.location.hash = key;

            renderTabs();

            renderQuiz();

        });

        tabsWrap.appendChild(tab);

    });

}

// ========================== Render Quiz ==========================

function renderQuiz(){

    document.getElementById("quizResult").style.display = "none";

    const container = document.getElementById("quizContainer");

    container.style.display = "block";

    const questions = CNH.quizzes[activeTech];

    userAnswers = new Array(questions.length).fill(null);

    container.innerHTML = "";

    questions.forEach((q, qIndex)=>{

        const qCard = document.createElement("div");

        qCard.className = "quiz-question";

        qCard.innerHTML = `
            <h3>${qIndex + 1}. ${q.q}</h3>
            <div class="quiz-options" data-q="${qIndex}">
                ${q.options.map((opt, oIndex) => `
                    <label class="quiz-option">
                        <input type="radio" name="q${qIndex}" value="${oIndex}">
                        <span>${opt}</span>
                    </label>
                `).join("")}
            </div>
        `;

        container.appendChild(qCard);

    });

    container.querySelectorAll("input[type=radio]").forEach(input=>{

        input.addEventListener("change", (e)=>{

            const qIndex = parseInt(e.target.closest(".quiz-options").getAttribute("data-q"));

            userAnswers[qIndex] = parseInt(e.target.value);

        });

    });

    const submitBtn = document.createElement("button");

    submitBtn.className = "quiz-submit";

    submitBtn.innerText = "Submit Quiz";

    submitBtn.addEventListener("click", submitQuiz);

    container.appendChild(submitBtn);

}

// ========================== Submit / Score ==========================

function submitQuiz(){

    const questions = CNH.quizzes[activeTech];

    if(userAnswers.includes(null)){

        alert("Please answer every question before submitting.");

        return;

    }

    let score = 0;

    document.querySelectorAll(".quiz-options").forEach((optsWrap, qIndex)=>{

        const correct = questions[qIndex].correct;

        const labels = optsWrap.querySelectorAll(".quiz-option");

        labels.forEach((label, oIndex)=>{

            label.classList.remove("correct","incorrect");

            if(oIndex === correct){

                label.classList.add("correct");

            } else if(oIndex === userAnswers[qIndex]){

                label.classList.add("incorrect");

            }

        });

        if(userAnswers[qIndex] === correct) score++;

    });

    CNH.saveQuizScore(activeTech, score, questions.length);

    setTimeout(()=>{

        document.getElementById("resultScore").innerText =
            `Your Score: ${score} / ${questions.length}`;

        const pct = Math.round((score/questions.length)*100);

        let message = "Keep practicing - you'll get there!";

        if(pct === 100) message = "Perfect score! 🎉";

        else if(pct >= 70) message = "Great job! 👏";

        else if(pct >= 40) message = "Good effort, review the topic and try again.";

        document.getElementById("resultMessage").innerText = message;

        document.getElementById("quizResult").style.display = "block";

        document.getElementById("quizResult").scrollIntoView({ behavior:"smooth" });

    }, 600);

}

document.getElementById("retryBtn").addEventListener("click", renderQuiz);

renderTabs();
renderQuiz();
