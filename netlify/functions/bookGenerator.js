const faker = require('faker');
const seedrandom = require('seedrandom');

// Large lookup tables for realistic data generation
const FIRST_NAMES = {
    'en-US': ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Christopher', 'Karen'],
    'de-DE': ['Hans', 'Anna', 'Klaus', 'Maria', 'Peter', 'Sabine', 'Thomas', 'Monika', 'Michael', 'Petra', 'Wolfgang', 'Susanne', 'Dieter', 'Renate', 'Manfred', 'Ursula', 'Werner', 'Elke', 'Helmut', 'Brigitte'],
    'fr-FR': ['Jean', 'Marie', 'Pierre', 'Françoise', 'Michel', 'Monique', 'André', 'Nathalie', 'Philippe', 'Isabelle', 'Claude', 'Sylvie', 'Jacques', 'Martine', 'Daniel', 'Catherine', 'Bernard', 'Francine', 'Robert', 'Nicole'],
    'ja-JP': ['田中', '佐藤', '鈴木', '高橋', '渡辺', '伊藤', '山田', '中村', '小林', '加藤', '吉田', '山本', '佐々木', '山口', '松本', '井上', '木村', '林', '斎藤', '清水']
};

const LAST_NAMES = {
    'en-US': ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'],
    'de-DE': ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann', 'Schäfer', 'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf', 'Schröder', 'Neumann', 'Schwarz', 'Zimmermann'],
    'fr-FR': ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand', 'Leroy', 'Moreau', 'Simon', 'Laurent', 'Lefebvre', 'Michel', 'Garcia', 'David', 'Bertrand', 'Roux', 'Vincent', 'Fournier'],
    'ja-JP': ['佐藤', '鈴木', '高橋', '田中', '渡辺', '伊藤', '山田', '中村', '小林', '加藤', '吉田', '山本', '佐々木', '山口', '松本', '井上', '木村', '林', '斎藤', '清水']
};

const BOOK_TITLES = {
    'en-US': ['The Silent Echo', 'Beyond the Horizon', 'Whispers of Time', 'The Last Guardian', 'Echoes of Yesterday', 'The Hidden Truth', 'Shadows of the Past', 'The Golden Path', 'Mystery of the Deep', 'The Lost Kingdom', 'Tales of Wonder', 'The Secret Garden', 'Beyond the Stars', 'The Ancient Code', 'Whispers in the Wind'],
    'de-DE': ['Das Schweigen der Nacht', 'Jenseits des Horizonts', 'Flüster der Zeit', 'Der Letzte Wächter', 'Echos von Gestern', 'Die Versteckte Wahrheit', 'Schatten der Vergangenheit', 'Der Goldene Pfad', 'Geheimnis der Tiefe', 'Das Verlorene Königreich', 'Geschichten des Wunders', 'Der Geheime Garten', 'Jenseits der Sterne', 'Der Alte Code', 'Flüster im Wind'],
    'fr-FR': ['L\'Écho Silencieux', 'Au-delà de l\'Horizon', 'Murmures du Temps', 'Le Dernier Gardien', 'Échos d\'Hier', 'La Vérité Cachée', 'Ombres du Passé', 'Le Chemin Doré', 'Mystère des Profondeurs', 'Le Royaume Perdu', 'Contes de Merveilles', 'Le Jardin Secret', 'Au-delà des Étoiles', 'L\'Ancien Code', 'Murmures dans le Vent'],
    'ja-JP': ['静寂のエコー', '地平線の向こう', '時のささやき', '最後の守護者', '昨日のエコー', '隠された真実', '過去の影', '黄金の道', '深淵の謎', '失われた王国', '驚異の物語', '秘密の庭', '星の向こう', '古代の暗号', '風のささやき']
};

const PUBLISHERS = {
    'en-US': ['Random House', 'Penguin Books', 'HarperCollins', 'Simon & Schuster', 'Macmillan', 'Scholastic', 'Bloomsbury', 'Hachette', 'Wiley', 'Oxford University Press'],
    'de-DE': ['Random House', 'Penguin Verlag', 'HarperCollins', 'Simon & Schuster', 'Macmillan', 'Scholastic', 'Bloomsbury', 'Hachette', 'Wiley', 'Oxford University Press'],
    'fr-FR': ['Random House', 'Penguin Livres', 'HarperCollins', 'Simon & Schuster', 'Macmillan', 'Scholastic', 'Bloomsbury', 'Hachette', 'Wiley', 'Oxford University Press'],
    'ja-JP': ['ランダムハウス', 'ペンギンブックス', 'ハーパーコリンズ', 'サイモン&シュスター', 'マクミラン', 'スコラスティック', 'ブルームズベリー', 'アシェット', 'ワイリー', 'オックスフォード大学出版局']
};

