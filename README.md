## 🚀 Features

### 🔐 Authentication (Mock)
- **Login System**: Simple validation (Username > 3 chars, Password > 5 chars).
- **Private Routes**: Protects all application routes (`/dashboard`, `/memes`, `/cart`) behind a login wall.
- **Persistence**: User session is saved in `localStorage`.

### 📊 Dashboard
- **Overview**: Displays key statistics (Total memes, Categories, Cart count, Top rated meme).
- **Quick Actions**: Navigation to Memes and Cart.
- **Top Meme Preview**: Shows the highest-rated meme.

### 🖼️ Meme Browser (`/memes`)
- **Infinite Scroll**: Automatically loads more memes as you scroll.
- **Filtering**:
  - Search by name (with debounce).
  - Filter by Category.
- **Sorting**:
  - Name (A-Z)
  - Rating (High to Low)
  - Size (Large to Small)
- **Interactive Cards**: Add to cart directly or view details.
- **Loading States**: Skeleton loaders for better UX.

### 🔍 Meme Detail (`/memes/:id`)
- **Detailed View**: Large image, dimensions, box count, and price.
- **Related Memes**: Suggests other memes from the same category.
- **Add to Cart**: Functionality included.

### 🛒 Shopping Cart (`/cart`)
- **Global State**: Managed via `CartContext`.
- **Functionality**:
  - Add/Remove items.
  - Adjust quantities.
  - Real-time total price calculation (fictitious pricing model based on rating).
  - Persistence via `localStorage`.

### 🎨 Design & UX
- **Responsive**: Mobile-first design using Tailwind CSS.
- **Dark Mode**: Toggleable light/dark theme (persisted in `localStorage`).
- **Icons**: Uses `lucide-react` for consistent iconography.

## 🛠️ Tech Stack

- **Core**: [React](https://reactjs.org/) (v19), [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router](https://reactrouter.com/) (v7)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Source**: [Imgflip API](https://api.imgflip.com/)

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components (Layout, MemeCard, etc.)
├── context/          # Global state (Auth, Cart, Theme, Meme)
├── hooks/            # Custom hooks (useFetch, useLocalStorage, useCart)
├── pages/            # Page components (Dashboard, Login, Memes, etc.)
├── types/            # TypeScript interfaces and types
├── utils/            # Helper functions (meme enhancement logic)
├── App.tsx           # Main application routing
└── main.tsx          # Entry point
```

## 🧩 Hooks

1.  **`useFetch(url)`**: A generic hook for fetching data from APIs with loading and error states.
2.  **`useLocalStorage(key, initialValue)`**: Manages state synchronized with browser's `localStorage`.
3.  **`useCart()`**: Provides access to cart operations and state via `CartContext`.

## 🏃‍♂️ Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 📝 Usage Guide

1.  **Login**: Enter any username (min 3 chars) and password (min 5 chars).
2.  **Browse**: Navigate to "Memes" to see the collection. Use filters to find specific content.
3.  **Collect**: Add memes to your cart.
4.  **Manage**: Go to "Cart" to review your collection or clear it.
5.  **Theme**: Click the sun/moon icon in the header to toggle dark mode.
