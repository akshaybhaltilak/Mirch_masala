import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FaPepperHot, FaInstagram, FaFacebook, FaWhatsapp, FaLinkedin, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-red-800 via-red-700 to-red-900 text-white py-12 px-6 relative overflow-hidden">
      {/* Decorative spice elements */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
        <FaPepperHot className="w-full h-full text-yellow-400" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 transform rotate-45">
        <FaPepperHot className="w-full h-full text-yellow-400" />
      </div>
      
      <div className="container mx-auto grid md:grid-cols-2 gap-12 relative z-10">
        {/* Cafe Information */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-sm opacity-70 animate-pulse"></div>
              <img 
                className="h-16 w-16 rounded-full mr-4 relative border-2 border-yellow-400" 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNYIfGZj-3Ki8kQjzFV6zfBYlJsxXhiO6wdw&s" 
                alt="Mirch Masala Logo" 
              />
            </div>
            <h2 className="text-4xl font-bold tracking-wide">
              Mirch <span className="text-yellow-400">Masala</span>
            </h2>
          </div>
          
          <div className="space-y-5 text-gray-100">
            <p className="flex items-center justify-center md:justify-start group">
              <span className="h-10 w-10 flex items-center justify-center bg-red-600 rounded-full mr-4 group-hover:bg-yellow-400 transition-colors duration-300">
                <FaMapMarkerAlt className="h-5 w-5 text-yellow-300 group-hover:text-red-700" />
              </span>
              <span className="text-lg">Opp Khandelwal Bhavan, Akola, Maharashtra 444001</span>
            </p>
            <p className="flex items-center justify-center md:justify-start group">
              <span className="h-10 w-10 flex items-center justify-center bg-red-600 rounded-full mr-4 group-hover:bg-yellow-400 transition-colors duration-300">
                <FaPhoneAlt className="h-5 w-5 text-yellow-300 group-hover:text-red-700" />
              </span>
              <span className="text-lg">+918421123456</span>
            </p>
           
          </div>
        </div>
        
        {/* Social Links */}
        <div className="text-center md:text-right">
          <h3 className="text-2xl font-bold mb-8 inline-block relative">
            <span className="text-yellow-400">Connect With Us</span>
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow-400 rounded-full transform scale-x-50 opacity-75"></span>
          </h3>
          
          <div className="flex justify-center md:justify-end space-x-6 mb-8">
            {[
              { 
                Icon: FaInstagram, 
                href: "https://www.instagram.com/_mirchmasala_/?hl=en",
                color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500"
              },
              { 
                Icon: FaFacebook, 
                href: "https://www.facebook.com/mirchmasalahotel/",
                color: "hover:bg-blue-600"
              },
              { 
                Icon: FaWhatsapp, 
                href: "https://wa.me/+918421123456",
                color: "hover:bg-green-600"
              }
            ].map(({ Icon, href, color }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  bg-red-600 
                  p-3 
                  rounded-full 
                  text-white
                  ${color}
                  transform
                  transition-all
                  duration-300
                  hover:scale-110
                  hover:shadow-lg
                  hover:shadow-red-900/50
                `}
              >
                <Icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          
          {/* WebReich Technologies Section */}
          <div className="mt-12 text-center md:text-right">
            <h4 className="text-xl font-semibold mb-4">
              Created by <span className="text-yellow-400">WebReich Technologies</span>
            </h4>
            <div className="flex justify-center md:justify-end space-x-4">
              {[
                { 
                  Icon: FaGlobe, 
                  href: "webreich.vercel.app",
                  title: "Website"
                },
                { 
                  Icon: FaWhatsapp, 
                  href: "https://wa.me/+919834153020",
                  title: "Whatsapp"
                },
                { 
                  Icon: FaInstagram, 
                  href: "https://www.instagram.com/webreich/",
                  title: "Instagram"
                }
              ].map(({ Icon, href, title }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={title}
                  className="
                    text-gray-200
                    hover:text-yellow-400
                    transform
                    transition-all
                    duration-300
                    hover:scale-110
                  "
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="mt-12 pt-6 border-t border-red-600/50 text-center">
        <p className="text-gray-200 text-lg">
          &copy; {new Date().getFullYear()} Mirch Masala. All Rights Reserved.
        </p>
        <p className="text-sm text-gray-300 mt-2 italic">
          "Powered by Passion, Spiced with Innovation"
        </p>
      </div>
      
      {/* Enhanced Decorative Elements */}
      <div className="absolute left-0 right-0 bottom-0 h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"></div>
    </footer>
  );
};

export default Footer;