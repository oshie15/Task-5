const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function exportToCSV(books) {
    const csvWriter = createCsvWriter({
        path: 'temp.csv',
        header: [
            { id: 'index', title: 'Index' },
            { id: 'isbn', title: 'ISBN' },
            { id: 'title', title: 'Title' },
            { id: 'author', title: 'Author(s)' },
            { id: 'publisher', title: 'Publisher' },
            { id: 'likes', title: 'Likes' },
            { id: 'reviewCount', title: 'Review Count' }
        ]
    });

    const csvData = books.map(book => ({
        index: book.index,
        isbn: book.isbn,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        likes: book.likes,
        reviewCount: book.reviews.length
    }));

    // Convert to CSV string manually since we need to return it
    const headers = ['Index', 'ISBN', 'Title', 'Author(s)', 'Publisher', 'Likes', 'Review Count'];
    const csvRows = [headers.join(',')];

    csvData.forEach(row => {
        const values = [
            row.index,
            `"${row.isbn}"`,
            `"${row.title}"`,
            `"${row.author}"`,
            `"${row.publisher}"`,
            row.likes,
            row.reviewCount
        ];
        csvRows.push(values.join(','));
    });

    return csvRows.join('\n');
}

module.exports = { exportToCSV }; 