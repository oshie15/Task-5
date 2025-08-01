const seedrandom = require('seedrandom');
const { faker } = require('@faker-js/faker');

// Language-specific data
const languageData = {
    'en-US': {
        authors: [
            'John Smith', 'Jane Doe', 'Michael Johnson', 'Sarah Wilson', 'David Brown',
            'Emily Davis', 'Robert Miller', 'Lisa Anderson', 'James Taylor', 'Jennifer Garcia',
            'William Martinez', 'Amanda Rodriguez', 'Christopher Lee', 'Jessica White', 'Daniel Harris',
            'Ashley Clark', 'Matthew Lewis', 'Nicole Walker', 'Joshua Hall', 'Stephanie Young',
            'John Lee Smith', 'Phil G. McDormand', 'Lee D. Harvey', 'Mary Johnson', 'Tom Wilson',
            'Alice Cooper', 'Bob Dylan', 'Jim Morrison', 'Janis Joplin', 'Elvis Presley'
        ],
        publishers: [
            'Random House', 'Penguin Books', 'HarperCollins', 'Simon & Schuster', 'Macmillan',
            'Hachette Book Group', 'Scholastic', 'Bloomsbury', 'Faber & Faber', 'Vintage Books',
            'Knopf Doubleday', 'Crown Publishing', 'Little, Brown', 'St. Martin\'s Press', 'Tor Books',
            'Ballantine Books', 'Bantam Books', 'Dell Publishing', 'Avon Books', 'Berkley Books'
        ]
    },
    'de-DE': {
        authors: [
            'Hans Müller', 'Anna Schmidt', 'Klaus Weber', 'Maria Fischer', 'Peter Wagner',
            'Sabine Meyer', 'Thomas Schulz', 'Ursula Becker', 'Wolfgang Hoffmann', 'Petra Schäfer',
            'Frank Koch', 'Monika Bauer', 'Jürgen Richter', 'Renate Klein', 'Dieter Wolf',
            'Brigitte Neumann', 'Manfred Zimmermann', 'Helga Krüger', 'Rainer Schmitz', 'Gisela Lange'
        ],
        publishers: [
            'Suhrkamp Verlag', 'Fischer Verlag', 'Rowohlt Verlag', 'Piper Verlag', 'dtv',
            'Carl Hanser Verlag', 'S. Fischer Verlag', 'Kiepenheuer & Witsch', 'Ullstein Verlag', 'Goldmann Verlag',
            'Heyne Verlag', 'Bastei Lübbe', 'Droemer Knaur', 'Ullstein Buchverlage', 'Blanvalet Verlag',
            'Lübbe Verlag', 'Knaur Verlag', 'Wunderlich Verlag', 'Pendo Verlag', 'Kiepenheuer & Witsch'
        ]
    },
    'fr-FR': {
        authors: [
            'Maribel Shiras', 'Capicine Semeaux', 'Jaques Albane Abelard', 'Lily-Belle de Shiraz', 'Guy de Lavrous',
            'Jaques Julie Vernes', 'Victor Hugo', 'Alexandre Dumas', 'Gustave Flaubert', 'Albert Camus',
            'Stendhal', 'Émile Zola', 'Guy de Maupassant', 'Honoré de Balzac', 'Marcel Proust',
            'Jean-Paul Sartre', 'Simone de Beauvoir', 'Albert Camus', 'Jean Cocteau', 'André Gide',
            'Colette', 'Sidonie-Gabrielle Colette', 'Marguerite Duras', 'Françoise Sagan', 'Patrick Modiano'
        ],
        publishers: [
            'Gallimard', 'Éditions du Seuil', 'Flammarion', 'Albin Michel', 'Grasset',
            'Fayard', 'Robert Laffont', 'Stock', 'Calmann-Lévy', 'Plon',
            'Hachette Livre', 'Éditions Denoël', 'Éditions de Minuit', 'Christian Bourgois', 'P.O.L',
            'Actes Sud', 'Éditions de l\'Olivier', 'Mercure de France', 'Éditions Julliard', 'Éditions Belfond'
        ]
    },
    'ja-JP': {
        authors: [
            '田中太郎', '佐藤花子', '鈴木一郎', '高橋美咲', '渡辺健太',
            '伊藤愛', '山田次郎', '中村真理', '小林正男', '加藤恵',
            '吉田大輔', '松本由美', '井上雄一', '木村麻衣', '斎藤健二',
            '山口智子', '森田和也', '池田美穂', '橋本達也', '阿部恵子',
            '山田太郎', '佐々木花子', '田中一郎', '鈴木美咲', '高橋健太'
        ],
        publishers: [
            '講談社', '集英社', '小学館', '新潮社', '文藝春秋',
            '角川書店', '光文社', 'PHP研究所', '宝島社', '幻冬舎',
            '早川書房', '東京創元社', 'ハヤカワ文庫', '創元推理文庫', '新潮文庫',
            '角川文庫', '集英社文庫', '講談社文庫', '文春文庫', '中公文庫'
        ]
    }
};

