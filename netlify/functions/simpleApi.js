const { generateSimpleBooks } = require('./simpleBooks');

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        console.log('Simple API called with path:', event.path);
        const path = event.path.replace('/.netlify/functions/simpleApi', '');

        if (path === '/books') {
            const { page = 1, limit = 20, seed = 42, region = 'en-US', avgLikes = 5, avgReviews = 4.7 } = event.queryStringParameters || {};
            console.log('Simple Books API called with params:', { page, limit, seed, region, avgLikes, avgReviews });

            const books = generateSimpleBooks({
                page: parseInt(page),
                limit: parseInt(limit),
                seed: parseInt(seed),
                region,
                avgLikes: parseFloat(avgLikes),
                avgReviews: parseFloat(avgReviews)
            });

            console.log('Generated simple books count:', books.length);

            return {
                statusCode: 200,
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(books)
            };
        }

        return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Endpoint not found' })
        };

    } catch (error) {
        console.error('Error in simple API:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal server error', details: error.message })
        };
    }
}; 