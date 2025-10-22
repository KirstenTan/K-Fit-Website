// Variables
let membershipPlan = null;
let currentPage = "signup";

// Elements
const signupForm = $('#signup-form');
const loginForm = $('#login-form');
const switchBtn = $('#switch-btn');
const switchQuestion = $('#switch-question');
const signupSuccessMsg = $('#signup-success-msg');
const signupSubmitBtn = $('#signup-submit-button');
const loginSubmitBtn = $('#login-submit-button');
const signupEmail = $('#signup-email');
const membershipOptions = $('.membership-plan');

// Initial setup
signupSuccessMsg.hide();
loginForm.hide();

// Autofill email from footer 'Join Us'
if (localStorage.email) {
    signupEmail.val(localStorage.email);
    localStorage.email = '';
}

// Toggle between signup/login
switchBtn.on('click', function () {
    const isSignup = (currentPage === "signup");

    signupForm.toggle(!isSignup);
    loginForm.toggle(isSignup);
    switchQuestion.html(isSignup ? "Don't have an account?" : "Already have an account?");
    switchBtn.html(isSignup ? "Sign Up" : "Log In");

    currentPage = isSignup ? "login" : "signup";
});

// Membership plan selection
membershipOptions.on('click', function () {
    membershipPlan = $(this).data('value');
    $(this).siblings().removeClass('focused');
    $(this).addClass('focused');
});

// Handle signup submission
signupSubmitBtn.on('click', function () {
    const isValid = validateForm('signup-form');
    if (!isValid || membershipPlan === null) {
        if (membershipPlan === null) {
            alert("Please select a membership plan.");
        }
        console.log("Validation failed.");
        return;
    }

    saveSignUpData();
    signupForm.hide();
    switchBtn.hide();
    switchQuestion.hide();
    signupSuccessMsg.show();
});

// Handle login submission
loginSubmitBtn.on('click', function () {
    if (validateForm('login-form')) {
        saveLogInData();
    } else {
        console.log("Validation failed.");
    }
});

/* Saves signup data 
    1. Gets values from input fields
    2. Checks for duplicate emails
    3. Adds account daya to user records in local storage
*/
function saveSignUpData() {
    // Get values from input fields
    const user = {
        firstName: $('#signup-firstName').val(),
        lastName: $('#signup-lastName').val(),
        birthday: $('#signup-birthday').val(),
        gender: $('input[name="gender"]:checked').val(),
        email: $('#signup-email').val(),
        number: $('#signup-number').val(),
        password: $('#signup-password').val(),
        newsletter: $('#signup-newsletter').is(':checked'),
        discounts: $('#signup-discounts').is(':checked'),
        membership: membershipPlan,
        bio: '',
        totalSteps: 0,
        totalWater: 0,
        exerciseLog: [],
        loggedIn: false
    };

    // Get user records from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check for duplicate emails
    const isDuplicate = users.some(u => u.email === user.email);
    if (isDuplicate) {
        alert("This email is already linked to an account.");
        return;
    }

    // Add new account details to user records
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}

/* Saves login data
    1. Gets values from input fields
    2. Validates credentials
*/
function saveLogInData() {
    // Get values from input fields
    const email = $('#login-email').val();
    const password = $('#login-password').val();

    // Get user records from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    // Validate credentials
    if (user) {
        alert("Login successful!");
        for (let key in user) {
            localStorage.setItem(key, user[key]);
        }
        localStorage.setItem('loggedIn', JSON.stringify(true));
        window.location.href = "profile-dashboard.html";
    } else {
        alert("Login failed. Invalid email or password.");
    }
}

/* Resets and toggles signup form */
function toggleSwitch() {
    signupSuccessMsg.hide();
    signupForm[0].reset();
    switchBtn.show();
    switchQuestion.show();
    switchBtn.click();
}