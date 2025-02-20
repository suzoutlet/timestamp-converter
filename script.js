window.onload = function () {
    // Default timestamp to display
    let timestampInput = document.getElementById('timestamp');
    let currentTimestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp
    document.getElementById('current-timestamp').textContent = currentTimestamp;

    // Display converted result in table format
    function displayConvertedResult(timestamp) {
        const date = new Date(timestamp * 1000);
        const gmtDate = date.toGMTString();
        const localTime = date.toLocaleString();

        const result = `
            <table>
                <tr>
                    <th>Format</th>
                    <th>Seconds</th>
                </tr>
                <tr>
                    <td>Unix Timestamp</td>
                    <td>${timestamp}</td>
                </tr>
                <tr>
                    <td>GMT</td>
                    <td>${gmtDate}</td>
                </tr>
                <tr>
                    <td>Your Time Zone</td>
                    <td>${localTime} (${Intl.DateTimeFormat().resolvedOptions().timeZone})</td>
                </tr>
                <tr>
                    <td>Relative</td>
                    <td>${getRelativeTime(timestamp)} ago</td>
                </tr>
            </table>
            <p><a href="https://www.epochconverter.com/?t=${timestamp}" target="_blank">Open in Epoch Converter</a></p>
        `;
        document.getElementById('converted-result').innerHTML = result;
    }

    // Function to get relative time (e.g., "5 hours ago")
    function getRelativeTime(timestamp) {
        const now = new Date();
        const diff = now - new Date(timestamp * 1000);
        const hours = Math.floor(diff / 1000 / 60 / 60);
        return hours + (hours === 1 ? " hour" : " hours");
    }

    // Convert button click event (Unix Timestamp)
    document.getElementById('convert-timestamp').addEventListener('click', function () {
        const timestamp = timestampInput.value.trim();

        if (timestamp === "") {
            timestampInput.classList.add('invalid');  // Show feedback for empty input
            document.getElementById('converted-result').innerHTML = '<p>Please enter a valid Unix timestamp.</p>';
        } else {
            timestampInput.classList.remove('invalid');
            displayConvertedResult(timestamp);
        }
    });

    // Handle URL with timestamp
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('timestamp')) {
        timestampInput.value = urlParams.get('timestamp');
        displayConvertedResult(urlParams.get('timestamp'));
    }

    // Handle Date & Time to Unix conversion
    document.getElementById('date-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const year = document.getElementById('year').value;
        const month = document.getElementById('month').value - 1; // Month is 0-based
        const day = document.getElementById('day').value;
        const hour = document.getElementById('hour').value;
        const minute = document.getElementById('minute').value;
        const second = document.getElementById('second').value;

        const date = new Date(year, month, day, hour, minute, second);
        const timestamp = Math.floor(date.getTime() / 1000);

        const result = `
            <p>Unix Timestamp: ${timestamp}</p>
            <p>GMT: ${date.toGMTString()}</p>
            <p>Your Time Zone: ${date.toLocaleString()} (${Intl.DateTimeFormat().resolvedOptions().timeZone})</p>
            <p>Relative: ${getRelativeTime(timestamp)} ago</p>
        `;

        document.getElementById('date-result').innerHTML = result;
    });
};
