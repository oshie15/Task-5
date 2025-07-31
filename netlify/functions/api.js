const { generateBooks } = require('./bookGenerator');
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

            const books = generateBooks({
                page: parseInt(page),
                limit: parseInt(limit),
                seed: parseInt(seed),
                region,
                avgLikes: parseFloat(avgLikes),
                avgReviews: parseFloat(avgReviews)
            });
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