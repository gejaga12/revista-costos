// pages/components/CategoriesList.tsx
import React from 'react';
import { FaCheckCircle, FaClock } from 'react-icons/fa';

interface CategoriesListProps {
  categories: string[];
  selectedCategory: string | null;
  handleCategoryClick: (category: string) => void;
  isCategoryCompleted: (category: string) => boolean;
}

const CategoriesList: React.FC<CategoriesListProps> = ({ categories, selectedCategory, handleCategoryClick, isCategoryCompleted }) => {
  return (
    <div className="w-1/4 bg-white dark:bg-gray-800 p-4 shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Categorías</h2>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-2 cursor-pointer border-gray-500 border-b ${selectedCategory === category ? 'bg-blue-500 text-white' : 'text-black dark:text-white'}`}
            onClick={() => handleCategoryClick(category)}
          >
            <span className='text-xs'>
              <span className={`font-semibold px-2 mr-2 bg-red-600 rounded-e-xl ${selectedCategory === category ? 'text-red-800 bg-white' : 'text-white'}`}>{index + 1}</span>{category}
            </span>
            {isCategoryCompleted(category) ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaClock className="text-yellow-500" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
