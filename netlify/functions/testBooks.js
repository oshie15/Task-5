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
        // Simple book generation without external dependencies
        const books = [];
        const { page = 1, limit = 20, region = 'en-US' } = event.queryStringParameters || {};
        const startIndex = page === 1 ? 1 : 20 + (page - 2) * 10 + 1;

        for (let i = 0; i < parseInt(limit); i++) {
            const bookIndex = startIndex + i;
            
            // Simple language-specific content
            const names = {
                'en-US': ['John Smith', 'Emma Johnson'],
                'de-DE': ['Hans Müller', 'Anna Schmidt'],
                'fr-FR': ['Jean Dupont', 'Marie Martin'],
                'ja-JP': ['田中太郎', '佐藤花子']
            };
            
            const titles = {
                'en-US': ['The Great Adventure', 'Mystery of the Night'],
                'de-DE': ['Das Große Abenteuer', 'Geheimnis der Nacht'],
                'fr-FR': ['La Grande Aventure', 'Mystère de la Nuit'],
                'ja-JP': ['素晴らしい冒険', '夜の謎']
            };
            
            const regionNames = names[region] || names['en-US'];
            const regionTitles = titles[region] || titles['en-US'];
            
            books.push({
                index: bookIndex,
                isbn: `978-${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10)}`,
                title: regionTitles[Math.floor(Math.random() * regionTitles.length)],
                author: regionNames[Math.floor(Math.random() * regionNames.length)],
                publisher: `Publisher ${bookIndex}, ${1990 + Math.floor(Math.random() * 34)}`,
                likes: Math.floor(Math.random() * 10),
                reviews: [
                    {
                        text: `Great book ${bookIndex}!`,
                        author: `Reviewer ${bookIndex}`,
                        company: `Company ${bookIndex}`
                    }
                ],
                cover: {
                    color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][Math.floor(Math.random() * 5)],
                    title: regionTitles[Math.floor(Math.random() * regionTitles.length)],
                    author: regionNames[Math.floor(Math.random() * regionNames.length)]
                }
            });
        }

        return {
            statusCode: 200,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(books)
        };

    } catch (error) {
        console.error('Error in test books API:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal server error', details: error.message })
        };
    }
}; 