// Review templates for different languages
const reviewTemplates = {
    'en-US': [
        'This book completely changed my perspective on life.',
        'A masterpiece that will stand the test of time.',
        'I couldn\'t put it down from start to finish.',
        'The author has a unique voice that resonates deeply.',
        'An emotional rollercoaster that left me breathless.',
        'We need to navigate the redundant ASCII alarm!',
        'You can\'t navigate the port without parsing the virtual AI card!',
        'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals.',
        'The characters are so well-developed and relatable.',
        'A thought-provoking read that challenges conventional wisdom.'
    ],
    'de-DE': [
        'Dieses Buch hat meine Sicht auf das Leben völlig verändert.',
        'Ein Meisterwerk, das die Zeit überdauern wird.',
        'Ich konnte es nicht aus der Hand legen.',
        'Der Autor hat eine einzigartige Stimme, die tief berührt.',
        'Eine emotionale Achterbahnfahrt, die mich atemlos zurückließ.',
        'Die Charaktere sind so gut entwickelt und nachvollziehbar.',
        'Ein nachdenklicher Lesestoff, der konventionelle Weisheit herausfordert.',
        'Bene spoliatio comparo doloremque.',
        'Argumentum uredo sollicito caelestis nemo vinculum doloremque voveo solvo.'
    ],
    'fr-FR': [
        'Ce livre a complètement changé ma perspective sur la vie.',
        'Un chef-d\'œuvre qui résistera à l\'épreuve du temps.',
        'Je n\'ai pas pu le lâcher du début à la fin.',
        'L\'auteur a une voix unique qui résonne profondément.',
        'Des montagnes russes émotionnelles qui m\'ont laissé sans souffle.',
        'Les personnages sont si bien développés et attachants.',
        'Une lecture stimulante qui remet en question la sagesse conventionnelle.',
        'Un voyage littéraire inoubliable.',
        'Une œuvre qui restera gravée dans ma mémoire.'
    ],
    'ja-JP': [
        'この本は私の人生観を完全に変えました。',
        '時を超えて残る傑作です。',
        '最初から最後まで手放せませんでした。',
        '作者の独特な声が深く響きます。',
        '息を呑むような感情のジェットコースターでした。',
        'キャラクターがとても良く描かれていて親近感があります。',
        '従来の知恵に挑戦する考えさせられる読み物です。',
        '人生の新しい視点を与えてくれる本です。',
        '読後感が素晴らしく、心に残る作品です。',
        '現代社会への鋭い洞察が光る一冊です。'
    ]
};

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

        const data = languageData[region] || languageData['en-US'];
        const reviews = reviewTemplates[region] || reviewTemplates['en-US'];

        // Generate book data
        const title = generateBookTitle(bookRng, region);
        const author = data.authors[Math.floor(bookRng() * data.authors.length)];
        const publisher = data.publishers[Math.floor(bookRng() * data.publishers.length)];
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
            const reviewText = reviews[Math.floor(bookRng() * reviews.length)];
            const reviewerName = data.authors[Math.floor(bookRng() * data.authors.length)];
            const reviewerCompany = data.publishers[Math.floor(bookRng() * data.publishers.length)];

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