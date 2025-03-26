import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaUtensils, FaFireAlt } from 'react-icons/fa';
import foodItemsData from '../../../db.json';

const DigitalMenuCard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const foodItems = foodItemsData.foodItems || [];

  // Initialize categories and filtered items
  useEffect(() => {
    const uniqueCategories = ['All', ...new Set(foodItems.map(item => item.category))];
    setCategories(uniqueCategories);
    setFilteredItems(foodItems);
  }, [foodItems]);

  // Filter items based on search and category
  useEffect(() => {
    const filtered = foodItems.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'All' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    setFilteredItems(filtered);
  }, [searchQuery, selectedCategory, foodItems]);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Handle item selection
  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  // Close item details
  const handleCloseItemDetails = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-4">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-red-800 flex items-center justify-center">
          <FaUtensils className="mr-3 text-red-500" />
          WebReich Menu
          <FaFireAlt className="ml-3 text-red-500" />
        </h1>
        <p className="text-red-600 mt-2">Discover Delicious Flavors</p>
      </header>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6 relative">
        <div className="relative shadow-md rounded-full">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-400" />
          <input
            type="text"
            placeholder="Search your favorite dishes..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-300 focus:outline-none transition-all duration-300 bg-white"
          />
        </div>
      </div>

      {/* Category Scrollable Selector */}
      <div 
        className="flex overflow-x-scroll space-x-3 mb-6 pb-4 no-scrollbar scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`
              flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
              ${selectedCategory === category 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-red-100 text-red-700 hover:bg-red-200'}
            `}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            onClick={() => handleItemSelect(item)}
            className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            whileTap={{ scale: 0.95 }}
          >
            <div 
              className="h-48 bg-cover bg-center relative overflow-hidden"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-bold text-lg mb-2 text-red-800">{item.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-red-600 font-semibold text-xl">₹{item.price}</span>
                <span 
                  className={`
                    text-xs px-2 py-1 rounded-full font-bold
                    ${item.subCategory === 'Veg' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'}
                  `}
                >
                  {item.subCategory}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Item Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-11/12 max-w-md rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div 
                className="h-72 bg-cover bg-center relative"
                style={{ 
                  backgroundImage: `url(${selectedItem.image})`,
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <button 
                  onClick={handleCloseItemDetails}
                  className="absolute top-4 right-4 bg-white/80 p-2 rounded-full text-red-600 hover:bg-white hover:text-red-800 transition-all"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 bg-white">
                <h2 className="text-3xl font-bold mb-2 text-red-800">{selectedItem.name}</h2>
                <p className="text-gray-600 mb-4 text-sm">{selectedItem.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-red-600">₹{selectedItem.price}</span>
                    {selectedItem.discountPrice && (
                      <span className="line-through text-gray-400 ml-2 text-sm">
                        ₹{selectedItem.discountPrice}
                      </span>
                    )}
                  </div>
                  <span 
                    className={`
                      text-sm px-3 py-1 rounded-full font-bold
                      ${selectedItem.subCategory === 'Veg' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'}
                    `}
                  >
                    {selectedItem.subCategory}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DigitalMenuCard;