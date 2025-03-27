// Dictionary management
const DICTIONARY_URL = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt';
const CACHE_KEY = 'word_puzzle_dictionary';

export async function loadDictionary() {
    // Try to load from cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        try {
            const parsed = JSON.parse(cached);
            console.log('Loaded dictionary from cache:', parsed.length, 'words');
            return new Set(parsed);
        } catch (e) {
            console.error('Failed to parse cached dictionary');
        }
    }

    // If no cache or parse failed, fetch from source
    try {
        const response = await fetch(DICTIONARY_URL);
        const text = await response.text();
        const words = text.split('\n')
            .map(word => word.trim().toLowerCase())
            .filter(word => {
                // Only include words that are 3-5 letters long and contain only letters
                const len = word.length;
                return len >= 3 && len <= 5 && /^[a-z]+$/.test(word);
            });

        // Cache the dictionary
        localStorage.setItem(CACHE_KEY, JSON.stringify(words));
        console.log('Loaded dictionary from source:', words.length, 'words');
        return new Set(words);
    } catch (error) {
        console.error('Failed to fetch dictionary:', error);
        // Return a basic set of words as fallback
        return new Set([
            // Basic 3-letter words
            'cat', 'dog', 'rat', 'mat', 'sat', 'eat', 'hat', 'bat', 'pat',
            'tap', 'map', 'pad', 'sad', 'car', 'bar', 'tar', 'far', 'war',
            'art', 'ant', 'pen', 'ten', 'den', 'hen', 'men', 'zen',
            // Basic 4-letter words
            'word', 'rock', 'back', 'deck', 'farm', 'hand', 'jump', 'king',
            'lamp', 'mind', 'note', 'park', 'quit', 'rain', 'stop', 'time',
            // Basic 5-letter words
            'words', 'world', 'beach', 'clock', 'dream', 'earth', 'flame',
            'green', 'heart', 'light', 'music', 'ocean', 'peace', 'queen'
        ]);
    }
} 