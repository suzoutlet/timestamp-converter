// Function to get the current Unix epoch time and display it
// function displayCurrentEpoch() {
//     const currentEpoch = Math.floor(Date.now() / 1000); // Get current Unix timestamp
//     document.getElementById('currentEpoch').innerText = currentEpoch;
// }

// Fetch current Unix epoch time based on current system time
        function updateCurrentEpoch() {
            const currentEpoch = Math.floor(Date.now() / 1000); // Get the current timestamp in seconds
            document.getElementById('currentEpoch').innerText = currentEpoch;
        }

// Function to get query parameter (timestamp)
// function getQueryParam(name) {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get(name);
// }

// Function to handle Unix timestamp conversion
function convertTimestamp() {
    const timestampInput = document.getElementById('timestampInput').value;
    const timestamp = parseInt(timestampInput);
    
    if (!timestamp || isNaN(timestamp)) {
        muteInputField();  // Mute the input if invalid timestamp
        return;
    }

    // Convert and display the timestamp
    const gmtTime = new Date(timestamp * 1000).toUTCString();
    const localTime = new Date(timestamp * 1000).toLocaleString();
    const relativeTime = timeAgo(timestamp);

    document.getElementById('gmtTime').innerText = gmtTime;
    document.getElementById('localTime').innerText = localTime;
    document.getElementById('relativeTime').innerText = relativeTime;
}

// Function to mute the input field if no valid timestamp
function muteInputField() {
    const timestampInput = document.getElementById('timestampInput');
    timestampInput.style.backgroundColor = "#ffcccc";  // Muting with color
    timestampInput.disabled = true;
    setTimeout(() => {
        timestampInput.style.backgroundColor = "";
        timestampInput.disabled = false;
    }, 2000); // Reset after 2 seconds
}

// Convert Date & Time to Unix Timestamp
function convertDateToTimestamp() {
    const year = parseInt(document.getElementById('year').value);
    const month = parseInt(document.getElementById('month').value) - 1;  // Month is 0-indexed
    const day = parseInt(document.getElementById('day').value);
    const hour = parseInt(document.getElementById('hour').value);
    const minutes = parseInt(document.getElementById('minutes').value);
    const seconds = parseInt(document.getElementById('seconds').value);

    const date = new Date(year, month, day, hour, minutes, seconds);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    
    const gmtConvertedTime = date.toUTCString();
    const localConvertedTime = date.toLocaleString();
    const relativeConvertedTime = timeAgo(unixTimestamp);

    document.getElementById('unixTimestamp').innerText = unixTimestamp;
    document.getElementById('gmtConvertedTime').innerText = gmtConvertedTime;
    document.getElementById('localConvertedTime').innerText = localConvertedTime;
    document.getElementById('relativeConvertedTime').innerText = relativeConvertedTime;
}

// Function to get relative time (e.g. "3 hours ago")
function timeAgo(timestamp) {
    const currentTime = Math.floor(Date.now() / 1000);
    const diff = currentTime - timestamp;
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);

    if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return "Just now";
    }
}

// Function to handle GET parameter and pre-fill input if available
function handleGetParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const timestampFromUrl = urlParams.get('timestamp');
    
    if (timestampFromUrl) {
        document.getElementById('timestampInput').value = timestampFromUrl;
        convertTimestamp();  // Automatically convert based on the timestamp in the URL
    } else {
        document.getElementById('timestampInput').value = "1739993745"; // Default value
        convertTimestamp();  // Convert with default timestamp
    }
}

// Call displayCurrentEpoch function when the page loads
// Update current Unix timestamp display
window.onload = function() {
    handleGetParam(); // Handle URL timestamp parameter
   // displayCurrentEpoch(); // Display current Unix epoch time
    updateCurrentEpoch();
};

// Initialize the page with URL handling
window.onload = function() {
    handleGetParam();
};
