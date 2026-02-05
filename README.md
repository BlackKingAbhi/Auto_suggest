# Instant Search Suggestion System (Trie Based)

A production-ready React application demonstrating a high-performance instant search search suggestion system using a **Trie (Prefix Tree)** data structure.

## 🚀 Features

- **Blazing Fast Search**: Uses a Trie data structure for O(L) prefix lookups (L = length of search query).
- **Instant Feedback**: <10ms response time with no debouncing required for local datasets.
- **Smart Suggestions**: Auto-complete for 500+ developer terms.
- **Keyboard Navigation**: Full support for Arrow Up/Down and Enter.
- **Premium UI**: 
  - Glassmorphism design (backdrop blur, transparency).
  - Smooth Framer Motion animations.
  - Interactive 3D particle background using React Three Fiber.
- **Dark/Light Mode**: Fully themable with persisted preference.

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite (TypeScript)
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js + @react-three/fiber + @react-three/drei
- **Icons**: Lucide React
- **Data Structure**: Custom Trie Class (TypeScript)

## 🧠 How It Works (The Logic)

### The Trie Data Structure
Instead of filtering an array of strings (which is O(N*L) where N is dataset size), we use a Trie.
- **Insert**: Words are inserted character by character into a tree.
- **Search**: We traverse the tree using the characters of the query. 
  - If the path exists, we perform a Depth-First Search (DFS) from that node to collect up to 8 valid word completions.
  - **Time Complexity**: **O(L)** to find the prefix node, plus **O(K)** to collect K suggestions. It is independent of the total dataset size N, making it extremely scalable.

### Optimization
- **Memoization**: Search results for specific prefixes are cached to avoid re-traversal for repeated backspacing/typing.
- **Lazy 3D**: The 3D background is lightweight and non-blocking.

## 📦 Installation & Run

1. **Clone the repository** (or use the provided files).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/               # Reusable UI components
│   ├── SearchBar.tsx     # Main search input with Trie integration
│   ├── ThreeBackground.tsx # 3D Particle effect
├── trie/
│   ├── TrieNode.ts       # Trie Node Class
│   ├── Trie.ts           # Implementation (Insert, Search, DFS)
├── hooks/
│   ├── useTrie.ts        # Hook to manage Trie instance
│   ├── useTheme.ts       # Dark mode logic
├── data/
│   └── words.ts          # Demo dataset
├── lib/
│   └── utils.ts          # Tailwind utilities
├── App.tsx               # Main layout
└── index.css             # Global styles
```

---

Built by Antigravity.
