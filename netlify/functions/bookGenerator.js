const { faker } = require('@faker-js/faker');
const seedrandom = require('seedrandom');

// Language-specific data directly in the generator
const LANGUAGES = {
    'en-US': {
        name: 'English',
        locale: 'en-US',
        reviewTemplates: Array.from({ length: 5 }, () => (faker) => faker.lorem.sentence()),
        titlePatterns: Array.from({ length: 5 }, () => (faker) => faker.lorem.words({ min: 2, max: 4 })),
        publisherSuffixes: (faker) => Array.from({ length: 6 }, () => faker.lorem.word() + ' ' + faker.lorem.word())
    },
    'de-DE': {
        name: 'Deutsch',
        locale: 'de-DE',
        reviewTemplates: Array.from({ length: 5 }, () => (faker) => faker.lorem.sentence()),
        titlePatterns: Array.from({ length: 5 }, () => (faker) => faker.lorem.words({ min: 2, max: 4 })),
        publisherSuffixes: (faker) => Array.from({ length: 6 }, () => faker.lorem.word() + ' ' + faker.lorem.word())
    },
    'fr-FR': {
        name: 'Français',
        locale: 'fr-FR',
        reviewTemplates: Array.from({ length: 5 }, () => (faker) => faker.lorem.sentence()),
        titlePatterns: Array.from({ length: 5 }, () => (faker) => faker.lorem.words({ min: 2, max: 4 })),
        publisherSuffixes: (faker) => Array.from({ length: 6 }, () => faker.lorem.word() + ' ' + faker.lorem.word())
    },
    'ja-JP': {
        name: '日本語',
        locale: 'ja-JP',
        reviewTemplates: Array.from({ length: 5 }, () => (faker) => faker.lorem.sentence()),
        titlePatterns: Array.from({ length: 5 }, () => (faker) => faker.lorem.words({ min: 2, max: 4 })),
        publisherSuffixes: (faker) => Array.from({ length: 6 }, () => faker.lorem.word() + ' ' + faker.lorem.word())
    }
};

// Helper function to get language configuration
function getLanguageConfig(region = 'en-US') {
    return LANGUAGES[region] || LANGUAGES['en-US'];
}

// Function to generate dynamic reviews using Faker
function generateReviewText(rng, region = 'en-US') {
    // Generate review text based on region
    const reviews = {
        'en-US': ['Excellent book!', 'Highly recommended!', 'A must-read!', 'Outstanding quality!', 'Wonderful story!'],
        'de-DE': ['Ausgezeichnetes Buch!', 'Sehr empfehlenswert!', 'Ein Muss!', 'Hervorragende Qualität!', 'Wundervolle Geschichte!'],
        'fr-FR': ['Excellent livre!', 'Très recommandé!', 'Un must!', 'Qualité exceptionnelle!', 'Histoire merveilleuse!'],
        'ja-JP': ['素晴らしい本です！', 'とてもおすすめです！', '必読です！', '素晴らしい品質です！', '素晴らしい物語です！']
    };
    
    const regionReviews = reviews[region] || reviews['en-US'];
    return regionReviews[Math.floor(rng() * regionReviews.length)];
}

function generateAuthorName(rng, region = 'en-US') {
    // Generate names based on region
    const names = {
        'en-US': ['John Smith', 'Emma Johnson', 'Michael Brown', 'Sarah Davis', 'David Wilson'],
        'de-DE': ['Hans Müller', 'Anna Schmidt', 'Klaus Weber', 'Maria Fischer', 'Peter Meyer'],
        'fr-FR': ['Jean Dupont', 'Marie Martin', 'Pierre Durand', 'Sophie Bernard', 'Michel Petit'],
        'ja-JP': ['田中太郎', '佐藤花子', '鈴木一郎', '高橋美咲', '渡辺健太']
    };
    
    const regionNames = names[region] || names['en-US'];
    return regionNames[Math.floor(rng() * regionNames.length)];
}

function generatePublisherName(rng, region = 'en-US') {
    // Generate publisher names based on region
    const publishers = {
        'en-US': ['Random House', 'Penguin Books', 'HarperCollins', 'Simon & Schuster', 'Macmillan'],
        'de-DE': ['Random House', 'Penguin Verlag', 'HarperCollins', 'Simon & Schuster', 'Macmillan'],
        'fr-FR': ['Random House', 'Penguin Livres', 'HarperCollins', 'Simon & Schuster', 'Macmillan'],
        'ja-JP': ['ランダムハウス', 'ペンギンブックス', 'ハーパーコリンズ', 'サイモン&シュスター', 'マクミラン']
    };
    
    const regionPublishers = publishers[region] || publishers['en-US'];
    return regionPublishers[Math.floor(rng() * regionPublishers.length)];
}

