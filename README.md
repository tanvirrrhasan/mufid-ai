# Mufid AI - ইসলামিক প্রশ্নোত্তর

Mufid AI is a web application that allows users to ask Islamic questions in Bengali or English and receive detailed answers with references from the Quran and Hadith.

## Features

- Ask Islamic questions in Bengali or English
- Receive two-part answers:
  - Short summary (2-3 lines)
  - Detailed explanation with Quran and Hadith references
- Modern, responsive design with Islamic theme
- Dark mode support
- Input validation for non-Islamic questions

## Setup

1. Clone this repository
2. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
3. Open `script.js` and replace `YOUR_API_KEY` with your actual Gemini API key
4. Open `index.html` in a web browser or serve it using a local web server

## Usage

1. Type your Islamic question in the text input field
2. Click the "প্রশ্ন করুন" (Ask Question) button or press Enter
3. Wait for the response
4. Read the summary and detailed explanation

## Technical Details

- Built with HTML, CSS, and JavaScript
- Uses the Gemini Pro API for generating responses
- Responsive design that works on all devices
- Supports both light and dark modes
- Uses Noto Sans Bengali font for optimal Bengali text display

## Note

This application is designed to answer only Islamic-related questions. If a non-Islamic question is asked, it will respond with a message asking the user to ask an Islamic question instead.

## License

MIT License 