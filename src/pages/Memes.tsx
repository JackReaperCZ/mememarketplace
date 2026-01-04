import React, { useState, useEffect, useMemo } from 'react';
import { useMemes } from '../context/MemeContext';
import MemeCard from '../components/MemeCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { CATEGORIES } from '../utils/memeUtils';
import { Search, Filter, SortAsc } from 'lucide-react';

const PAGE_SIZE = 12;

const Memes = () => {
  const { memes, loading, error } = useMemes();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'size'>('name');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Filter and Sort
  const filteredMemes = useMemo(() => {
    let result = [...memes];

    // Search
    if (debouncedSearch) {
      result = result.filter((meme) =>
        meme.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Category
    if (selectedCategory !== 'All') {
      result = result.filter((meme) => meme.category === selectedCategory);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'size') {
        return (b.width * b.height) - (a.width * a.height);
      }
      return 0;
    });

    return result;
  }, [memes, debouncedSearch, selectedCategory, sortBy]);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredMemes.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredMemes.length]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [debouncedSearch, selectedCategory, sortBy]);

  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Nepodařilo se načíst memy 😢</h2>
        <p className="text-gray-500 mt-2">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search memes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-500 dark:text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <SortAsc size={20} className="text-gray-500 dark:text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="name">Name (A-Z)</option>
              <option value="rating">Rating (High to Low)</option>
              <option value="size">Size (Large to Small)</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <SkeletonLoader key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMemes.slice(0, visibleCount).map((meme) => (
              <MemeCard key={meme.id} meme={meme} />
            ))}
          </div>
          
          {filteredMemes.length === 0 && (
             <div className="text-center py-10 text-gray-500 dark:text-gray-400">
               No memes found matching your criteria.
             </div>
          )}
          
          {visibleCount < filteredMemes.length && (
             <div className="text-center py-4 text-gray-500 dark:text-gray-400 animate-pulse">
               Loading more memes...
             </div>
          )}
        </>
      )}
    </div>
  );
};

export default Memes;
