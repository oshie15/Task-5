const seedrandom = require('seedrandom');
const { faker } = require('@faker-js/faker');

// Function to generate dynamic reviews using Faker
function generateReviewText(rng, region = 'en-US') {
    // Set faker seed for deterministic results
    faker.seed(rng());

    const reviewTemplates = {
        'en-US': [
            () => `This book completely changed my perspective on ${faker.lorem.words({ min: 1, max: 2 })}.`,
            () => `A masterpiece that will stand the test of time. ${faker.lorem.sentence()}`,
            () => `I couldn't put it down from start to finish. ${faker.lorem.sentence()}`,
            () => `The author has a unique voice that resonates deeply with ${faker.lorem.words({ min: 1, max: 2 })}.`,
            () => `An emotional rollercoaster that left me ${faker.lorem.words({ min: 1, max: 2 })}.`,
            () => `The characters are so well-developed and ${faker.lorem.words({ min: 1, max: 2 })}.`,
            () => `A thought-provoking read that challenges ${faker.lorem.words({ min: 1, max: 2 })}.`,
            () => `This book explores the ${faker.lorem.words({ min: 1, max: 2 })} in ways I never expected.`,
            () => `A compelling narrative about ${faker.lorem.words({ min: 1, max: 2 })} that kept me engaged throughout.`,
            () => `The author's insights into ${faker.lorem.words({ min: 1, max: 2 })} are truly remarkable.`,
            () => `This is a book that will stay with me for ${faker.lorem.words({ min: 1, max: 2 })}.`,
            () => `A beautifully written story about ${faker.lorem.words({ min: 1, max: 2 })} and ${faker.lorem.words({ min: 1, max: 2 })}.`,
            () => `I found myself completely immersed in the world of ${faker.lorem.words({ min: 1, max: 2 })}.`,
            () => `The author's treatment of ${faker.lorem.words({ min: 1, max: 2 })} is both sensitive and insightful.`,
            () => `This book offers a fresh perspective on ${faker.lorem.words({ min: 1, max: 2 })}.`
        ],
        'de-DE': [
            () => `Dieses Buch hat meine Sicht auf ${faker.lorem.words({ min: 1, max: 2 })} völlig verändert.`,
            () => `Ein Meisterwerk, das die Zeit überdauern wird. ${faker.lorem.sentence()}`,
            () => `Ich konnte es nicht aus der Hand legen. ${faker.lorem.sentence()}`,
            () => `Der Autor hat eine einzigartige Stimme, die tief berührt. ${faker.lorem.sentence()}`,
            () => `Eine emotionale Achterbahnfahrt, die mich ${faker.lorem.words({ min: 1, max: 2 })} zurückließ.`,
            () => `Die Charaktere sind so gut entwickelt und ${faker.lorem.words({ min: 1, max: 2 })}.`,
            () => `Ein nachdenklicher Lesestoff über ${faker.lorem.words({ min: 1, max: 2 })}.`,
            () => `Dieses Buch erforscht ${faker.lorem.words({ min: 1, max: 2 })} auf unerwartete Weise.`,
            () => `Eine fesselnde Erzählung über ${faker.lorem.words({ min: 1, max: 2 })}.`,
            () => `Die Einsichten des Autors zu ${faker.lorem.words({ min: 1, max: 2 })} sind wirklich bemerkenswert.`
        ],
        'fr-FR': [
            () => `Ce livre a complètement changé ma perspective sur ${faker.lorem.words({ min: 1, max: 2 })}.`,
            () => `Un chef-d'œuvre qui résistera à l'épreuve du temps. ${faker.lorem.sentence()}`,
            () => `Je n'ai pas pu le lâcher du début à la fin. ${faker.lorem.sentence()}`,
            () => `L'auteur a une voix unique qui résonne profondément. ${faker.lorem.sentence()}`,
            () => `Des montagnes russes émotionnelles qui m'ont laissé ${faker.lorem.words({ min: 1, max: 2 })}.`,
            () => `Les personnages sont si bien développés et ${faker.lorem.words({ min: 1, max: 2 })}.`,
            () => `Une lecture stimulante sur ${faker.lorem.words({ min: 1, max: 2 })}.`,
            () => `Ce livre explore ${faker.lorem.words({ min: 1, max: 2 })} de manière inattendue.`,
            () => `Un récit captivant sur ${faker.lorem.words({ min: 1, max: 2 })}.`,
            () => `Les idées de l'auteur sur ${faker.lorem.words({ min: 1, max: 2 })} sont vraiment remarquables.`
        ],
        'ja-JP': [
            () => `この本は私の${faker.lorem.words({ min: 1, max: 2 })}観を完全に変えました。`,
            () => `時を超えて残る傑作です。${faker.lorem.sentence()}`,
            () => `最初から最後まで手放せませんでした。${faker.lorem.sentence()}`,
            () => `作者の独特な声が深く響きます。${faker.lorem.sentence()}`,
            () => `息を呑むような感情のジェットコースターでした。${faker.lorem.sentence()}`,
            () => `キャラクターがとても良く描かれていて${faker.lorem.words({ min: 1, max: 2 })}です。`,
            () => `${faker.lorem.words({ min: 1, max: 2 })}について考えさせられる読み物です。`,
            () => `この本は${faker.lorem.words({ min: 1, max: 2 })}を予想外の方法で探求しています。`,
            () => `${faker.lorem.words({ min: 1, max: 2 })}についての魅力的な物語です。`,
            () => `作者の${faker.lorem.words({ min: 1, max: 2 })}への洞察は本当に素晴らしいです。`
        ]
    };

    const templates = reviewTemplates[region] || reviewTemplates['en-US'];
    const template = templates[Math.floor(rng() * templates.length)];
    return template();
}

