# Bookstore Testing Application

A React.js and Node.js web application for generating fake book data to test bookstore applications. The application provides realistic-looking book information in multiple languages with configurable parameters.

## Features

- **Multi-language Support**: Generate books in English (US), German (Germany), and Japanese (Japan)
- **Configurable Parameters**:
  - Seed value for reproducible data generation
  - Average number of likes per book (0-10 with fractional values)
  - Average number of reviews per book (0-10 with fractional values)
- **Dynamic Updates**: Table automatically updates when parameters change
- **Infinite Scrolling**: Load more books as you scroll down
- **Expandable Rows**: Click on any book row to see detailed information
- **Dual View Modes**: Table view and Gallery view
- **CSV Export**: Export current books to CSV format
- **Realistic Data**: Books, authors, and publishers that look authentic for each language

## Technology Stack

- **Frontend**: React.js with modern hooks and functional components
- **Backend**: Node.js with Express
- **Styling**: CSS Grid and Flexbox for responsive design
- **Icons**: Lucide React for beautiful icons
- **Data Generation**: Custom algorithms with seed-based randomization

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd task-5
   ```

2. **Install dependencies**:

   ```bash
   npm run install-all
   ```

3. **Start the application**:
   ```bash
   npm start
   ```

This will start both the backend server (port 5000) and the React development server (port 3000).

## Usage

### Controls

1. **Language Selection**: Choose from English (US), German (Germany), or Japanese (Japan)
2. **Seed Value**: Set a custom seed for reproducible data generation
   - Use the shuffle button to generate a random seed
3. **Likes Slider**: Adjust the average number of likes per book (0-10)
4. **Reviews Input**: Set the average number of reviews per book (0-10)
5. **View Toggle**: Switch between Table and Gallery views
6. **Export**: Download current books as CSV

### Features

- **Infinite Scrolling**: Scroll down to load more books automatically
- **Expandable Details**: Click the arrow next to any book to see:
  - Book cover (generated with title and author)
  - Number of likes
  - Detailed book information
  - Reviews with authors and companies
- **Responsive Design**: Works on desktop and mobile devices

### Data Generation

- **Seed-based**: Same seed always produces the same data
- **Language-specific**: Titles, authors, and publishers match the selected language
- **Fractional Support**:
  - 0.5 reviews = 50% chance of having 1 review per book
  - 3.7 likes = average of 3.7 likes per book
- **Realistic Content**: Data looks authentic but doesn't need to be sensible

## API Endpoints

- `GET /api/books` - Get books with parameters (page, limit, seed, region, avgLikes, avgReviews)
- `GET /api/export-csv` - Export books to CSV format

## Project Structure

```
task-5/
├── server/
│   ├── index.js          # Express server setup
│   ├── bookGenerator.js  # Book data generation logic
│   ├── csvExporter.js    # CSV export functionality
│   └── package.json      # Server dependencies
├── client/
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── App.css       # Component styles
│   │   ├── index.js      # React entry point
│   │   └── index.css     # Global styles
│   ├── public/
│   │   └── index.html    # HTML template
│   └── package.json      # Client dependencies
├── package.json          # Root package.json
└── README.md            # This file
```

## Development

- **Backend**: `cd server && npm run dev` (with nodemon)
- **Frontend**: `cd client && npm start`
- **Build**: `npm run build` (builds React app for production)

## Example Usage

1. Start with default settings (English, random seed)
2. Change language to German - notice how titles and authors change
3. Set seed to 42 and observe consistent data
4. Adjust likes to 7.5 and reviews to 2.3
5. Scroll down to load more books
6. Click on a book row to see detailed information
7. Switch to Gallery view for a different perspective
8. Export current books to CSV

The application demonstrates how to create realistic test data for bookstore applications with proper internationalization and configurable parameters.
