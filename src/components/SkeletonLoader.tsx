import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg h-96">
      <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
      <div className="p-4 space-y-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        <div className="flex justify-between mt-4">
           <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
           <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
