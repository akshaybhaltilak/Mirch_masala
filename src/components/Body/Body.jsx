import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaUtensils, FaFireAlt, FaTag, 
  FaHeart, FaThumbsUp, FaTimes, FaFilter,
  FaStar, FaLeaf, FaDrumstickBite, FaInfoCircle
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
  const [isScrolled, setIsScrolled] = useState(false);

  // Enhanced Offer Images with more details
  const offerImages = [
    {
      title: '🔥 Feast Frenzy Extravaganza!',
      description: 'Unlock 40% OFF on our chef\'s most exclusive gourmet creations',
      bg: 'bg-cover bg-center',
      image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: '🍕 Pizza Paradise Bonanza',
      description: 'Buy 2 Pizzas, Get 3rd FREE + Unlimited Garlic Bread!',
      bg: 'bg-cover bg-center',
      image: 'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: '🍣 Sushi Lovers Delight',
      description: 'All-You-Can-Eat Sushi Night - 50% OFF Premium Rolls!',
      bg: 'bg-cover bg-center',
      image: 'https://images.pexels.com/photos/2116094/pexels-photo-2116094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: '🍔 Burger Blowout Weekend',
      description: 'Craft Burger Challenge: 5 Unique Burgers, Insane Discounts!',
      bg: 'bg-cover bg-center',
      image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const foodItems = useMemo(() => foodItemsData.foodItems || [], []);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Get icon based on category
  const getCategoryIcon = (category) => {
    switch(category.toLowerCase()) {
      case 'appetizers': return <FaLeaf className="mr-1" />;
      case 'main course': return <FaUtensils className="mr-1" />;
      case 'desserts': return <FaHeart className="mr-1" />;
      case 'beverages': return <FaTag className="mr-1" />;
      default: return <FaStar className="mr-1" />;
    }
  };

  // Get random rating for items
  const getRandomRating = () => {
    return (Math.random() * 2 + 3).toFixed(1); // Random rating between 3.0 and 5.0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Sticky Header */}
      <motion.header 
        className={`sticky top-0 z-30 w-full transition-all duration-500 py-3 px-4 backdrop-blur-lg ${
          isScrolled ? 'bg-white/80 shadow-md' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaUtensils className="text-red-600 text-2xl md:text-3xl mr-3" />
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-red-800 tracking-tight">
                WebReich
              </h1>
              <p className="text-red-600 text-xs md:text-sm font-medium">Discover Delicious Flavors</p>
            </div>
          </motion.div>
          
          {/* Search Bar in Header when scrolled */}
          {isScrolled && (
            <motion.div 
              className="hidden md:block w-1/3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" />
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-red-200 focus:border-red-500 focus:outline-none transition-all duration-300 bg-white/80 text-sm"
                />
              </div>
            </motion.div>
          )}
          
          <motion.button
            className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Cart (0)
          </motion.button>
        </div>
      </motion.header>

      <div className="p-4 max-w-7xl mx-auto pt-6">
        {/* Title & Subtitle - Only shown when not scrolled on mobile */}
        {!isScrolled && (
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-red-800 flex items-center justify-center">
              <FaUtensils className="mr-3 text-red-500 text-3xl md:text-4xl" />
              Hotel Mirch Masala Menu
              <FaFireAlt className="ml-3 text-red-500 text-3xl md:text-4xl" />
            </h1>
            <p className="text-red-600 mt-2 text-sm md:text-lg font-medium">Discover Delicious Flavors For Every Mood</p>
          </motion.div>
        )}

        {/* Offers Section - Enhanced with better animation */}
        <motion.div 
          className="mb-8 relative overflow-hidden rounded-3xl shadow-xl h-56 md:h-80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
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
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  
                  <div className="relative z-10 p-6 md:p-8 w-full text-white">
                    <motion.div 
                      className="flex items-center mb-2"
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {offer.icon}
                      <h2 className="text-2xl md:text-3xl font-bold">{offer.title}</h2>
                    </motion.div>
                    <motion.p 
                      className="text-lg md:text-xl font-medium"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {offer.description}
                    </motion.p>
                   
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
          
          {/* Offer Navigation Dots - Enhanced */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {offerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentOfferIndex(index)}
                className={`
                  w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-500 transform
                  ${currentOfferIndex === index 
                    ? 'bg-white scale-125 shadow-lg' 
                    : 'bg-white/50 hover:scale-110'}
                `}
              />
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="md:hidden flex justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button 
            onClick={toggleMobileFilter}
            className="flex items-center bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-3 rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFilter className="mr-2" />
            Filter Categories
          </motion.button>
        </motion.div>

        {/* Mobile Category Modal - Enhanced */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <motion.div 
              className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white w-full rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto"
                initial={{ translateY: '100%' }}
                animate={{ translateY: 0 }}
                exit={{ translateY: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-red-800">Select Category</h2>
                  <motion.button 
                    onClick={toggleMobileFilter}
                    className="text-red-500 bg-red-50 p-2 rounded-full"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes />
                  </motion.button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`
                        px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center
                        ${selectedCategory === category 
                          ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg' 
                          : 'bg-red-50 text-red-700 hover:bg-red-100'}
                      `}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {getCategoryIcon(category)}
                      {category}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Category Scrollable Selector - Enhanced */}
        <motion.div 
          className="hidden md:flex overflow-x-scroll space-x-4 mb-8 pb-4 no-scrollbar scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`
                flex-shrink-0 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center
                ${selectedCategory === category 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg' 
                  : 'bg-red-50 text-red-700 hover:bg-red-100'}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {getCategoryIcon(category)}
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Grid - Enhanced with staggered animation */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {filteredItems.length === 0 ? (
            <motion.div 
              className="col-span-full flex flex-col items-center justify-center py-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <FaSearch className="text-4xl text-red-300 mb-4" />
              <h3 className="text-xl font-bold text-red-800 mb-2">No items found</h3>
              <p className="text-red-600">Try adjusting your search or category filter</p>
            </motion.div>
          ) : (
            filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                onClick={() => handleItemSelect(item)}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transform transition-all duration-500 group"
                whileHover={{ 
                  scale: 1.03,
                  y: -5
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.1 * (index % 8) } 
                }}
              >
                <div 
                  className="h-40 md:h-52 bg-cover bg-center relative overflow-hidden"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <motion.div 
                    className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-lg text-xs font-bold text-red-600"
                  >
                    {getRandomRating()} <FaStar className="inline ml-1 text-yellow-500" />
                  </motion.div>
                  
                  <motion.button
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-600 to-red-500 text-white py-2 text-sm font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center"
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaInfoCircle className="mr-2" /> View Details
                  </motion.button>
                </div>
                
                <div className="p-4 md:p-5 bg-white">
                  <h3 className="font-bold text-lg mb-2 text-red-800 truncate">{item.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3 h-8">
                    {item.description || "Delicious and freshly prepared to satisfy your cravings."}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-red-600 font-bold text-lg md:text-xl">₹{item.price}</span>
                      {item.discountPrice && (
                        <span className="line-through text-gray-400 text-xs">
                          ₹{item.discountPrice}
                        </span>
                      )}
                    </div>
                    <motion.span 
                      className={`
                        text-xs px-3 py-1 rounded-full font-bold flex items-center
                        ${item.subCategory === 'Veg' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'}
                      `}
                      whileHover={{ scale: 1.1 }}
                    >
                      {item.subCategory === 'Veg' ? 
                        <FaLeaf className="mr-1 text-green-600" /> : 
                        <FaDrumstickBite className="mr-1 text-red-600" />
                      }
                      {item.subCategory}
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* "No Results" Message */}
        {filteredItems.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <FaSearch className="mx-auto text-4xl text-red-300 mb-4" />
            <h3 className="text-xl font-bold text-red-800 mb-2">No items found</h3>
            <p className="text-red-600">Try adjusting your search or category filter</p>
          </motion.div>
        )}

        {/* Item Details Modal - Enhanced */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ 
                  type: 'spring',
                  damping: 25,
                  stiffness: 300
                }}
              >
                <div 
                  className="h-56 md:h-72 bg-cover bg-center relative"
                  style={{ 
                    backgroundImage: `url(${selectedItem.image})`,
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <motion.button 
                    onClick={handleCloseItemDetails}
                    className="absolute top-4 right-4 bg-white/90 p-3 rounded-full text-red-600 hover:bg-white hover:text-red-800 transition-all shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTimes />
                  </motion.button>
                  
                  <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span 
                        className={`
                          inline-block px-3 py-1 rounded-full text-xs font-bold mb-3
                          ${selectedItem.subCategory === 'Veg' 
                            ? 'bg-green-500/90 text-white' 
                            : 'bg-red-500/90 text-white'}
                        `}
                      >
                        {selectedItem.subCategory === 'Veg' ? 
                          <FaLeaf className="inline mr-1" /> : 
                          <FaDrumstickBite className="inline mr-1" />
                        }
                        {selectedItem.subCategory}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold mb-1">{selectedItem.name}</h2>
                      <div className="flex items-center">
                        <div className="flex items-center mr-3">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={`text-xs ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs font-medium">{getRandomRating()} ratings</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                <div className="p-5 md:p-6 bg-white">
                  <motion.p 
                    className="text-gray-600 mb-5 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedItem.description || "A delicious dish prepared with the finest ingredients, guaranteed to satisfy your taste buds. Perfectly seasoned and cooked to perfection."}
                  </motion.p>
                  
                  <motion.div 
                    className="flex justify-between items-center mb-5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-end">
                      <span className="text-2xl md:text-3xl font-bold text-red-600">₹{selectedItem.price}</span>
                      {selectedItem.discountPrice && (
                        <span className="line-through text-gray-400 ml-2 text-sm">
                          ₹{selectedItem.discountPrice}
                        </span>
                      )}
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                      In Stock
                    </span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center border-2 border-gray-200 rounded-full">
                      <button className="px-4 py-2 text-gray-500 hover:text-red-600 text-lg font-bold">-</button>
                      <span className="px-4 py-2 font-semibold">1</span>
                      <button className="px-4 py-2 text-gray-500 hover:text-red-600 text-lg font-bold">+</button>
                    </div>
                    <motion.button 
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-full font-bold shadow-lg"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Add to Cart
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

       
      </div>
    </div>
  );
};

export default DigitalMenuCard;