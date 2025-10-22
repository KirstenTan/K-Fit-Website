$('#profile-dashboard').hide();

// Display page based on login status
$(document).ready(function() {
    // Get login status from localStorage
    let isLoggedIn = localStorage.getItem('loggedIn');

    if (isLoggedIn !== null && isLoggedIn !== "") {
        isLoggedIn = JSON.parse(isLoggedIn);
    }

    // Check if user is logged in
    if (isLoggedIn) {
        // If user is logged in, display profile dashboard
        $('#profile-dashboard').show();

        // Load all user details from localStorage into the currentUser object
        for (var key in currentUser) {
            var storedValue = localStorage.getItem(key);

            // Convert stored string values back to original data types and load details into the input fields
            if (typeof currentUser[key] === 'boolean') {
                currentUser[key] = (storedValue === 'true');
                $('#' + key).prop('checked', currentUser[key]);
            } else {
                currentUser[key] = storedValue;
                $('#' + key).val(currentUser[key]);
            }
        }

        // Handle special cases
        $('#name').html(currentUser.firstName);
        $('#membership').html(currentUser.membership);
        $(`input[name="gender"][value="${currentUser.gender}"]`).prop('checked', true);
    } else {
        hideContent();
    }
});

/* Toggles profile editing mode and handles saving upon button click
    1. Enables/disables form sections
    2. Switches button text between "Edit" and "Save"
    3. Validates data before saving
*/
function editProfile() {
    let bioForm = document.getElementById('bio-fieldset');
    let personalDetailsForm = document.getElementById('personal-details-fieldset');

    if (validateForm('personal-details-form')) {
        // Toggle disabled state of form sections
        bioForm.disabled = !bioForm.disabled;
        personalDetailsForm.disabled = !personalDetailsForm.disabled;

        // Check if form is in edit mode
        if (!bioForm.disabled) {
            $('#edit-button').html('Save Changes');
        } 
        // If form is in save mode, save changes
        else {
            saveUserData();
            $('#edit-button').html('Edit Profile');
        }
    }
}

/* Saves all user data to localStorage
    1. Updates currentUser object with form values
    2. Updates data to localStorage
    3. Updates user record in the 'users' array
*/
function saveUserData() {
    // Get all user records from localStorage
    let userRecords = new Array();
    userRecords = JSON.parse(localStorage.getItem("users"));

    // Update currentUser with form values
    for (var key in currentUser) {
        currentUser[key] = $('#' + key).val();
    }

    // Handle special fields
    currentUser.gender = $('input[name="gender"]:checked').val();
    currentUser.newsletter = $('#signup-newsletter').is(':checked');
    currentUser.discounts = $('#signup-discounts').is(':checked');

    // Save each property to localStorage
    for (var key in currentUser) {
        if (!['totalSteps', 'totalWater', 'exerciseLog', 'loggedIn'].includes(key)) {
            localStorage.setItem(key, currentUser[key]);
        }
    }

    // Find and update the user's record in the 'users' array
    let currentUserRecord = userRecords.find(user => user.email === currentUser.email); // Find matching email
    Object.assign(currentUserRecord, currentUser);
    console.log(currentUserRecord);

    // Save updated user records back to localStorage
    localStorage.setItem("users", JSON.stringify(userRecords));
}