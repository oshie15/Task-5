const { faker } = require('@faker-js/faker');

function generateSimpleBooks({ page, limit, seed, region, avgLikes, avgReviews }) {
    console.log('Generating simple books with params:', { page, limit, seed, region, avgLikes, avgReviews });
    
    const books = [];
    const startIndex = page === 1 ? 1 : 20 + (page - 2) * 10 + 1;

    for (let i = 0; i < limit; i++) {
        const bookIndex = startIndex + i;
        
        // Generate simple book data
        const title = faker.lorem.words({ min: 2, max: 4 });
        const author = `${faker.person.firstName()} ${faker.person.lastName()}`;
        const publisher = `${faker.company.name()} Publishing`;
        const year = 1990 + Math.floor(Math.random() * 34);
        const isbn = `978-${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10)}`;
        
        // Simple likes calculation
        const likes = Math.max(0, Math.floor(avgLikes + (Math.random() - 0.5) * 2));
        
        // Simple reviews
        const reviewCount = Math.max(0, Math.floor(avgReviews + (Math.random() - 0.5) * 2));
        const reviews = [];
        
        for (let j = 0; j < reviewCount; j++) {
            reviews.push({
                text: faker.lorem.sentence(),
                author: `${faker.person.firstName()} ${faker.person.lastName()}`,
                company: faker.company.name()
            });
        }

        books.push({
            index: bookIndex,
            isbn,
            title: title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            author,
            publisher: `${publisher}, ${year}`,
            likes,
            reviews,
            cover: {
                color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][Math.floor(Math.random() * 5)],
                title: title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                author
            }
        });
    }

    console.log('Generated', books.length, 'simple books');
    return books;
}

module.exports = { generateSimpleBooks }; 