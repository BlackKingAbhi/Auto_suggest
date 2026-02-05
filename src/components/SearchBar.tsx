import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTrie } from '../hooks/useTrie';
import { cn } from '../lib/utils';

interface SearchBarProps {
    className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { suggestions, search } = useTrie();

    useEffect(() => {
        search(query);
        setActiveIndex(-1); // Reset selection on query change
        setIsOpen(!!query);
    }, [query]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen || suggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex >= 0) {
                selectSuggestion(suggestions[activeIndex]);
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
            inputRef.current?.blur();
        }
    };

    const selectSuggestion = (word: string) => {
        setQuery(word);
        setIsOpen(false);
        setActiveIndex(-1);
        inputRef.current?.focus();
    };

    return (
        <div ref={containerRef} className={cn("relative w-full max-w-2xl mx-auto z-50", className)}>
            <div className="relative group">
                <div className={cn(
                    "absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500 pointer-events-none"
                )} />

                <div className={cn(
                    "relative flex items-center bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-lg transition-all duration-300",
                    isOpen && suggestions.length > 0 ? "rounded-b-none border-b-0 shadow-none" : "hover:shadow-xl"
                )}>
                    <Search className="ml-4 w-6 h-6 text-gray-500 dark:text-gray-400" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => query && setIsOpen(true)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search for technologies..."
                        className="w-full bg-transparent border-none px-4 py-4 text-lg focus:outline-none focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                        autoFocus
                    />
                    {query && (
                        <button
                            onClick={() => { setQuery(''); setIsOpen(false); inputRef.current?.focus(); }}
                            className="mr-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && suggestions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-t-0 border-white/20 dark:border-white/10 rounded-b-2xl shadow-xl overflow-hidden"
                    >
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent opacity-50" />
                        <ul className="py-2">
                            {suggestions.map((suggestion, index) => (
                                <li key={suggestion}>
                                    <button
                                        onClick={() => selectSuggestion(suggestion)}
                                        onMouseEnter={() => setActiveIndex(index)}
                                        className={cn(
                                            "w-full text-left px-6 py-3 flex items-center gap-3 transition-colors duration-200",
                                            activeIndex === index
                                                ? "bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                                        )}
                                    >
                                        <Search className={cn("w-4 h-4", activeIndex === index ? "opacity-100" : "opacity-50")} />
                                        <span className="flex-1">
                                            {/* Highlight prefix logic could go here */}
                                            <HighlightMatch text={suggestion} match={query} />
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-900/30 text-xs text-gray-400 flex justify-between rounded-b-2xl">
                            <span>{suggestions.length} suggestions</span>
                            <span className="flex gap-2">
                                <kbd className="font-sans px-1 rounded bg-gray-200 dark:bg-gray-800">↑</kbd>
                                <kbd className="font-sans px-1 rounded bg-gray-200 dark:bg-gray-800">↓</kbd>
                                <kbd className="font-sans px-1 rounded bg-gray-200 dark:bg-gray-800">↵</kbd>
                                to navigate
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Simple highlighter component
function HighlightMatch({ text, match }: { text: string, match: string }) {
    if (!match) return <>{text}</>;

    const parts = text.split(new RegExp(`(${match})`, 'gi'));
    return (
        <>
            {parts.map((part, i) =>
                part.toLowerCase() === match.toLowerCase() ? (
                    <span key={i} className="font-bold">{part}</span>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </>
    );
}
