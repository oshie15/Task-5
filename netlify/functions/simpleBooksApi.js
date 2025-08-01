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
        console.log('Simple Books API called with path:', event.path);
        
        // Generate simple book data without external dependencies
        const books = [];
        const { page = 1, limit = 20 } = event.queryStringParameters || {};
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

        console.log('Generated', books.length, 'simple books');

        return {
            statusCode: 200,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(books)
        };

    } catch (error) {
        console.error('Error in simple books API:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal server error', details: error.message })
        };
    }
}; 