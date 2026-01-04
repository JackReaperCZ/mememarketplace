import React from 'react';
import { useMemes } from '../context/MemeContext';
import useCart from '../hooks/useCart';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../utils/memeUtils';
import { BarChart, Image, ShoppingBag, Star } from 'lucide-react';

const DashboardCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className={`flex-shrink-0 p-3 rounded-md ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {title}
            </dt>
            <dd>
              <div className="text-lg font-medium text-gray-900 dark:text-white">
                {value}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { memes, loading, error } = useMemes();
  const { getItemCount } = useCart();

  if (loading) return <div className="p-8 text-center">Loading Dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error loading data.</div>;

  const topRatedMeme = [...memes].sort((a, b) => b.rating - a.rating)[0];
  const totalCategories = CATEGORIES.length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard 
          title="Total Memes" 
          value={memes.length} 
          icon={Image} 
          color="bg-indigo-500" 
        />
        <DashboardCard 
          title="Categories" 
          value={totalCategories} 
          icon={BarChart} 
          color="bg-green-500" 
        />
        <DashboardCard 
          title="Items in Cart" 
          value={getItemCount()} 
          icon={ShoppingBag} 
          color="bg-yellow-500" 
        />
        <DashboardCard 
          title="Top Rated Rating" 
          value={`${topRatedMeme?.rating || 0} / 5`} 
          icon={Star} 
          color="bg-red-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Top Meme Preview */}
         {topRatedMeme && (
          <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
              Top Rated Meme
            </h3>
            <div className="flex flex-col items-center">
              <img 
                src={topRatedMeme.url} 
                alt={topRatedMeme.name} 
                className="max-h-64 object-contain rounded-lg shadow-sm"
              />
              <p className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{topRatedMeme.name}</p>
              <div className="flex items-center mt-2">
                 {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < topRatedMeme.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6 flex flex-col justify-center items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <Link
            to="/memes"
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Browse Memes
          </Link>
          <Link
            to="/cart"
            className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
