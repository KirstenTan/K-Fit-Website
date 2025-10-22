hideContentOnScroll(1000);

/* Workout Plans */

// Get plan buttons and sections
let plan1Btn = document.getElementById("plan1-btn");
let plan2Btn = document.getElementById("plan2-btn");
let plan3Btn = document.getElementById("plan3-btn");
let plan4Btn = document.getElementById("plan4-btn");

let plan1Section = document.getElementById("plan1");
let plan2Section = document.getElementById("plan2");

// Display section when button is clicked
plan1Btn.addEventListener("click", function() {
    plan1Section.classList.add('active');
    plan2Section.classList.remove('active');
});

plan2Btn.addEventListener("click", function() {
    plan2Section.classList.add('active');
    plan1Section.classList.remove('active');
});

// Display alert when a 'coming soon' plan button is clicked
plan3Btn.addEventListener("click", function() {
    alert("Flow plan coming soon!");
});

plan4Btn.addEventListener("click", function() {
    alert("Cut plan coming soon!");
});