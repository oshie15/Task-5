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
        'en-US': [
            'This book completely exceeded my expectations. The author masterfully weaves together complex themes with such clarity that you can\'t help but be drawn into the narrative.',
            'I found myself staying up late into the night, unable to put this book down. The character development is exceptional, and the plot twists kept me guessing until the very end.',
            'What sets this book apart is the author\'s unique voice and perspective. It\'s refreshing to read something that feels genuinely original in today\'s literary landscape.',
            'The prose is absolutely beautiful - every sentence feels carefully crafted. This is the kind of book you\'ll want to read slowly, savoring each chapter.',
            'I was skeptical at first, but this book won me over completely. The world-building is immersive, and the dialogue feels natural and engaging throughout.',
            'This is exactly the kind of book I love to recommend to friends. It\'s intelligent, entertaining, and leaves you with something to think about long after you\'ve finished.',
            'The pacing is perfect - never too slow, never too rushed. The author has a real talent for keeping readers engaged while building tension and developing characters.',
            'I appreciate how the author doesn\'t shy away from difficult topics. The book handles complex themes with sensitivity and nuance, making it both thought-provoking and accessible.',
            'The ending was satisfying without being predictable. It\'s rare to find a book that ties up loose ends so well while still leaving room for the reader\'s imagination.',
            'This book has earned a permanent place on my bookshelf. I know I\'ll be revisiting it again and again, discovering new layers with each read.',
            'The historical research that went into this book is evident on every page. It\'s clear the author did their homework, and it makes the story all the more compelling.',
            'I love how the author creates such vivid imagery. I could practically see, hear, and smell the world they were describing. It\'s truly immersive storytelling.',
            'This book tackles important social issues without being preachy. The message is woven naturally into the story, making it both educational and entertaining.',
            'The character relationships are so well-developed. You really feel like you know these people by the end of the book, and you care about what happens to them.',
            'I was impressed by the author\'s ability to write from multiple perspectives. Each character has a distinct voice, and the shifting viewpoints add depth to the story.'
        ],
        'de-DE': [
            'Dieses Buch hat meine Erwartungen völlig übertroffen. Der Autor verwebt meisterhaft komplexe Themen mit solcher Klarheit, dass man einfach in die Erzählung hineingezogen wird.',
            'Ich habe mich dabei ertappt, bis spät in die Nacht wach zu bleiben, unfähig, dieses Buch aus der Hand zu legen. Die Charakterentwicklung ist außergewöhnlich.',
            'Was dieses Buch auszeichnet, ist die einzigartige Stimme und Perspektive des Autors. Es ist erfrischend, etwas zu lesen, das sich in der heutigen Literaturlandschaft wirklich originell anfühlt.',
            'Die Prosa ist absolut wunderschön - jeder Satz fühlt sich sorgfältig gestaltet an. Dies ist die Art von Buch, das man langsam lesen möchte.',
            'Ich war zunächst skeptisch, aber dieses Buch hat mich völlig überzeugt. Die Weltgestaltung ist immersiv und der Dialog fühlt sich natürlich und fesselnd an.',
            'Dies ist genau die Art von Buch, die ich gerne Freunden empfehle. Es ist intelligent, unterhaltsam und lässt einen noch lange nach dem Lesen nachdenken.',
            'Das Tempo ist perfekt - nie zu langsam, nie zu überstürzt. Der Autor hat ein echtes Talent dafür, Leser zu fesseln.',
            'Ich schätze, wie der Autor schwierige Themen nicht scheut. Das Buch behandelt komplexe Themen mit Sensibilität und Nuancen.',
            'Das Ende war befriedigend, ohne vorhersehbar zu sein. Es ist selten, ein Buch zu finden, das lose Enden so gut zusammenbindet.',
            'Dieses Buch hat einen dauerhaften Platz in meinem Bücherregal verdient. Ich weiß, dass ich es immer wieder lesen werde.',
            'Die historische Recherche, die in dieses Buch gesteckt wurde, ist auf jeder Seite spürbar. Es ist klar, dass der Autor seine Hausaufgaben gemacht hat.',
            'Ich liebe, wie der Autor so lebendige Bilder schafft. Ich konnte die beschriebene Welt praktisch sehen, hören und riechen.',
            'Dieses Buch behandelt wichtige soziale Themen, ohne belehrend zu wirken. Die Botschaft ist natürlich in die Geschichte verwoben.',
            'Die Charakterbeziehungen sind so gut entwickelt. Am Ende des Buches fühlt man sich, als würde man diese Menschen wirklich kennen.',
            'Ich war beeindruckt von der Fähigkeit des Autors, aus mehreren Perspektiven zu schreiben. Jeder Charakter hat eine eigene Stimme.'
        ],
        'fr-FR': [
            'Ce livre a complètement dépassé mes attentes. L\'auteur tisse magistralement des thèmes complexes avec une telle clarté qu\'on ne peut s\'empêcher d\'être entraîné dans le récit.',
            'Je me suis surpris à veiller tard dans la nuit, incapable de poser ce livre. Le développement des personnages est exceptionnel et les rebondissements m\'ont tenu en haleine.',
            'Ce qui distingue ce livre, c\'est la voix et la perspective uniques de l\'auteur. C\'est rafraîchissant de lire quelque chose qui semble vraiment original.',
            'La prose est absolument magnifique - chaque phrase semble soigneusement élaborée. C\'est le genre de livre qu\'on veut lire lentement.',
            'J\'étais sceptique au début, mais ce livre m\'a complètement conquis. La construction du monde est immersive et les dialogues semblent naturels.',
            'C\'est exactement le genre de livre que j\'aime recommander aux amis. Il est intelligent, divertissant et laisse à réfléchir.',
            'Le rythme est parfait - jamais trop lent, jamais trop précipité. L\'auteur a un vrai talent pour maintenir l\'intérêt des lecteurs.',
            'J\'apprécie que l\'auteur n\'esquive pas les sujets difficiles. Le livre traite des thèmes complexes avec sensibilité.',
            'La fin était satisfaisante sans être prévisible. Il est rare de trouver un livre qui noue si bien les fils de l\'intrigue.',
            'Ce livre a mérité une place permanente dans ma bibliothèque. Je sais que je le relirai encore et encore.',
            'Les recherches historiques qui ont été menées pour ce livre sont évidentes à chaque page. L\'auteur a fait ses devoirs.',
            'J\'aime comment l\'auteur crée des images si vives. Je pouvais pratiquement voir, entendre et sentir le monde décrit.',
            'Ce livre aborde des questions sociales importantes sans être moralisateur. Le message est naturellement tissé dans l\'histoire.',
            'Les relations entre les personnages sont si bien développées. On a vraiment l\'impression de connaître ces gens à la fin.',
            'J\'étais impressionné par la capacité de l\'auteur à écrire depuis plusieurs perspectives. Chaque personnage a sa propre voix.'
        ],
        'ja-JP': [
            'この本は私の期待を完全に上回りました。著者は複雑なテーマを巧みに織り交ぜ、読者を物語に引き込まずにはいられません。',
            '夜遅くまで起きて、この本を手放せない自分に気づきました。キャラクターの成長は素晴らしく、プロットの展開に最後まで釘付けでした。',
            'この本を際立たせているのは、著者の独特な声と視点です。現代の文学界で本当に独創的だと感じるものを読むのは新鮮です。',
            '文章が絶対に美しいです - 一文一文が丁寧に作られているように感じます。これはゆっくり読んで味わいたい本です。',
            '最初は懐疑的でしたが、この本に完全に魅了されました。世界観の構築は没入感があり、対話は自然で魅力的です。',
            'これは友達に勧めたい本です。知的で、面白く、読み終わった後も長く考えさせられます。',
            'ペースが完璧です - 遅すぎず、急ぎすぎず。著者は読者を引きつけ続ける真の才能を持っています。',
            '著者が難しいテーマを避けないことを評価します。この本は複雑なテーマを繊細さとニュアンスで扱っています。',
            '結末は予測可能ではなく満足のいくものでした。物語の糸をこれほど上手く結ぶ本を見つけるのは珍しいです。',
            'この本は私の本棚に永続的な場所を獲得しました。何度も読み返すことを知っています。',
            'この本に費やされた歴史的研究はどのページにも明らかです。著者が宿題をしたことは明確です。',
            '著者がこれほど鮮やかなイメージを作り出す方法が好きです。説明されている世界を実質的に見て、聞いて、嗅ぐことができました。',
            'この本は説教臭くなく重要な社会問題に取り組んでいます。メッセージは自然に物語に織り込まれています。',
            'キャラクターの関係はとてもよく発達しています。本の終わりには、これらの人々を本当に知っているように感じます。',
            '著者が複数の視点から書く能力に感銘を受けました。各キャラクターには独自の声があります。'
        ]
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