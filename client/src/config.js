// Centralized language configurations for the React frontend
const LANGUAGES = {
    'en-US': {
        name: 'English',
        locale: 'en-US',
        displayName: 'English'
    },
    'de-DE': {
        name: 'Deutsch',
        locale: 'de-DE',
        displayName: 'Deutsch'
    },
    'fr-FR': {
        name: 'Français',
        locale: 'fr-FR',
        displayName: 'Français'
    },
    'ja-JP': {
        name: '日本語',
        locale: 'ja-JP',
        displayName: '日本語'
    }
};

// Helper function to get language options for dropdown
function getLanguageOptions() {
    return Object.entries(LANGUAGES).map(([key, lang]) => ({
        value: key,
        label: lang.displayName
    }));
}

// Helper function to get language configuration
function getLanguageConfig(region = 'en-US') {
    return LANGUAGES[region] || LANGUAGES['en-US'];
}

// Helper function to get all available languages
function getAvailableLanguages() {
    return Object.keys(LANGUAGES);
}

export {
    LANGUAGES,
    getLanguageOptions,
    getLanguageConfig,
    getAvailableLanguages
}; 