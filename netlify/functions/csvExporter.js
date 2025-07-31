const { generateBooks } = require('./bookGenerator');

async function exportToCSV({ seed, region, avgLikes, avgReviews, pages }) {
    // Generate books for all pages
    let allBooks = [];
    for (let page = 1; page <= pages; page++) {
        const books = generateBooks({
            page,
            limit: 20,
            seed,
            region,
            avgLikes,
            avgReviews
        });
        allBooks = allBooks.concat(books);
    }

    // Convert to CSV string
    const headers = ['Index', 'ISBN', 'Title', 'Author(s)', 'Publisher', 'Likes', 'Review Count'];
    const csvRows = [headers.join(',')];

    allBooks.forEach(book => {
        const values = [
            book.index,
            `"${book.isbn}"`,
            `"${book.title.replace(/"/g, '""')}"`, // Escape quotes in titles
            `"${book.author.replace(/"/g, '""')}"`, // Escape quotes in authors
            `"${book.publisher.replace(/"/g, '""')}"`, // Escape quotes in publishers
            book.likes,
            book.reviews.length
        ];
        csvRows.push(values.join(','));
    });

    return csvRows.join('\n');
}

module.exports = { exportToCSV }; 