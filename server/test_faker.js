const { generateBooks } = require('./bookGenerator.js');
const { getLanguageConfig } = require('./config');

console.log('=== Testing Faker-Based Book Generation ===\n');

// Test 1: Basic generation
console.log('1. Basic generation (3 books):');
const books1 = generateBooks({ page: 1, limit: 3, seed: 'test123', region: getLanguageConfig().locale, avgLikes: 5, avgReviews: 2 });
books1.forEach((book, i) => {
    console.log(`   Book ${i + 1}: "${book.title}" by ${book.author} (${book.publisher})`);
});

console.log('\n2. Deterministic test - same seed, different settings:');
const books2 = generateBooks({ page: 1, limit: 3, seed: 'test123', region: getLanguageConfig().locale, avgLikes: 10, avgReviews: 5 });
const books3 = generateBooks({ page: 1, limit: 3, seed: 'test123', region: getLanguageConfig().locale, avgLikes: 1, avgReviews: 0 });

console.log('   Titles match:', books1.map(b => b.title).join(', ') === books2.map(b => b.title).join(', '));
console.log('   Authors match:', books1.map(b => b.author).join(', ') === books2.map(b => b.author).join(', '));
console.log('   Publishers match:', books1.map(b => b.publisher).join(', ') === books2.map(b => b.publisher).join(', '));

console.log('\n3. Different pages test:');
const booksPage1 = generateBooks({ page: 1, limit: 2, seed: 'test123', region: getLanguageConfig().locale, avgLikes: 5, avgReviews: 2 });
const booksPage2 = generateBooks({ page: 2, limit: 2, seed: 'test123', region: getLanguageConfig().locale, avgLikes: 5, avgReviews: 2 });

console.log('   Page 1 titles:', booksPage1.map(b => b.title).join(', '));
console.log('   Page 2 titles:', booksPage2.map(b => b.title).join(', '));
console.log('   Different titles:', booksPage1.map(b => b.title).join(', ') !== booksPage2.map(b => b.title).join(', '));

console.log('\n4. Language test (German):');
const booksDE = generateBooks({ page: 1, limit: 2, seed: 'test123', region: 'de-DE', avgLikes: 5, avgReviews: 2 });
booksDE.forEach((book, i) => {
    console.log(`   Book ${i + 1}: "${book.title}" by ${book.author} (${book.publisher})`);
});

console.log('\n5. Language test (French):');
const booksFR = generateBooks({ page: 1, limit: 2, seed: 'test123', region: 'fr-FR', avgLikes: 5, avgReviews: 2 });
booksFR.forEach((book, i) => {
    console.log(`   Book ${i + 1}: "${book.title}" by ${book.author} (${book.publisher})`);
});

console.log('\n=== Test Complete ==='); 