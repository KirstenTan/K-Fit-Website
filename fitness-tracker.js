hideContent();

// Get user records
let userRecords = new Array();
userRecords = JSON.parse(localStorage.getItem("users"));

// Get current totals from localStorage
let exerciseLog = localStorage.getItem('exerciseLog');
if (exerciseLog) {
    exerciseLog = JSON.parse(exerciseLog);
} else {
    exerciseLog = [];
}

let totalSteps = parseInt(localStorage.getItem('totalSteps')) || 0;
const totalWater = parseInt(localStorage.getItem('totalWater')) || 0;

/* Display Data
    1. Displays exercise log table
    2. Displays steps and water intake
*/
function displayData() {
    const tbody = $('#exercise-log-table tbody');
    tbody.empty();
    let total = 0;

    // Create a new row for each entry in exerciseLog
    exerciseLog.forEach(entry => {
        tbody.append(`
            <tr>
                <td>${entry.date}</td>
                <td>${entry.type}</td>
                <td>${entry.duration}</td>
                <td>${entry.notes}</td>
            </tr>
        `);

        total += parseInt(entry.duration); // Total duration
    });

    $('#total-exercise').html(total); // Update summary
    $('#current-steps').html(totalSteps);
    $('#total-steps').html(totalSteps);
    $('#current-water').html(totalWater);
    $('#total-water').html(totalWater);
}

/* Add Exercise */
function addExercise() {
    // Get values from input fields
    const date = $('#exercise-date').val();
    const type = $('#exercise-type').val();
    const duration = $('#exercise-duration').val();
    const notes = $('#exercise-notes').val();

    // Ensure date, type, and duration fields are not empty
    if (!date || !type || !duration) {
        return;
    }

    // Add new entry to exerciseLog
    exerciseLog.push({date, type, duration, notes});
    localStorage.setItem('exerciseLog', JSON.stringify(exerciseLog)); // Save to localStorage
    
    
    displayData();
    updateUserRecords();
}

/* Add Steps */
function addSteps() {
    // Get current steps from localStorage
    let currentSteps = parseInt(localStorage.getItem('totalSteps')) || 0;
    currentSteps += parseInt($('#steps').val());

    if (!currentSteps) {
        return;
    }

    // Update localStorage and summary
    localStorage.setItem('totalSteps', currentSteps);
    $('#current-steps').html(currentSteps);
    $('#total-steps').html(currentSteps);
    updateUserRecords();
}

/* Add Water */
function addWater() {
    // Get current water intake from localStorage
    let currentWater = parseInt(localStorage.getItem('totalWater')) || 0;
    currentWater += 250;

    // Update localStorage and summary
    localStorage.setItem('totalWater', currentWater);
    $('#current-water').html(currentWater);
    $('#total-water').html(currentWater);
    updateUserRecords();
}

/* Reset Tracker */
function resetTracker() {
    $('#fitness-tracker-form')[0].reset();

    localStorage.setItem('exerciseLog', []);
    localStorage.setItem('totalSteps', 0);
    localStorage.setItem('totalWater', 0);

    updateUserRecords();
}

/* Update User Records */
function updateUserRecords() {
    // Update currentUser with localStorage values
    for (var key in currentUser) {
        currentUser[key] = localStorage.getItem(key);
    }

    // Find and update the user's record in the 'users' array
    let currentUserRecord = userRecords.find(user => user.email === currentUser.email); // Find matching email
    Object.assign(currentUserRecord, currentUser);
    console.log(currentUserRecord);

    // Save updated user records back to localStorage
    localStorage.setItem("users", JSON.stringify(userRecords));
}

// Initial display
displayData();