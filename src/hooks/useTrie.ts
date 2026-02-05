import { useState } from 'react';
import { Trie } from '../trie/Trie';
import { words } from '../data/words';

// Initialize Trie once (Singleton pattern for this demo)
const trieInstance = new Trie();
// Optimization: Bulk insert using a loop is fast for 5000 words (<10ms)
// We do this eagerly or we could do it in an effect.
// Given the requirements, we want it ready.
words.forEach(word => trieInstance.insert(word));

export function useTrie() {
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // Prefix search function
    const search = (prefix: string) => {
        if (!prefix) {
            setSuggestions([]);
            return;
        }
        // Performance: Trie lookup is O(L)
        const results = trieInstance.findWordsWithPrefix(prefix, 8); // Limit 8
        setSuggestions(results);
    };

    // Insert new word (e.g. from history or user input if we wanted to learn)
    const addWord = (word: string) => {
        trieInstance.insert(word);
    };

    return {
        suggestions,
        search,
        addWord
    };
}
