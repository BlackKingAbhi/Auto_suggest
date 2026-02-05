import { TrieNode } from './TrieNode';

export class Trie {
    root: TrieNode;
    cache: Map<string, string[]>;

    constructor() {
        this.root = new TrieNode();
        this.cache = new Map();
    }

    insert(word: string): void {
        let node = this.root;
        for (const char of word.toLowerCase()) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
        this.cache.clear(); // Invalidate cache on new insert
    }

    search(word: string): boolean {
        let node = this.root;
        for (const char of word.toLowerCase()) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEndOfWord;
    }

    findWordsWithPrefix(prefix: string, limit: number = 8): string[] {
        if (!prefix) return [];

        const lowerPrefix = prefix.toLowerCase();

        if (this.cache.has(lowerPrefix)) {
            return this.cache.get(lowerPrefix)!;
        }

        let node = this.root;
        for (const char of lowerPrefix) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }

        const words: string[] = [];
        this._dfs(node, lowerPrefix, words, limit);

        this.cache.set(lowerPrefix, words);
        return words;
    }

    private _dfs(node: TrieNode, currentPrefix: string, words: string[], limit: number): void {
        if (words.length >= limit) return;

        if (node.isEndOfWord) {
            words.push(currentPrefix);
        }

        // Sort keys for consistent order (optional, but nice)
        // For performance, we might skip sorting if keys are many, but usually it's a-z
        // iterating object keys is not guaranteed order, but typically insertion order in modern JS
        // for better UX, maybe alphabetical
        const entires = Object.entries(node.children).sort((a, b) => a[0].localeCompare(b[0]));

        for (const [char, childNode] of entires) {
            if (words.length >= limit) return;
            this._dfs(childNode, currentPrefix + char, words, limit);
        }
    }
}
