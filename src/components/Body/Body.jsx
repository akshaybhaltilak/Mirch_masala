import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaUtensils, FaFireAlt, FaTag, 
  FaHeart, FaThumbsUp, FaTimes, FaFilter 
} from 'react-icons/fa';
import foodItemsData from '../../../db.json';

const DigitalMenuCard = () => {
  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Enhanced Offer Images with more details
  const offerImages = [
    {
      image: '/images/offer1.jpg',
      title: 'Weekend Special Feast',
      description: 'Flat 30% OFF on All Main Courses!',
      icon: <FaHeart className="mr-3 text-pink-400" />
    },
    {
      image: '/images/offer2.jpg', 
      title: 'Family Combo Delight',
      description: 'Buy 2 Get 1 Free on Family Meals!',
      icon: <FaThumbsUp className="mr-3 text-blue-400" />
    },
    {
      image: '/images/offer3.jpg',
      title: 'Lunch Time Bonanza',
      description: 'Extra 20% Cashback on Lunch Orders!',
      icon: <FaTag className="mr-3 text-yellow-400" />
    }
  ];

  const foodItems = useMemo(() => foodItemsData.foodItems || [], []);

  // Offer Carousel Effect
  useEffect(() => {
    const offerInterval = setInterval(() => {
      setCurrentOfferIndex((prevIndex) => 
        (prevIndex + 1) % offerImages.length
      );
    }, 5000);

    return () => clearInterval(offerInterval);
  }, []);

  // Initialize Categories and Filtered Items
  useEffect(() => {
    const uniqueCategories = ['All', ...new Set(foodItems.map(item => item.category))];
    setCategories(uniqueCategories);
    setFilteredItems(foodItems);
  }, [foodItems]);

  // Advanced Filtering
  const filterItems = useCallback(() => {
    return foodItems.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'All' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, foodItems]);

  // Update Filtered Items
  useEffect(() => {
    setFilteredItems(filterItems());
  }, [filterItems]);

  // Event Handlers
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsMobileFilterOpen(false);
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  const handleCloseItemDetails = () => {
    setSelectedItem(null);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-4 max-w-7xl mx-auto">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-red-800 flex items-center justify-center">
          <FaUtensils className="mr-3 text-red-500 text-2xl md:text-3xl" />
          WebReich Menu
          <FaFireAlt className="ml-3 text-red-500 text-2xl md:text-3xl" />
        </h1>
        <p className="text-red-600 mt-2 text-sm md:text-base">Discover Delicious Flavors</p>
      </header>

      {/* Offers Section */}
      <div className="mb-8 relative overflow-hidden rounded-2xl shadow-lg h-48 md:h-72">
        <AnimatePresence>
          {offerImages.map((offer, index) => (
            currentOfferIndex === index && (
              <motion.div
                key={index}
                className="absolute w-full h-full bg-cover bg-center flex items-end"
                style={{ 
                  backgroundImage: `url(${offer.image})`,
                  backgroundSize: 'cover'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                
                <div className="relative z-10 p-4 md:p-6 w-full text-white">
                  <div className="flex items-center mb-2">
                    {offer.icon}
                    <h2 className="text-xl md:text-2xl font-bold">{offer.title}</h2>
                  </div>
                  <p className="text-sm md:text-lg font-medium">{offer.description}</p>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
        
        {/* Offer Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {offerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentOfferIndex(index)}
              className={`
                w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 transform
                ${currentOfferIndex === index 
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-white/50 hover:scale-110'}
              `}
            />
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6 relative">
        <div className="relative shadow-md rounded-full">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-400" />
          <input
            type="text"
            placeholder="Search your favorite dishes..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-2 md:py-3 rounded-full border-2 border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-300 focus:outline-none transition-all duration-300 bg-white text-sm md:text-base"
          />
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex justify-center mb-4">
        <button 
          onClick={toggleMobileFilter}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-full"
        >
          <FaFilter className="mr-2" />
          Filter Categories
        </button>
      </div>

      {/* Mobile Category Modal */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full rounded-t-2xl p-6 max-h-[70vh] overflow-y-auto"
              initial={{ translateY: '100%' }}
              animate={{ translateY: 0 }}
              exit={{ translateY: '100%' }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Select Category</h2>
                <button 
                  onClick={toggleMobileFilter}
                  className="text-red-500"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`
                      px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300
                      ${selectedCategory === category 
                        ? 'bg-red-500 text-white shadow-lg' 
                        : 'bg-red-100 text-red-700 hover:bg-red-200'}
                    `}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Category Scrollable Selector */}
      <div 
        className="hidden md:flex overflow-x-scroll space-x-3 mb-6 pb-4 no-scrollbar scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            onClick={() => handleItemSelect(item)}
            className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            whileTap={{ scale: 0.95 }}
          >
            <div 
              className="h-32 md:h-48 bg-cover bg-center relative overflow-hidden"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div className="p-3 md:p-4 bg-white">
              <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2 text-red-800 truncate">{item.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-red-600 font-semibold text-sm md:text-xl">₹{item.price}</span>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div 
                className="h-48 md:h-72 bg-cover bg-center relative"
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
                  <FaTimes />
                </button>
              </div>
              <div className="p-4 md:p-6 bg-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-red-800">{selectedItem.name}</h2>
                <p className="text-gray-600 mb-4 text-xs md:text-sm">{selectedItem.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xl md:text-2xl font-bold text-red-600">₹{selectedItem.price}</span>
                    {selectedItem.discountPrice && (
                      <span className="line-through text-gray-400 ml-2 text-sm">
                        ₹{selectedItem.discountPrice}
                      </span>
                    )}
                  </div>
                  <span 
                    className={`
                      text-xs px-3 py-1 rounded-full font-bold
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