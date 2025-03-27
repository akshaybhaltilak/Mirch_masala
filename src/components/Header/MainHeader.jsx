import React, { useState, useEffect } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { FaPepperHot, FaInstagram } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";

const InstagramStoryShareModal = ({ isOpen, onClose, restaurantName }) => {
  const createInstagramStory = () => {
    // Instagram Story Creation Template
    const storyTemplates = [
      {
        text: `Just had an amazing meal at ${restaurantName}! 🌶️🍽️`,
        hashtags: ["#FoodieLife", "#LocalRestaurant", "#DeliciousEats"]
      },
      {
        text: `Spice up your day at ${restaurantName}! Flavor explosion 🔥`,
        hashtags: ["#SpicyFood", "#CulinaryAdventure", "#MustTryRestaurant"]
      }
    ];

    // Randomly select a template
    const template = storyTemplates[Math.floor(Math.random() * storyTemplates.length)];

    // Construct Instagram Story Share URL
    const shareText = `${template.text}\n\n${template.hashtags.join(' ')}`;
    const instagramStoriesUrl = `https://www.instagram.com/stories/create/`;
    
    // Open Instagram Stories with pre-filled content
    window.open(instagramStoriesUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <MdClose className="h-6 w-6" />
        </button>
        
        <div className="text-center">
          <FaInstagram className="mx-auto h-12 w-12 text-pink-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Share Your Experience
          </h2>
          
          <p className="text-gray-600 mb-6">
            Tell the world about your delicious meal at {restaurantName}! 
            Create an Instagram Story and tag us.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={createInstagramStory}
              className="
                w-full py-3 px-4 
                bg-gradient-to-r from-pink-500 to-purple-600 
                text-white font-semibold 
                rounded-lg 
                hover:from-pink-600 hover:to-purple-700
                transition-all duration-300
                flex items-center justify-center
                space-x-2
              "
            >
              <FaInstagram className="h-6 w-6" />
              <span>Create Instagram Story</span>
            </button>
            
            <p className="text-xs text-gray-500">
              We'd love to see your foodie moments! 
              Use #{restaurantName.replace(/\s/g, '')}Experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainHeader = ({ onMenuToggle }) => {
  const [dateTime, setDateTime] = useState(new Date());
  const [isInstagramModalOpen, setIsInstagramModalOpen] = useState(false);

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
    <>
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-red-700 to-red-900 text-white p-4 z-50 shadow-2xl">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <FaPepperHot className="h-8 w-8 text-yellow-400 transform rotate-12 animate-pulse" />
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

          <div className="flex items-center space-x-2">
            {/* Instagram Story Share Button */}
            <button
              onClick={() => setIsInstagramModalOpen(true)}
              className="
                p-3 rounded-full
                bg-white/20 hover:bg-pink-500/50
                transition-all duration-300
                flex items-center justify-center
                group
              "
              aria-label="Share Instagram Story"
            >
              <FaInstagram
                className="
                  h-5 w-5 text-white
                  group-hover:scale-110
                  group-hover:text-pink-300
                  transition-transform
                "
              />
            </button>

            {/* Menu Toggle Button */}
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

        <div className="container mx-auto mt-2 flex justify-between items-center text-xs opacity-80">
          <div className="flex items-center space-x-2">
            <IoMdTime className="h-4 w-4" />
            <span>{formatDate(dateTime)}</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 opacity-80"></div>
      </header>

      {/* Instagram Story Share Modal */}
      <InstagramStoryShareModal 
        isOpen={isInstagramModalOpen}
        onClose={() => setIsInstagramModalOpen(false)}
        restaurantName="Mirch Masala Cafe"
      />
    </>
  );
};

export default MainHeader;