// Fetch current Unix epoch time based on current system time
function updateCurrentEpoch() {
   const currentEpoch = Math.floor(Date.now() / 1000); // Get the current timestamp in seconds
   document.getElementById('currentEpoch').innerText = currentEpoch;
}

// Function to get query parameter (timestamp)
function getQueryParam(name) {
   const urlParams = new URLSearchParams(window.location.search);
   return urlParams.get(name);
}

// Convert Unix Timestamp to various formats
function convertTimestamp() {
   const timestampInput = document.getElementById('timestampInput').value;
   const timestamp = parseInt(timestampInput);

// Check if the Timestamp field is empty or invalid, then mute
if (!timestamp || isNaN(timestamp)) {
       muteInputField();  // Mute the input if invalid timestamp
       return;
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

   // Convert timestamp to different formats
   const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

   // GMT format
   const gmtTime = date.toGMTString();
   document.getElementById('gmtTime').innerText = gmtTime;

   // Local time format (with timezone)
   const options = { timeZoneName: 'short' };
   const localTime = date.toLocaleString('en-US', options);
   document.getElementById('localTime').innerText = localTime;

   // Relative time (e.g., 7 hours ago)
   const relativeTime = getRelativeTime(date);
   document.getElementById('relativeTime').innerText = relativeTime;
}

// Function to convert a specific date & time to Unix timestamp
function convertDateToTimestamp() {
   const year = parseInt(document.getElementById('year').value);
   const month = parseInt(document.getElementById('month').value) - 1; // Month is 0-indexed
   const day = parseInt(document.getElementById('day').value);
   const hour = parseInt(document.getElementById('hour').value);
   const minutes = parseInt(document.getElementById('minutes').value);
   const seconds = parseInt(document.getElementById('seconds').value);

   // Validate input values
   if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour) || isNaN(minutes) || isNaN(seconds)) {
       alert('Please enter valid numbers for all date and time fields.');
       return;
   }

   // Create a Date object from the provided date and time
   const date = new Date(year, month, day, hour, minutes, seconds);
   const unixTimestamp = Math.floor(date.getTime() / 1000);

   // Display the converted Unix Timestamp
   document.getElementById('unixTimestampResult').innerText = unixTimestamp;

   // Convert and display the corresponding time formats
   const gmtTime = date.toGMTString();
   document.getElementById('gmtTimeResult').innerText = gmtTime;

   const localTime = date.toLocaleString();
   document.getElementById('localTimeResult').innerText = localTime;

   const relativeTime = getRelativeTime(date);
   document.getElementById('relativeTimeResult').innerText = relativeTime;
}

// Function to get relative time (e.g., 7 hours ago)
function getRelativeTime(date) {
   const now = new Date();
   const diff = now - date; // Difference in milliseconds
   const seconds = Math.floor(diff / 1000);
   const minutes = Math.floor(seconds / 60);
   const hours = Math.floor(minutes / 60);
   const days = Math.floor(hours / 24);

   if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
   if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
   if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
   return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
}

// On page load
window.onload = function() {
   // Update current Unix timestamp display
   updateCurrentEpoch();

   const timestampFromUrl = getQueryParam('timestamp');
   if (timestampFromUrl) {
       document.getElementById('timestampInput').value = timestampFromUrl;
       convertTimestamp(); // Convert the timestamp passed in the URL
   } else {
       const currentEpoch = Math.floor(Date.now() / 1000);
       document.getElementById('timestampInput').value = currentEpoch; // Default value
       convertTimestamp(); // Convert the default timestamp or the user-entered timestamp
   }
};
