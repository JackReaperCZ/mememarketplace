import React from 'react';
import useCart from '../hooks/useCart';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, addItem, decreaseCount, removeItem, clearCart, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't added any memes yet.</p>
        <Link
          to="/memes"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Browse Memes
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Shopping Cart
        </h3>
        <button
          onClick={clearCart}
          className="text-sm text-red-600 hover:text-red-500 font-medium"
        >
          Clear Cart
        </button>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {cart.map((item) => (
          <li key={item.id} className="p-4 sm:p-6 flex items-center">
            <div className="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700">
              <img
                src={item.url}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-6 flex-1 flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="flex-1">
                 <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                   <Link to={`/memes/${item.id}`} className="hover:underline">{item.name}</Link>
                 </h4>
                 <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                   Rating: {item.rating}/5
                 </p>
                 <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                   ${item.price} each
                 </p>
              </div>

              <div className="mt-4 sm:mt-0 flex items-center justify-between sm:justify-end gap-6">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                  <button
                    onClick={() => decreaseCount(item.id)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 font-medium text-gray-900 dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addItem(item)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <div className="text-right min-w-[80px]">
                   <p className="text-lg font-bold text-gray-900 dark:text-white">
                     ${item.price * item.quantity}
                   </p>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                  title="Remove"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="bg-gray-50 dark:bg-gray-900 px-4 py-5 sm:px-6">
        <div className="flex justify-between items-center text-xl font-bold text-gray-900 dark:text-white">
          <span>Total</span>
          <span>${getTotalPrice()}</span>
        </div>
        <div className="mt-6">
          <button className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors">
            Proceed to Checkout <ArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
