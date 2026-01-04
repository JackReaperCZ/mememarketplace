import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMemes } from '../context/MemeContext';
import useCart from '../hooks/useCart';
import { Star, ShoppingCart, ArrowLeft, Maximize2 } from 'lucide-react';
import MemeCard from '../components/MemeCard';

const MemeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getMemeById, memes, loading } = useMemes();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [relatedMemes, setRelatedMemes] = useState<any[]>([]);

  const meme = getMemeById(id || '');

  useEffect(() => {
    if (meme && memes.length > 0) {
      const related = memes
        .filter((m) => m.category === meme.category && m.id !== meme.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      setRelatedMemes(related);
    }
  }, [meme, memes]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (!meme) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Meme not found</h2>
        <button
          onClick={() => navigate('/memes')}
          className="mt-4 text-indigo-600 hover:text-indigo-500"
        >
          Back to Memes
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <img
              className="w-full h-full object-contain max-h-[600px]"
              src={meme.url}
              alt={meme.name}
            />
          </div>
          <div className="p-8 md:w-1/2 flex flex-col">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {meme.category}
            </div>
            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {meme.name}
            </h1>
            
            <div className="flex items-center mt-4">
               {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className={i < meme.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                />
              ))}
              <span className="ml-3 text-lg text-gray-500 dark:text-gray-400">
                {meme.rating} / 5
              </span>
            </div>

            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Dimensions
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                    <Maximize2 size={16} className="mr-2" />
                    {meme.width} x {meme.height}
                  </dd>
                </div>
                <div>
                   <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Box Count
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {meme.box_count}
                  </dd>
                </div>
                 <div>
                   <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Price (Rating * 25)
                  </dt>
                  <dd className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                    ${meme.price}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 flex-1 flex items-end">
              <button
                onClick={() => addItem(meme)}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                <ShoppingCart className="mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {relatedMemes.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Memes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedMemes.map((related) => (
              <MemeCard key={related.id} meme={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemeDetail;
