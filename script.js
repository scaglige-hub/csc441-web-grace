// Class 15: Step 1: this file is running
console.log("script.js is running");

// Class 15: Step 2: put this year in the footer
const yearSpan = document.querySelector("#year");
yearSpan.textContent = new Date().getFullYear();

// Class 15: Step 3: a button that changes the page
const themeButton = document.querySelector("#theme-toggle");

themeButton.addEventListener("click", function() {
    document.body.classList.toggle("dark");
});