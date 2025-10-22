/* Calculate TDEE and BMI after form is submitted */
window.onload = function () {
    document.getElementById('calculator-form').addEventListener('submit', function(e) {
        e.preventDefault();
    
        // Get values
        let age = parseFloat(document.getElementById('age').value);
        let gender = document.querySelector('input[name="gender"]:checked').value;
        let height = parseFloat(document.getElementById('height').value);
        let weight = parseFloat(document.getElementById('weight').value);
        let activitySelection = document.getElementById('activity-level');
        let activity = activitySelection.options[activitySelection.selectedIndex].text;
    
        // Calculate BMR
        let bmr;

        if (gender === "Male") {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height)- (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }

        // Calculate activity factor
        let activityFactor;

        if (activity === "Sedentary (office job)") 
            activityFactor = 1.2;
        else if (activity === "Light Exercise (1-2 days/week)")
            activityFactor = 1.375;
        else if (activity === "Moderate Exercise (3-5 days/week)")
            activityFactor = 1.55;
        else if (activity === "Heavy Exercise (6-7 days/week)")
            activityFactor = 1.725;
        else if (activity === "Athlete (2x per day)")
            activityFactor = 1.9;
        
        // Calculate TDEE
        let tdee = bmr * activityFactor;

        // Calculate BMI
        let bmi = weight / ((height / 100) * (height / 100));

        // Display results
        document.getElementById('bmr-result').innerHTML = Math.round(bmr);
        document.getElementById('tdee-result').innerHTML = Math.round(tdee);
        document.getElementById('maintenance').innerHTML = Math.round(tdee);
        document.getElementById('weight-loss').innerHTML = Math.round(tdee * 0.8);
        document.getElementById('weight-gain').innerHTML = Math.round(tdee * 1.2);
        document.getElementById('bmi-result').innerHTML = Math.round(bmi * 10)/10;

        document.getElementById('results').style.display = 'block';
    });
}
