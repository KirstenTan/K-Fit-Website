// Global variables
let lat;
let lon;

/* Get user's location */
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('location').innerHTML = "Geolocation is not supported by this browser.";
    }
}

/* Shows user's position on the map */
function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    // Show current position on map
    let mapUrl = `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
    document.getElementById("map-frame").src = mapUrl;
}

/* Show any errors */
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

// Redirect user to google maps based on their location
$('#find-gym-btn').on('click', function(e) {
    e.preventDefault(); // prevent default anchor behavior
    if (lat && lon) {
        const mapUrl = `https://www.google.com/maps/search/gyms/@${lat},${lon},14z`;
        window.open(mapUrl, '_blank'); // open in new tab
    } else {
        alert("Location not available yet. Please wait or enable location services.");
    }
});

window.onload = getLocation;