$('.recommended-plan').hide();

window.onload = function() {
    let workoutAnswers = [];
    
    // Get the user's answer
    $('.answer').on('click', function() {
        // Get question number and user's answer
        let questionNum = $(this).closest('.q-n-a').data('question');
        let answerValue = $(this).data('value');

        // Add user's answer to array
        workoutAnswers[questionNum - 1] = answerValue;

        // Handle button focus
        $(this).closest('.q-n-a').find('.answer').removeClass('selected');
        $(this).addClass('selected');
    })

    // Determine which workout plan to recommend
    $('#submit-btn').on('click', function() {
        const [goal, days, type] = workoutAnswers;
        let workout;

        // Hide any previously recommended workout plans
        $('#build').hide();
        $('#cut').hide();
        $('#run').hide();
        $('#flow').hide();
        $('#hybrid').hide();

        if (goal === "build-muscle") {
            switch (type) {
                case "weightlifting": workout = "build"; break;
                case "running": workout = ["build", "run"]; break;
                case "hiit": workout = ["build", "run"]; break;
                case "yoga": workout = "flow"; break;
            }
        } else if (goal === "lose-fat") {
            switch (type) {
                case "weightlifting": workout = "cut"; break;
                case "running": workout = ["cut", "run"]; break;
                case "hiit": workout = ["cut", "run"]; break;
                case "yoga": workout = "flow"; break;
            }
        } else if (goal === "endurance") {
            switch (type) {
                case "weightlifting": workout = ["build", "run"]; break;
                case "running": workout = "run"; break;
                case "hiit": workout = "run"; break;
                case "yoga": workout = "flow"; break;
            }
        } else if (goal === "flexibility") {
            switch (type) {
                case "weightlifting": workout = ["build", "flow"]; break;
                case "running": workout = ["run", "flow"]; break;
                case "hiit": workout = ["run", "flow"]; break;
                case "yoga": workout = "flow"; break;
            }
        }

        if (typeof (workout) === "string") {
            switch (workout) {
                case "build": $('#build').show(); break;
                case "run": $('#run').show(); break;
                case "cut": $('#cut').show(); break;
                case "flow": $('#flow').show(); break;
            }
        } else {
            $('#hybrid .card').hide(); // Initially hide all workout plan cards

            // Show plans
            $('#hybrid').show();
            workout.forEach(function(plan) {
                $('#' + plan + '-card').show();
            });

            $('#plan1').html(workout[0]);
            $('#plan2').html(workout[1]);
        }
        
    })
}