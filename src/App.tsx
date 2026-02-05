import { Github } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import ThreeBackground from './components/ThreeBackground';
import { motion } from 'framer-motion';

function App() {

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center selection:bg-blue-500/30">
      {/* 3D Background */}
      <ThreeBackground />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            S
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
            SwiftSearch
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Github className="w-5 h-5 text-gray-300" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center justify-center px-4 -mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-3xl text-center space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Instant Search <br />
              <span className="text-blue-500">at the Speed of Thought</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Experience lightning-fast autocomplete powered by an optimized Trie data structure.
              Search through thousands of developer terms instantly.
            </p>
          </div>

          {/* Search Component */}
          <div className="pt-8">
            <SearchBar />
          </div>

          <div className="pt-12 flex gap-4 justify-center text-sm text-gray-500 font-medium">
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              Trie Data Structure
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              O(L) Lookups
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              React Three Fiber
            </span>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full p-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© 2026 SwiftSearch Demo. Built with React & Vite.</p>
      </footer>
    </div>
  );
}

export default App;
