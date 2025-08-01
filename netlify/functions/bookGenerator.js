const Chance = require('chance');
const seedrandom = require('seedrandom');

// Language-specific data for Chance.js
const LANGUAGES = {
    'en-US': {
        name: 'English',
        locale: 'en_US'
    },
    'de-DE': {
        name: 'Deutsch',
        locale: 'de_DE'
    },
    'fr-FR': {
        name: 'Français',
        locale: 'fr_FR'
    },
    'ja-JP': {
        name: '日本語',
        locale: 'ja'
    }
};

// Helper function to get language configuration
function getLanguageConfig(region = 'en-US') {
    return LANGUAGES[region] || LANGUAGES['en-US'];
}

// Function to generate dynamic reviews using Faker
function generateReviewText(rng, region = 'en-US') {
    const langConfig = getLanguageConfig(region);
    const chance = new Chance(rng());
    return chance.sentence();
}

function generateAuthorName(rng, region = 'en-US') {
    const langConfig = getLanguageConfig(region);
    const chance = new Chance(rng());
    return `${chance.first()} ${chance.last()}`;
}

function generatePublisherName(rng, region = 'en-US') {
    const langConfig = getLanguageConfig(region);
    const chance = new Chance(rng());
    return `${chance.company()} Publishing`;
}

function generateBookTitle(rng, region = 'en-US') {
    const langConfig = getLanguageConfig(region);
    const chance = new Chance(rng());
    const title = chance.sentence({ words: chance.integer({ min: 3, max: 6 }) });

    // Capitalize first letter of each word for proper title case
    return title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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