// Helper function to get random item from array using seeded random
function getRandomItem(array, rng) {
    return array[Math.floor(rng() * array.length)];
}

// Function to generate author name using language-specific data
function generateAuthorName(rng, region = 'en-US') {
    const firstNames = FIRST_NAMES[region] || FIRST_NAMES['en-US'];
    const lastNames = LAST_NAMES[region] || LAST_NAMES['en-US'];
    
    const firstName = getRandomItem(firstNames, rng);
    const lastName = getRandomItem(lastNames, rng);
    
    return `${firstName} ${lastName}`;
}

// Function to generate book title using language-specific data
function generateBookTitle(rng, region = 'en-US') {
    const titles = BOOK_TITLES[region] || BOOK_TITLES['en-US'];
    return getRandomItem(titles, rng);
}

// Function to generate publisher name using language-specific data
function generatePublisherName(rng, region = 'en-US') {
    const publishers = PUBLISHERS[region] || PUBLISHERS['en-US'];
    return getRandomItem(publishers, rng);
}

// Function to generate review text
function generateReviewText(rng, region = 'en-US') {
    const reviews = {
        'en-US': ['Excellent book! Highly recommended.', 'A masterpiece that will stand the test of time.', 'Outstanding quality and engaging narrative.', 'Wonderful story with compelling characters.', 'Amazing content that keeps you hooked.'],
        'de-DE': ['Ausgezeichnetes Buch! Sehr empfehlenswert.', 'Ein Meisterwerk, das die Zeit überdauern wird.', 'Hervorragende Qualität und fesselnde Erzählung.', 'Wundervolle Geschichte mit überzeugenden Charakteren.', 'Erstaunlicher Inhalt, der einen fesselt.'],
        'fr-FR': ['Excellent livre! Très recommandé.', 'Un chef-d\'œuvre qui résistera à l\'épreuve du temps.', 'Qualité exceptionnelle et narration engageante.', 'Histoire merveilleuse avec des personnages convaincants.', 'Contenu incroyable qui vous tient en haleine.'],
        'ja-JP': ['素晴らしい本です！とてもおすすめです。', '時を超えて残る傑作です。', '素晴らしい品質と魅力的な物語です。', '魅力的なキャラクターを持つ素晴らしい物語です。', '最初から最後まで引き込まれる驚くべき内容です。']
    };
    
    const regionReviews = reviews[region] || reviews['en-US'];
    return getRandomItem(regionReviews, rng);
}

// Function to generate ISBN
function generateISBN(rng) {
    const prefix = '978';
    const group = Math.floor(rng() * 10);
    const publisher = Math.floor(rng() * 100000);
    const title = Math.floor(rng() * 10000);
    const checkDigit = Math.floor(rng() * 10);

    return `${prefix}-${group}-${publisher.toString().padStart(5, '0')}-${title.toString().padStart(4, '0')}-${checkDigit}`;
}

// Main function to generate books with proper seeding
function generateBooks({ page, limit, seed, region, avgLikes, avgReviews }) {
    // Combine user seed with page number for deterministic but different data per page
    // Using multiplication to ensure different pages have different data
    const combinedSeed = parseInt(seed) * 1000 + parseInt(page);
    const rng = seedrandom(combinedSeed.toString());

    // Ensure parameters are numbers
    const avgLikesNum = parseFloat(avgLikes);
    const avgReviewsNum = parseFloat(avgReviews);

    const books = [];
    // Calculate start index based on actual books loaded in previous pages
    // Page 1: 20 books (1-20), Page 2: 10 books (21-30), Page 3: 10 books (31-40), etc.
    const startIndex = page === 1 ? 1 : 20 + (page - 2) * 10 + 1;

    for (let i = 0; i < limit; i++) {
        const bookIndex = startIndex + i;
        // Create unique seed for each book to ensure consistent data
        const bookSeed = combinedSeed * 10000 + bookIndex;
        const bookRng = seedrandom(bookSeed.toString());

        // Generate book data - titles and authors depend only on seed and record number
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
            likes = randomValue < avgLikesNum ? 1 : 0;
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
            reviewCount = randomValue < avgReviewsNum ? 1 : 0;
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

module.exports = { generateBooks }; 