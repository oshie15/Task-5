const express = require('express');
const cors = require('cors');
const { generateBooks } = require('./bookGenerator');
const { exportToCSV } = require('./csvExporter');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/books', (req, res) => {
    try {
        const {
            page = 1,
            limit = 20,
            seed = Math.floor(Math.random() * 1000000),
            region = 'en-US',
            avgLikes = 5,
            avgReviews = 3
        } = req.query;



        const books = generateBooks({
            page: parseInt(page),
            limit: parseInt(limit),
            seed: parseInt(seed),
            region,
            avgLikes: parseFloat(avgLikes),
            avgReviews: parseFloat(avgReviews)
        });

        res.json({
            books,
            page: parseInt(page),
            limit: parseInt(limit),
            hasMore: books.length === parseInt(limit)
        });
    } catch (error) {
        console.error('Error generating books:', error);
        res.status(500).json({ error: 'Failed to generate books' });
    }
});

app.get('/api/export-csv', (req, res) => {
    try {
        const {
            pages = 1,
            seed = Math.floor(Math.random() * 1000000),
            region = 'en-US',
            avgLikes = 5,
            avgReviews = 3
        } = req.query;

        const allBooks = [];
        for (let page = 1; page <= parseInt(pages); page++) {
            const books = generateBooks({
                page,
                limit: 20,
                seed: parseInt(seed),
                region,
                avgLikes: parseFloat(avgLikes),
                avgReviews: parseFloat(avgReviews)
            });
            allBooks.push(...books);
        }

        const csvData = exportToCSV(allBooks);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="books.csv"');
        res.send(csvData);
    } catch (error) {
        console.error('Error exporting CSV:', error);
        res.status(500).json({ error: 'Failed to export CSV' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 