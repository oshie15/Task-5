const { faker } = require('@faker-js/faker');
const seedrandom = require('seedrandom');

// Simple color palette for book covers
const COVER_COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

function generateBooks({ page, limit, seed, region = 'en-US', avgLikes = 0, avgReviews = 0 }) {
    const combinedSeed = `${seed}_${page}`;
    const rng = seedrandom(combinedSeed);

    // Set faker locale and seed
    faker.setLocale(region);
    faker.seed(rng());

    const avgLikesNum = parseFloat(avgLikes);
    const avgReviewsNum = parseFloat(avgReviews);
    const books = [];

    // Calculate start index for pagination
    const startIndex = page === 1 ? 1 : 20 + (page - 2) * 10 + 1;

    for (let i = 0; i < limit; i++) {
        const bookIndex = startIndex + i;
        const bookSeed = `${combinedSeed}_${bookIndex}`;
        const bookRng = seedrandom(bookSeed);

        // Set faker seed for this book
        faker.seed(bookRng());

        // Generate basic book data
        const title = faker.lorem.words({ min: 2, max: 4 })
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        const author = `${faker.person.firstName()} ${faker.person.lastName()}`;
        const publisher = `${faker.company.name()} ${faker.lorem.word()}`;
        const year = 1990 + Math.floor(bookRng() * 34);

        // Generate ISBN
        const isbn = `978-${Math.floor(bookRng() * 10)}-${Math.floor(bookRng() * 100000).toString().padStart(5, '0')}-${Math.floor(bookRng() * 10000).toString().padStart(4, '0')}-${Math.floor(bookRng() * 10)}`;

        // Generate likes
        let likes = 0;
        if (avgLikesNum > 0) {
            if (avgLikesNum <= 1) {
                likes = bookRng() < avgLikesNum ? 1 : 0;
            } else {
                likes = Math.max(0, Math.floor(avgLikesNum + (bookRng() - 0.5) * 2));
            }
        }

        // Generate reviews
        let reviewCount = 0;
        if (avgReviewsNum > 0) {
            if (avgReviewsNum <= 1) {
                reviewCount = bookRng() < avgReviewsNum ? 1 : 0;
            } else {
                reviewCount = Math.max(0, Math.floor(avgReviewsNum + (bookRng() - 0.5) * 2));
            }
        }

        // Generate review data
        const reviews = [];
        for (let j = 0; j < reviewCount; j++) {
            reviews.push({
                text: faker.lorem.sentence(),
                author: `${faker.person.firstName()} ${faker.person.lastName()}`,
                company: `${faker.company.name()} ${faker.lorem.word()}`
            });
        }

        // Select cover color
        const coverColor = COVER_COLORS[Math.floor(bookRng() * COVER_COLORS.length)];

        books.push({
            index: bookIndex,
            isbn,
            title,
            author,
            publisher: `${publisher}, ${year}`,
            likes,
            reviews,
            cover: {
                color: coverColor,
                title,
                author
            }
        });
    }

    return books;
}

module.exports = { generateBooks }; 