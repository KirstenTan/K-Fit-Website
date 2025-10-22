// Current user data structure with default values
let currentUser = {
    bio: '',
    firstName: '',
    lastName: '',
    birthday: null,
    gender: null,
    email: '',
    number: 0,
    password: '',
    newsletter: false,
    discounts: false,
    membership: '',
    totalSteps: 0,
    totalWater: 0,
    exerciseLog: [],
    loggedIn: false
};

// Regex patterns for validation
const validationPatterns = {
    name: /^[a-zA-Z\s]{2,50}$/, // 2-50 letters or spaces,
    phone: /^(?:\+44\s?7\d{3}\s?\d{6}|07\d{9})$/, // UK mobile format: +44 7000 000000
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/, // Email format with required domain
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ // Min 8 characters, at least 1 letter and 1 number
};

// Form field requirements
const formRequirements = {
    'personal-details-form': ['firstName', 'lastName', 'number', 'email', 'password'],
    'signup-form': ['firstName', 'lastName', 'number', 'email', 'password'],
    'login-form': ['email', 'password'],
    'contact-form': ['firstName', 'lastName', 'email']
};

// Check log in status and initialise webpage
$(document).ready(function() {
    let isLoggedIn = JSON.parse(localStorage.getItem('loggedIn')) || false;

    // If user is not logged in, create an empty currentUser object
    if (!isLoggedIn) {
        Object.keys(currentUser).forEach(key => localStorage.setItem(key, currentUser[key]));
    }

    // Toggle display of signup/login link and logout button
    $('#membership-link').toggle(!isLoggedIn);
    $('#logout-button').toggle(isLoggedIn);
});

// Logout function
function logout() {
    localStorage.setItem('loggedIn', false);
    window.location.href = 'membership.html';
}

// Hide content if user is not logged in
function hideContent() {
    if (!isUserLoggedIn()) {
        // Show signup modal and prevent user from scrolling down
        new bootstrap.Modal(document.getElementById('signup-modal')).show();
    }
}

// Hide content on scroll if user is not logged in
let lastScrollPosition = 0;
function hideContentOnScroll(maxScroll) {
    if (!isUserLoggedIn()) {
        window.onscroll = function() {
            let isScrollDown = lastScrollPosition < document.documentElement.scrollTop;

            // Show modal after user scrolls down a certain amount
            if(isScrollDown && (document.body.scrollTop > maxScroll || document.documentElement.scrollTop > maxScroll)) {
                let signupModal = new bootstrap.Modal(document.getElementById('signup-modal'));
                signupModal.show();
            }

            lastScrollPosition = document.documentElement.scrollTop;
        }
    }
}

// Set up scroll-to-top button
    const scrollBtn = document.getElementById('scroll-btn');

    // Show button when user scrolls more than 20px
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    }

// Scroll-to-top function
function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

/* Validate forms 
    1. Validates user input in different forms
    
    @param {string} formType - The ID/type of form to validate
    @returns {boolean} - Returns true if all inputs are valid, otherwise returns false
*/
function validateForm(formType) {
    const inputTypes = formRequirements[formType] || formType;
    let isValid = true;

    inputTypes.forEach(inputType => {
        if (!validateInput(inputType, formType)) {
            isValid = false;
            const fieldName = inputType.replace(/([A-Z])/g, ' $1').toLowerCase();
            alert(`Please enter a valid ${fieldName}.`);
        }
    });

    return isValid;
}

/* Validate inputs
    1. Validates a single input field against specific reguglar expression patterns.

        @param {string} inputClass - The class name of the input field to validate
        @param {string} formId - The ID of the parent form
        @returns {boolean} - Returns true if input is valid, otherwise returns false
*/
function validateInput(inputClass, formId) {
    const inputElement = document.getElementById(formId).querySelector(`.${inputClass}`);
    const value = inputElement.value.trim();
    let isValid

    switch (inputClass) {
        case 'firstName':
        case 'lastName': return validationPatterns.name.test(value); break;
        case 'number': return validationPatterns.phone.test(value); break;
        case 'email': return validationPatterns.email.test(value); break;
        case 'password': return validationPatterns.password.test(value); break;
    }
}

// Get started function
function getStarted() {
    const email = $('#join-email').val();
    localStorage.setItem('email', email);
    window.location.href = 'membership.html';
}

// Helper function
function isUserLoggedIn() {
    console.log(JSON.parse(localStorage.getItem('loggedIn')));
    return JSON.parse(localStorage.getItem('loggedIn'));
}