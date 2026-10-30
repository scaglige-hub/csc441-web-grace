// Class 15: Step 1: this file is running
console.log("script.js is running");

// Class 15: Step 2: put this year in the footer
const yearSpan = document.querySelector("#year");

// Lab 15: Task 2: make each piece stand on its own
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Class 15: Step 3: a button that changes the page
const themeButton = document.querySelector("#theme-toggle");

if (themeButton) {
    // Lab 15 · Task 4: use the saved choice on arrival
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        themeButton.textContent = "Light";
    }
    // Lab 15 · Task 3 and 4: the label swaps, and the choice is remembered
    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark");
        if (document.body.classList.contains("dark")) {
            themeButton.textContent = "Light";
            localStorage.setItem("theme", "dark");
        } else {
            themeButton.textContent = "Dark";
            localStorage.setItem("theme", "light");
        }
    });
}

// Lab 15: Task 5: One more thing that reacts
const projectCount = document.querySelector("#projects");
if (projectCount) {
    projectCount.textContent = document.querySelectorAll(".card").length;
}