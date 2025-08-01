const Chance = require('chance');
const seedrandom = require('seedrandom');

// Language-specific data with proper locale mappings
const LANGUAGES = {
    'en-US': {
        name: 'English',
        locale: 'en_US',
        names: ['John Smith', 'Emma Johnson', 'Michael Brown', 'Sarah Davis', 'David Wilson', 'Lisa Anderson', 'Robert Taylor', 'Jennifer White'],
        titles: ['The Great Adventure', 'Mystery of the Night', 'Journey to Success', 'Hidden Treasures', 'The Last Hope', 'Beyond the Horizon', 'Secrets of Time', 'The Lost Kingdom'],
        reviews: ['Excellent book!', 'Highly recommended!', 'A must-read!', 'Outstanding quality!', 'Wonderful story!', 'Amazing content!', 'Fantastic writing!', 'Brilliant narrative!'],
        publishers: ['Random House', 'Penguin Books', 'HarperCollins', 'Simon & Schuster', 'Macmillan', 'Scholastic', 'Bloomsbury', 'Hachette']
    },
    'de-DE': {
        name: 'Deutsch',
        locale: 'de_DE',
        names: ['Hans Müller', 'Anna Schmidt', 'Klaus Weber', 'Maria Fischer', 'Peter Meyer', 'Sabine Wagner', 'Thomas Schulz', 'Monika Hoffmann'],
        titles: ['Das Große Abenteuer', 'Geheimnis der Nacht', 'Reise zum Erfolg', 'Verborgene Schätze', 'Die Letzte Hoffnung', 'Jenseits des Horizonts', 'Geheimnisse der Zeit', 'Das Verlorene Königreich'],
        reviews: ['Ausgezeichnetes Buch!', 'Sehr empfehlenswert!', 'Ein Muss!', 'Hervorragende Qualität!', 'Wundervolle Geschichte!', 'Erstaunlicher Inhalt!', 'Fantastisches Schreiben!', 'Brillante Erzählung!'],
        publishers: ['Random House', 'Penguin Verlag', 'HarperCollins', 'Simon & Schuster', 'Macmillan', 'Scholastic', 'Bloomsbury', 'Hachette']
    },
    'fr-FR': {
        name: 'Français',
        locale: 'fr_FR',
        names: ['Jean Dupont', 'Marie Martin', 'Pierre Durand', 'Sophie Bernard', 'Michel Petit', 'Isabelle Moreau', 'François Dubois', 'Catherine Leroy'],
        titles: ['La Grande Aventure', 'Mystère de la Nuit', 'Voyage vers le Succès', 'Trésors Cachés', 'Le Dernier Espoir', 'Au-delà de l\'Horizon', 'Secrets du Temps', 'Le Royaume Perdu'],
        reviews: ['Excellent livre!', 'Très recommandé!', 'Un must!', 'Qualité exceptionnelle!', 'Histoire merveilleuse!', 'Contenu incroyable!', 'Écriture fantastique!', 'Narration brillante!'],
        publishers: ['Random House', 'Penguin Livres', 'HarperCollins', 'Simon & Schuster', 'Macmillan', 'Scholastic', 'Bloomsbury', 'Hachette']
    },
    'ja-JP': {
        name: '日本語',
        locale: 'ja',
        names: ['田中太郎', '佐藤花子', '鈴木一郎', '高橋美咲', '渡辺健太', '伊藤恵子', '山田次郎', '中村雅子'],
        titles: ['素晴らしい冒険', '夜の謎', '成功への旅', '隠された宝物', '最後の希望', '地平線の向こう', '時の秘密', '失われた王国'],
        reviews: ['素晴らしい本です！', 'とてもおすすめです！', '必読です！', '素晴らしい品質です！', '素晴らしい物語です！', '驚くべき内容です！', '素晴らしい文章です！', '素晴らしい物語です！'],
        publishers: ['ランダムハウス', 'ペンギンブックス', 'ハーパーコリンズ', 'サイモン&シュスター', 'マクミラン', 'スコラスティック', 'ブルームズベリー', 'アシェット']
    }
};

// Helper function to get language configuration
function getLanguageConfig(region = 'en-US') {
    return LANGUAGES[region] || LANGUAGES['en-US'];
}

// Generic function to get random item from array using seeded random
function getRandomItem(array, rng) {
    return array[Math.floor(rng() * array.length)];
}

// Function to generate author name using language-specific data
function generateAuthorName(rng, region = 'en-US') {
    const langConfig = getLanguageConfig(region);
    return getRandomItem(langConfig.names, rng);
}

// Function to generate book title using language-specific data
function generateBookTitle(rng, region = 'en-US') {
    const langConfig = getLanguageConfig(region);
    return getRandomItem(langConfig.titles, rng);
}

// Function to generate review text using language-specific data
function generateReviewText(rng, region = 'en-US') {
    const langConfig = getLanguageConfig(region);
    return getRandomItem(langConfig.reviews, rng);
}

// Function to generate publisher name using language-specific data
function generatePublisherName(rng, region = 'en-US') {
    const langConfig = getLanguageConfig(region);
    return getRandomItem(langConfig.publishers, rng);
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