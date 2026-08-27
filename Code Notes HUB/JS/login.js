const loginForm = document.getElementById("loginForm");
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

// ==========================
// Show / Hide Password
// ==========================

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        this.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';

    } else {

        password.type = "password";

        this.innerHTML = '<i class="fa-solid fa-eye"></i>';

    }

});
const backBtn = document.getElementById("backBtn");

if(backBtn){

    backBtn.addEventListener("click", () => {
        window.location.href = "Index.html";
    });

}
// ==========================
// Login
// ==========================

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const passwordValue = password.value.trim();

    if (email === "" || passwordValue === "") {

        alert("Please enter email and password.");

        return;

    }

    // Create current user
    const currentUser = {
        fullname: email.split("@")[0],
        email: email
    };

    // Save user in localStorage
    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );

    // Open Dashboard
    window.location.href = "dashboard.html";

});