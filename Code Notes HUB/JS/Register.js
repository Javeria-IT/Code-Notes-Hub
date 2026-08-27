/*========================================= CNH - Register JS ==========================================*/

// ========================== Get Elements ==========================

const registerForm = document.getElementById("registerForm");

const fullName = document.getElementById("fullname");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

// ========================== Show Hide Password ==========================

togglePassword.addEventListener("click", () => {

    if(password.type === "password"){

        password.type = "text";
        togglePassword.innerHTML =
        '<i class="fa-solid fa-eye-slash"></i>';

    }else{

        password.type = "password";
        togglePassword.innerHTML =
        '<i class="fa-solid fa-eye"></i>';

    }

});

toggleConfirmPassword.addEventListener("click", () => {

    if(confirmPassword.type === "password"){

        confirmPassword.type = "text";
        toggleConfirmPassword.innerHTML =
        '<i class="fa-solid fa-eye-slash"></i>';

    }else{

        confirmPassword.type = "password";
        toggleConfirmPassword.innerHTML =
        '<i class="fa-solid fa-eye"></i>';

    }

});

// ========================== Register Form ==========================

registerForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    let fullnameValue = fullName.value.trim();
    let usernameValue = username.value.trim();
    let emailValue = email.value.trim().toLowerCase();
    let passwordValue = password.value;
    let confirmValue = confirmPassword.value;

    // Validation

    if(fullnameValue.length < 3){

        alert("Full Name minimum 3 characters.");

        return;

    }

    if(usernameValue.length < 3){

        alert("Username minimum 3 characters.");

        return;

    }

    if(passwordValue.length < 6){

        alert("Password minimum 6 characters.");

        return;

    }

    if(passwordValue !== confirmValue){

        alert("Passwords do not match.");

        return;

    }

    if(!terms.checked){

        alert("Please accept Terms & Conditions.");

        return;

    }

    // ========================== Get Existing Users ==========================

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Email Exists

    let emailExists = users.find(user => user.email === emailValue);

    if(emailExists){

        alert("Email already registered.");

        return;

    }

    // Username Exists

    let usernameExists = users.find(user => user.username === usernameValue);

    if(usernameExists){

        alert("Username already taken.");

        return;

    }

    // ========================== Save User ========================== //

    let newUser = {

        fullname: fullnameValue,

        username: usernameValue,

        email: emailValue,

        password: passwordValue,

        bookmarks: [],

        progress: 0

    };

    users.push(newUser);

    localStorage.setItem("users",JSON.stringify(users));

    // Success

    alert("🎉 Registration Successful!");

    registerForm.reset();

    // Redirect

    setTimeout(()=>{

        window.location.href="login.html";

    },800);

});

// ========================== Input Focus Effect ==========================

const inputs = document.querySelectorAll("input");

inputs.forEach(input=>{

    input.addEventListener("focus",()=>{

        input.style.boxShadow =
        "0 0 15px rgba(59,130,246,.35)";

    });

    input.addEventListener("blur",()=>{

        input.style.boxShadow="none";

    });

});

const backBtn = document.getElementById("backBtn");

if(backBtn){

    backBtn.addEventListener("click", () => {
        window.location.href = "Index.html";
    });

}

// ========================== Console Message ==========================

console.log("%cRegister Page Loaded ",
"color:#22C55E;font-size:20px;font-weight:bold;");