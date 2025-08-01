// const { generateBooks } = require('./bookGenerator');
const { exportToCSV } = require('./csvExporter');

exports.handler = async (event, context) => {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        console.log('Function called with path:', event.path);
        const path = event.path.replace('/.netlify/functions/api', '');
        console.log('Processed path:', path);

        if (path === '/books') {
            const { page = 1, limit = 20, seed = 42, region = 'en-US', avgLikes = 5, avgReviews = 4.7 } = event.queryStringParameters || {};
            console.log('Books API called with params:', { page, limit, seed, region, avgLikes, avgReviews });

            // Generate simple book data without external dependencies
            const books = [];
            const startIndex = page === 1 ? 1 : 20 + (page - 2) * 10 + 1;

            for (let i = 0; i < parseInt(limit); i++) {
                const bookIndex = startIndex + i;
                
                books.push({
                    index: bookIndex,
                    isbn: `978-${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10)}`,
                    title: `Book Title ${bookIndex}`,
                    author: `Author ${bookIndex}`,
                    publisher: `Publisher ${bookIndex}, ${1990 + Math.floor(Math.random() * 34)}`,
                    likes: Math.floor(Math.random() * 10),
                    reviews: [
                        {
                            text: `This is a great book ${bookIndex}!`,
                            author: `Reviewer ${bookIndex}`,
                            company: `Company ${bookIndex}`
                        }
                    ],
                    cover: {
                        color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][Math.floor(Math.random() * 5)],
                        title: `Book Title ${bookIndex}`,
                        author: `Author ${bookIndex}`
                    }
                });
            }
            
            console.log('Generated books count:', books.length);

            return {
                statusCode: 200,
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(books)
            };
        }

        if (path === '/export-csv') {
            const { seed = 42, region = 'en-US', avgLikes = 5, avgReviews = 4.7, pages = 1 } = event.queryStringParameters || {};

            const csvData = await exportToCSV({
                seed: parseInt(seed),
                region,
                avgLikes: parseFloat(avgLikes),
                avgReviews: parseFloat(avgReviews),
                pages: parseInt(pages)
            });

            return {
                statusCode: 200,
                headers: {
                    ...headers,
                    'Content-Type': 'text/csv',
                    'Content-Disposition': 'attachment; filename="books.csv"'
                },
                body: csvData
            };
        }

        return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Endpoint not found' })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
}; 