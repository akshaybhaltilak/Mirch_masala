import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FaPepperHot, FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-red-700 to-red-900 text-white py-12 px-6">
      <div className="container mx-auto grid md:grid-cols-3 gap-12">
        {/* Cafe Information */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start mb-6">
            <FaPepperHot className="h-8 w-8 text-yellow-400 transform rotate-12 mr-3" />
            <h2 className="text-3xl font-bold tracking-wide">
              Mirch <span className="text-yellow-400">Masala</span>
            </h2>
          </div>
          
          <div className="space-y-4 text-gray-100">
            <p className="flex items-center justify-center md:justify-start">
              <FaMapMarkerAlt className="h-6 w-6 mr-3 text-yellow-400" />
              123 Spice Lane, Flavor City, Maharashtra
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <FaPhoneAlt className="h-6 w-6 mr-3 text-yellow-400" />
              +91 (123) 456-7890
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <FaEnvelope className="h-6 w-6 mr-3 text-yellow-400" />
              contact@mirchmasala.com
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-6 text-yellow-400">Connect With Us</h3>
          <div className="flex justify-center space-x-6 mb-6">
            {[
              { Icon: FaInstagram, href: "https://www.instagram.com" },
              { Icon: FaFacebook, href: "https://www.facebook.com" },
              { Icon: FaWhatsapp, href: "https://wa.me/1234567890" }
            ].map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-white 
                  hover:text-yellow-400 
                  transform 
                  transition-all 
                  duration-300 
                  hover:scale-110
                "
              >
                <Icon className="h-8 w-8" />
              </a>
            ))}
          </div>
          <div className="text-gray-200 text-sm">
            <p>Crafted with <span className="text-yellow-400">❤</span> in India</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-right">
          <h3 className="text-2xl font-semibold mb-6 text-yellow-400">Quick Links</h3>
          <div className="text-gray-100 space-y-2">
            <p className="hover:text-yellow-400 transition-colors">Home</p>
            <p className="hover:text-yellow-400 transition-colors">Menu</p>
            <p className="hover:text-yellow-400 transition-colors">About Us</p>
            <p className="hover:text-yellow-400 transition-colors">Contact</p>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-12 pt-6 border-t border-red-600 text-center">
        <p className="text-gray-200">
          &copy; {new Date().getFullYear()} Mirch Masala. All Rights Reserved.
        </p>
        <p className="text-xs text-gray-300 mt-2">
          Powered by Passion, Spiced with Innovation
        </p>
      </div>

      {/* Decorative Line */}
      <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 opacity-80"></div>
    </footer>
  );
};

export default Footer;