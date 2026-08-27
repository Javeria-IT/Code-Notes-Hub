/* ==========================================
   CodeNotes Hub - app.js
   Author: Javeria Mehboob
========================================== */

// ================================ Page Loaded================================//

window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});

// ================================ Smooth Scroll ================================//

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});

// ================================ Active Navbar Link================================//

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.forEach(item=>{
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});


// ====================Reveal Animation On Scroll====================//

const cards = document.querySelectorAll(".card,.feature-box div");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";
            entry.target.style.transform="translateY(0)";

        }

    });

},{
    threshold:0.2
});

cards.forEach(card=>{

    card.style.opacity="0";
    card.style.transform="translateY(50px)";
    card.style.transition=".7s";

    observer.observe(card);

});

// ================================ Button Hover Effect===================//


const buttons=document.querySelectorAll("button,.primary-btn,.secondary-btn");

buttons.forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.boxShadow="0 10px 25px rgba(59,130,246,.4)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.boxShadow="none";

    });

});

// ================================ Hero Icon Animation ================================ //

if(heroIcon){

setInterval(()=>{

heroIcon.classList.toggle("fa-beat");

setTimeout(()=>{

heroIcon.classList.remove("fa-beat");

},1000);

},3000);

}

// ================================ Read Notes Buttons ================================//

const readButtons=document.querySelectorAll(".card button");

readButtons.forEach(button=>{

button.addEventListener("click",()=>{

alert("📚 Notes page will be added in the next part.");

});

});

// ================================ Navbar Shadow On Scroll ================================//

const header=document.querySelector("header");

window.addEventListener("scroll",()=>{

if(window.scrollY>40){

header.style.boxShadow="0 8px 20px rgba(0,0,0,.3)";

}else{

header.style.boxShadow="none";

}

});

// ================================Typing Effect================================//

const heading=document.querySelector(".hero h1");

if(heading){

const text=heading.innerText;

heading.innerText="";

let index=0;

function typing(){

if(index<text.length){

heading.innerHTML+=text.charAt(index);

index++;

setTimeout(typing,45);

}

}

typing();

}

// ===========Console Message=================//

console.log("%cWelcome to CodeNotes Hub 🚀",
"color:#3B82F6;font-size:22px;font-weight:bold;");

console.log("Made with HTML, CSS & JavaScript ❤️");