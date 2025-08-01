// Shared configuration for language-specific content
// This file can be used by both client and server

const LANGUAGES = {
    'en-US': {
        name: 'English',
        locale: 'en-US',
        displayName: 'English (US)'
    },
    'de-DE': {
        name: 'Deutsch',
        locale: 'de-DE',
        displayName: 'German (Germany)'
    },
    'fr-FR': {
        name: 'Français',
        locale: 'fr-FR',
        displayName: 'French (France)'
    },
    'ja-JP': {
        name: '日本語',
        locale: 'ja-JP',
        displayName: 'Japanese (Japan)'
    }
};

// Helper function to get language configuration
function getLanguageConfig(region = 'en-US') {
    return LANGUAGES[region] || LANGUAGES['en-US'];
}

// Helper function to get all available languages
function getAvailableLanguages() {
    return Object.keys(LANGUAGES);
}

// Helper function to get language options for UI
function getLanguageOptions() {
    return Object.entries(LANGUAGES).map(([value, config]) => ({
        value,
        label: config.displayName
    }));
}

module.exports = {
    LANGUAGES,
    getLanguageConfig,
    getAvailableLanguages,
    getLanguageOptions
}; 