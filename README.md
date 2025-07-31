# Bookstore Testing Application

A React.js and Node.js web application for testing bookstore applications by generating fake book information dynamically.

## Features

- **Multi-language Support**: English (USA), German (Germany), Japanese (Japan), French (France)
- **Dynamic Data Generation**: Server-side generation with seed-based reproducibility
- **Infinite Scrolling**: Load 20 initial records, then 10 more per scroll
- **Expandable Records**: Click to view detailed book information with covers and reviews
- **Export Functionality**: Download data as CSV
- **Gallery/Table Views**: Toggle between different display modes
- **Fractional Controls**: Support for fractional likes and reviews with probability logic

## Tech Stack

- **Frontend**: React.js with functional components and hooks
- **Backend**: Node.js with Express (local) / Netlify Functions (production)
- **Data Generation**: seedrandom library for deterministic randomness
- **Styling**: CSS Grid and Flexbox for responsive design
- **Deployment**: Netlify with serverless functions

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install-all
   ```
3. Start development servers:
   ```bash
   npm start
   ```

## Usage

1. Select language/region from the dropdown
2. Set seed value or use shuffle button for random seed
3. Adjust likes slider (0-10 with 0.1 increments)
4. Set average reviews per book
5. View generated books in table or gallery mode
6. Scroll for infinite loading
7. Click books to expand details
8. Export to CSV when needed

## API Endpoints

- `GET /api/books` - Generate book data with parameters
- `GET /api/export-csv` - Export books data as CSV

## Project Structure

```
task-5/
├── client/                 # React frontend
├── server/                # Local development server
├── netlify/               # Netlify functions for production
├── netlify.toml          # Netlify configuration
└── README.md             # This file
```

## Development

- `npm run client` - Start React development server
- `npm run server` - Start Node.js API server
- `npm run build` - Build for production

## Deployment

The application is configured for deployment to Netlify with serverless functions handling the API endpoints.

---

**Updated for Netlify deployment with proper dependency installation.**
