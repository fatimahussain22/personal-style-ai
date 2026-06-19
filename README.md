
# Personal Style AI

An AI-powered personal styling app that analyzes your skin undertone from a photo and gives you personalized recommendations - colors to wear, colors to avoid, jewelry metal, face-shape-based styling advice, and curated store suggestions within your budget.

Built with a soft, blossom-inspired design aesthetic and powered by Google's Gemini API.

## Features

- Photo Upload - Upload a photo for AI-based undertone analysis
- Undertone Detection - Get your warm, cool, or neutral undertone result
- Color Recommendations - Personalized "wear" and "avoid" color palettes
- Jewelry Matching - Metal tone recommendations based on your undertone
- Face Shape Styling - Style advice tailored to your face shape
- Store Finder - AI-curated Pakistani store recommendations matched to your budget and style profile

## Tech Stack

- React - frontend framework
- Gemini API (Google Generative AI) - undertone analysis and store recommendations
- CSS Variables - custom blossom-themed design system

## Getting Started

### Prerequisites
- Node.js installed
- A free Gemini API key (https://ai.google.dev/)

### Installation

```bash
git clone https://github.com/your-username/personal-style-ai.git
cd personal-style-ai
npm install
```

### Environment Setup

Create a `.env` file in the root directory and add your API key:

```
REACT_APP_GEMINI_KEY=your_api_key_here
```

Never commit your `.env` file - it is already excluded via `.gitignore`.

### Run Locally

```bash
npm start
```

The app will run at http://localhost:3000.

## Note on Demo Usage

This project uses the free tier of the Gemini API. If you are trying the live demo and it has been heavily used recently, the API quota may temporarily run out - the app will show a friendly notice if this happens. Please check back a bit later and try again.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Author

Fatima Hussain