function generateBookTitle(rng, region = 'en-US') {
    // Generate titles based on region
    const titles = {
        'en-US': ['The Great Adventure', 'Mystery of the Night', 'Journey to Success', 'Hidden Treasures', 'The Last Hope'],
        'de-DE': ['Das Große Abenteuer', 'Geheimnis der Nacht', 'Reise zum Erfolg', 'Verborgene Schätze', 'Die Letzte Hoffnung'],
        'fr-FR': ['La Grande Aventure', 'Mystère de la Nuit', 'Voyage vers le Succès', 'Trésors Cachés', 'Le Dernier Espoir'],
        'ja-JP': ['素晴らしい冒険', '夜の謎', '成功への旅', '隠された宝物', '最後の希望']
    };
    
    const regionTitles = titles[region] || titles['en-US'];
    return regionTitles[Math.floor(rng() * regionTitles.length)];
}

function generateBooks({ page, limit, seed, region, avgLikes, avgReviews }) {
    // Combine user seed with page number to ensure different pages have different data
    // but same seed always produces same results
    const combinedSeed = `${seed}_${page}`;
    const rng = seedrandom(combinedSeed);

    // Ensure parameters are numbers
    const avgLikesNum = parseFloat(avgLikes);
    const avgReviewsNum = parseFloat(avgReviews);

    const books = [];
    // Calculate start index based on actual books loaded in previous pages
    // Page 1: 20 books (1-20), Page 2: 10 books (21-30), Page 3: 10 books (31-40), etc.
    const startIndex = page === 1 ? 1 : 20 + (page - 2) * 10 + 1;

    for (let i = 0; i < limit; i++) {
        const bookIndex = startIndex + i;
        const bookSeed = `${combinedSeed}_${bookIndex}`; // Unique seed for each book
        const bookRng = seedrandom(bookSeed);

        // Generate book data using faker
        const title = generateBookTitle(bookRng, region);
        const author = generateAuthorName(bookRng, region);
        const publisher = generatePublisherName(bookRng, region);
        const year = 1990 + Math.floor(bookRng() * 34); // 1990-2023

        // Generate ISBN
        const isbn = generateISBN(bookRng);

        // Generate likes (fractional support with clear probability logic)
        let likes;
        if (avgLikesNum === 0) {
            likes = 0;
        } else if (avgLikesNum <= 1) {
            // For fractional values like 0.5, use probability logic
            const randomValue = bookRng();
            if (randomValue < avgLikesNum) {
                likes = 1;
            } else {
                likes = 0;
            }
        } else {
            // For values > 1, use normal distribution around the average
            likes = Math.floor(avgLikesNum + (bookRng() - 0.5) * 2);
        }

        // Generate reviews (fractional support with clear probability logic)
        let reviewCount;
        if (avgReviewsNum === 0) {
            reviewCount = 0;
        } else if (avgReviewsNum <= 1) {
            // For fractional values like 0.5, use probability logic
            const randomValue = bookRng();
            if (randomValue < avgReviewsNum) {
                reviewCount = 1;
            } else {
                reviewCount = 0;
            }
        } else {
            // For values > 1, use normal distribution around the average
            reviewCount = Math.floor(avgReviewsNum + (bookRng() - 0.5) * 2);
        }
        const bookReviews = [];

        for (let j = 0; j < reviewCount; j++) {
            const reviewText = generateReviewText(bookRng, region);
            const reviewerName = generateAuthorName(bookRng, region);
            const reviewerCompany = generatePublisherName(bookRng, region);

            bookReviews.push({
                text: reviewText,
                author: reviewerName,
                company: reviewerCompany
            });
        }

        // Generate book cover data
        const coverColors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
            '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
        ];
        const coverColor = coverColors[Math.floor(bookRng() * coverColors.length)];

        books.push({
            index: bookIndex,
            isbn,
            title,
            author,
            publisher: `${publisher}, ${year}`,
            likes: Math.max(0, likes),
            reviews: bookReviews,
            cover: {
                color: coverColor,
                title,
                author
            }
        });
    }

    return books;
}

function generateISBN(rng) {
    const prefix = '978';
    const group = Math.floor(rng() * 10);
    const publisher = Math.floor(rng() * 100000);
    const title = Math.floor(rng() * 10000);

    // Calculate check digit (simplified)
    const checkDigit = Math.floor(rng() * 10);

    return `${prefix}-${group}-${publisher.toString().padStart(5, '0')}-${title.toString().padStart(4, '0')}-${checkDigit}`;
}

module.exports = { generateBooks }; 