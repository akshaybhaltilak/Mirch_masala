import React, { useState, useEffect } from "react";
import { MdMenu, MdLocationOn } from "react-icons/md";

const MainHeader = ({ onMenuToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 
        bg-gradient-to-r from-red-700 to-red-900 
        text-white py-3 px-4 z-50 
        transition-all duration-300
        ${isScrolled ? 'shadow-xl' : 'shadow-md'}
      `}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Restaurant Name */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="rounded-full overflow-hidden border-3 border-yellow-400 shadow-md transform transition-transform hover:scale-105">
            <img 
              className="h-10 w-10 sm:h-12 sm:w-12 object-cover" 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNYIfGZj-3Ki8kQjzFV6zfBYlJsxXhiO6wdw&s" 
              alt="Mirch Masala Logo" 
            />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-wide flex items-center">
              Mirch <span className="text-yellow-400 ml-1 sm:ml-2">Masala</span>
              <span
                className="
                  ml-2 bg-yellow-400 
                  text-red-800 text-[10px] sm:text-xs 
                  px-1.5 py-0.5 sm:px-2 sm:py-1
                  rounded-full
                  shadow-md
                "
              >
                Hotel
              </span>
            </h1>
          </div>
        </div>

        {/* Location and Menu Toggle */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Location */}
          <div className="hidden sm:flex items-center space-x-1.5 text-xs sm:text-sm opacity-80 hover:text-yellow-400 transition-colors">
            <MdLocationOn className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="truncate max-w-[100px]">Akola, Maharashtra</span>
          </div>

          {/* Menu Toggle Button */}
          <button
            onClick={onMenuToggle}
            className="
              p-2 sm:p-3 rounded-full 
              bg-white/20 hover:bg-white/30 
              transition-all duration-300 
              flex items-center justify-center 
              group
            "
            aria-label="Menu"
          >
            <MdMenu
              className="
                h-5 w-5 sm:h-6 sm:w-6 text-white 
                group-hover:scale-110 
                transition-transform
              "
            />
          </button>
        </div>
      </div>

      {/* Decorative Gradient Line */}
      <div
        className="
          absolute bottom-0 left-0 right-0 
          h-0.5 
          bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 
          opacity-80
        "
      ></div>
    </header>
  );
};

export default MainHeader;