function generateAuthorName(rng, region = 'en-US') {
    // Set faker seed for deterministic results
    faker.seed(rng());

    const nameGenerators = {
        'en-US': () => `${faker.person.firstName()} ${faker.person.lastName()}`,
        'de-DE': () => `${faker.person.firstName()} ${faker.person.lastName()}`,
        'fr-FR': () => `${faker.person.firstName()} ${faker.person.lastName()}`,
        'ja-JP': () => `${faker.person.firstName()} ${faker.person.lastName()}`
    };

    const generator = nameGenerators[region] || nameGenerators['en-US'];
    return generator();
}

function generatePublisherName(rng, region = 'en-US') {
    // Set faker seed for deterministic results
    faker.seed(rng());

    const publisherGenerators = {
        'en-US': () => `${faker.company.name()} ${faker.helpers.arrayElement(['Publishing', 'Books', 'Press', 'House', 'Group', 'Media'])}`,
        'de-DE': () => `${faker.company.name()} ${faker.helpers.arrayElement(['Verlag', 'Bücher', 'Presse', 'Haus', 'Gruppe', 'Medien'])}`,
        'fr-FR': () => `${faker.company.name()} ${faker.helpers.arrayElement(['Éditions', 'Livres', 'Presse', 'Maison', 'Groupe', 'Médias'])}`,
        'ja-JP': () => `${faker.company.name()} ${faker.helpers.arrayElement(['出版', '書籍', '出版社', 'メディア', 'グループ', 'プレス'])}`
    };

    const generator = publisherGenerators[region] || publisherGenerators['en-US'];
    return generator();
}

function generateBookTitle(rng, region = 'en-US') {
    // Set faker seed for deterministic results
    faker.seed(rng());

    const titleTypes = {
        'en-US': [
            () => faker.lorem.words({ min: 2, max: 4 }),
            () => `The ${faker.lorem.words({ min: 1, max: 3 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} of ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} in ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} and ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })}: ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} & ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} for ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} with ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} without ${faker.lorem.words({ min: 1, max: 2 })}`
        ],
        'de-DE': [
            () => `Der ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `Die ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `Das ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} von ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} und ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} in ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} für ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} mit ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} ohne ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} durch ${faker.lorem.words({ min: 1, max: 2 })}`
        ],
        'fr-FR': [
            () => `Le ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `La ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `Les ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} de ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} et ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} dans ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} pour ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} avec ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} sans ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })} par ${faker.lorem.words({ min: 1, max: 2 })}`
        ],
        'ja-JP': [
            () => `${faker.lorem.words({ min: 1, max: 2 })}の${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })}と${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })}：${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })}・${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })}から${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })}へ${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })}による${faker.lorem.words({ min: 1, max: 2 })}`,
            () => `${faker.lorem.words({ min: 1, max: 2 })}について`,
            () => `${faker.lorem.words({ min: 1, max: 2 })}として`,
            () => `${faker.lorem.words({ min: 1, max: 2 })}としての${faker.lorem.words({ min: 1, max: 2 })}`
        ]
    };

    const types = titleTypes[region] || titleTypes['en-US'];
    const titleGenerator = types[Math.floor(rng() * types.length)];
    const title = titleGenerator();

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