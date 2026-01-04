import React from 'react';
import { Link } from 'react-router-dom';
import type { Meme } from '../types';
import useCart from '../hooks/useCart';
import { Star, ShoppingCart } from 'lucide-react';

interface MemeCardProps {
  meme: Meme;
}

const MemeCard: React.FC<MemeCardProps> = ({ meme }) => {
  const { addItem } = useCart();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 sm:h-64 overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img
          src={meme.url}
          alt={meme.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs font-bold backdrop-blur-sm">
          {meme.category}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1" title={meme.name}>
          {meme.name}
        </h3>
        
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < meme.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
            />
          ))}
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            ({meme.rating})
          </span>
        </div>

        <div className="mt-auto flex justify-between items-center gap-2">
           <Link
            to={`/memes/${meme.id}`}
            className="flex-1 text-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Details
          </Link>
          <button
            onClick={() => addItem(meme)}
            className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <ShoppingCart size={16} className="mr-2" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemeCard;
