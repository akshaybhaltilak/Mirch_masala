import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdLocationOn, MdMenu } from "react-icons/md";
import { FaPepperHot } from "react-icons/fa";

const MainHeader = ({ onMenuToggle }) => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options).toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-red-700 to-red-900 text-white p-4 z-50 shadow-2xl">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Logo and Restaurant Name */}
          <div className="flex items-center space-x-3">
            <FaPepperHot className="h-8 w-8 text-yellow-400 transform rotate-12" />
            <div>
              <h1 className="text-2xl font-bold tracking-wide text-white flex items-center">
                Mirch Masala
                <span className="ml-2 bg-yellow-400 text-red-800 text-xs px-2 py-1 rounded-full">
                  CAFE
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Menu Toggle Button */}
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="
              p-3 rounded-full 
              bg-white/20 hover:bg-white/30 
              transition-all duration-300 
              flex items-center justify-center
              group
            "
            aria-label="Menu"
          >
            <MdMenu 
              className="
                h-6 w-6 text-white 
                group-hover:scale-110 
                transition-transform
              " 
            />
          </button>
        </div>
      </div>

      {/* Subtle Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 opacity-80"></div>
    </header>
  );
};

export default MainHeader;