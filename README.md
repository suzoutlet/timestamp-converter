# Timestamp Converter

A simple web-based tool for converting UNIX timestamps to human-readable dates in UTC format. 

This project is hosted using [GitHub Pages](https://pages.github.com/) and accepts timestamps as a URL query parameter.

## Features
- Converts UNIX timestamps to UTC format.
- Accessible directly via query parameters (e.g., `?timestamp=1739972391`).

## Usage
1. Visit the hosted URL: `https://yourgithubusername.github.io/timestamp-converter`.
2. Append `?timestamp=<your-timestamp>` to the URL. Example: https://github.com/suzoutlet.github.io/timestamp-converter?timestamp=1739972391
3. The converted date and time will be displayed on the page.

## How It Works
- When the page loads, it checks the URL for a `timestamp` query parameter.
- If a timestamp is found, it converts it to a human-readable date in UTC.
- If no timestamp is provided, the page shows a message prompting for one.

## Deploying Locally
To run the tool locally:
1. Clone the repository:
`bash
git clone https://github.com/suzoutlet.github.io/timestamp-converter.git`

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

## Acknowledgments
Hosted using GitHub Pages.
Inspired by the need for an accessible timestamp conversion tool.
