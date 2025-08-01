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

            // Simple book generation without external dependencies
            const books = [];
            const startIndex = page === 1 ? 1 : 20 + (page - 2) * 10 + 1;

            for (let i = 0; i < parseInt(limit); i++) {
                const bookIndex = startIndex + i;
                
                // Simple language-specific content
                const names = {
                    'en-US': ['John Smith', 'Emma Johnson', 'Michael Brown', 'Sarah Davis', 'David Wilson'],
                    'de-DE': ['Hans Müller', 'Anna Schmidt', 'Klaus Weber', 'Maria Fischer', 'Peter Meyer'],
                    'fr-FR': ['Jean Dupont', 'Marie Martin', 'Pierre Durand', 'Sophie Bernard', 'Michel Petit'],
                    'ja-JP': ['田中太郎', '佐藤花子', '鈴木一郎', '高橋美咲', '渡辺健太']
                };
                
                const titles = {
                    'en-US': ['The Great Adventure', 'Mystery of the Night', 'Journey to Success', 'Hidden Treasures', 'The Last Hope'],
                    'de-DE': ['Das Große Abenteuer', 'Geheimnis der Nacht', 'Reise zum Erfolg', 'Verborgene Schätze', 'Die Letzte Hoffnung'],
                    'fr-FR': ['La Grande Aventure', 'Mystère de la Nuit', 'Voyage vers le Succès', 'Trésors Cachés', 'Le Dernier Espoir'],
                    'ja-JP': ['素晴らしい冒険', '夜の謎', '成功への旅', '隠された宝物', '最後の希望']
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