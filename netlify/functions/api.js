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

            // Simple book generation with language support using seedrandom
            const books = [];
            const startIndex = (parseInt(page) - 1) * parseInt(limit) + 1;
            
            // Use seedrandom for deterministic results
            const seedrandom = require('seedrandom');
            const combinedSeed = `${seed}_${page}`;
            const rng = seedrandom(combinedSeed);

            for (let i = 0; i < parseInt(limit); i++) {
                const bookIndex = startIndex + i;
                const bookSeed = `${combinedSeed}_${bookIndex}`;
                const bookRng = seedrandom(bookSeed);
                
                // Language-specific content
                const names = {
                    'en-US': ['John Smith', 'Emma Johnson', 'Michael Brown', 'Sarah Davis', 'David Wilson', 'Lisa Anderson', 'Robert Taylor', 'Jennifer White'],
                    'de-DE': ['Hans Müller', 'Anna Schmidt', 'Klaus Weber', 'Maria Fischer', 'Peter Meyer', 'Sabine Wagner', 'Thomas Schulz', 'Monika Hoffmann'],
                    'fr-FR': ['Jean Dupont', 'Marie Martin', 'Pierre Durand', 'Sophie Bernard', 'Michel Petit', 'Isabelle Moreau', 'François Dubois', 'Catherine Leroy'],
                    'ja-JP': ['田中太郎', '佐藤花子', '鈴木一郎', '高橋美咲', '渡辺健太', '伊藤恵子', '山田次郎', '中村雅子']
                };
                
                const titles = {
                    'en-US': ['The Great Adventure', 'Mystery of the Night', 'Journey to Success', 'Hidden Treasures', 'The Last Hope', 'Beyond the Horizon', 'Secrets of Time', 'The Lost Kingdom'],
                    'de-DE': ['Das Große Abenteuer', 'Geheimnis der Nacht', 'Reise zum Erfolg', 'Verborgene Schätze', 'Die Letzte Hoffnung', 'Jenseits des Horizonts', 'Geheimnisse der Zeit', 'Das Verlorene Königreich'],
                    'fr-FR': ['La Grande Aventure', 'Mystère de la Nuit', 'Voyage vers le Succès', 'Trésors Cachés', 'Le Dernier Espoir', 'Au-delà de l\'Horizon', 'Secrets du Temps', 'Le Royaume Perdu'],
                    'ja-JP': ['素晴らしい冒険', '夜の謎', '成功への旅', '隠された宝物', '最後の希望', '地平線の向こう', '時の秘密', '失われた王国']
                };
                
                const regionNames = names[region] || names['en-US'];
                const regionTitles = titles[region] || titles['en-US'];
                
                // Generate likes and reviews based on parameters
                const avgLikesNum = parseFloat(avgLikes);
                const avgReviewsNum = parseFloat(avgReviews);
                
                let likes;
                if (avgLikesNum === 0) {
                    likes = 0;
                } else if (avgLikesNum <= 1) {
                    likes = bookRng() < avgLikesNum ? 1 : 0;
                } else {
                    likes = Math.floor(avgLikesNum + (bookRng() - 0.5) * 2);
                }
                
                let reviewCount;
                if (avgReviewsNum === 0) {
                    reviewCount = 0;
                } else if (avgReviewsNum <= 1) {
                    reviewCount = bookRng() < avgReviewsNum ? 1 : 0;
                } else {
                    reviewCount = Math.floor(avgReviewsNum + (bookRng() - 0.5) * 2);
                }
                
                const bookReviews = [];
                for (let j = 0; j < reviewCount; j++) {
                    bookReviews.push({
                        text: `Great book ${bookIndex}!`,
                        author: `Reviewer ${bookIndex}`,
                        company: `Company ${bookIndex}`
                    });
                }
                
                books.push({
                    index: bookIndex,
                    isbn: `978-${Math.floor(bookRng() * 10)}-${Math.floor(bookRng() * 100000).toString().padStart(5, '0')}-${Math.floor(bookRng() * 10000).toString().padStart(4, '0')}-${Math.floor(bookRng() * 10)}`,
                    title: regionTitles[Math.floor(bookRng() * regionTitles.length)],
                    author: regionNames[Math.floor(bookRng() * regionNames.length)],
                    publisher: `Publisher ${bookIndex}, ${1990 + Math.floor(bookRng() * 34)}`,
                    likes: Math.max(0, likes),
                    reviews: bookReviews,
                    cover: {
                        color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][Math.floor(bookRng() * 5)],
                        title: regionTitles[Math.floor(bookRng() * regionTitles.length)],
                        author: regionNames[Math.floor(bookRng() * regionNames.length)]
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