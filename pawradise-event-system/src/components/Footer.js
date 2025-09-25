// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-6 pt-8 md:px-16 lg:px-36 w-full text-white bg-black">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
        {/* Logo & Description */}
        <div className="md:max-w-96">
          <h1 className="text-3xl font-bold text-white">PawradiseEventSystem</h1>
          <p className="mt-6 text-sm">
            Your premier destination for pet-friendly events and experiences. 
            Join our community of pet lovers and create unforgettable memories with your furry friends.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <a
              href="#"
              className="h-10 w-auto border border-white rounded opacity-70 hover:opacity-100 transition-opacity"
            >
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
                alt="Google Play"
                className="h-10 w-auto"
              />
            </a>
            <a
              href="#"
              className="h-10 w-auto border border-white rounded opacity-70 hover:opacity-100 transition-opacity"
            >
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
                alt="App Store"
                className="h-10 w-auto"
              />
            </a>
          </div>
        </div>

        {/* Navigation & Contact */}
        <div className="flex-1 flex flex-col md:flex-row items-start md:justify-end gap-20 md:gap-40">
          <div>
            <h2 className="font-semibold mb-5 text-2xl">Pawradise</h2>
            <ul className="text-lg space-y-2">
              <li><Link to="/" className="hover:text-pink-400 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-pink-400 transition">About us</Link></li>
              <li><Link to="/contact" className="hover:text-pink-400 transition">Contact us</Link></li>
              <li><Link to="/events" className="hover:text-pink-400 transition">Events</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5 text-2xl">Get in touch</h2>
            <div className="text-lg space-y-2">
              <p className="flex items-center gap-2">
                <span>📞</span> +254 712 345 678
              </p>
              <p className="flex items-center gap-2">
                <span>📧</span> info@pawradise.com
              </p>
              <p className="flex items-center gap-2">
                <span>📍</span> Nairobi, Kenya
              </p>
            </div>
            
            {/* Social Media Links */}
            <div className="mt-4 flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                <span className="text-xl">📘</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition">
                <span className="text-xl">📷</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition">
                <span className="text-xl">🐦</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition">
                <span className="text-xl">📺</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="pt-4 text-center pb-5">
        <p className="text-lg">
          Copyright {new Date().getFullYear()} ©{" "}
          <span className="text-pink-400 font-semibold">PawradiseEventSystem</span>
          . All Rights Reserved.
        </p>
        <div className="mt-2 text-sm text-gray-400">
          <Link to="/privacy" className="hover:text-white transition mx-2">Privacy Policy</Link>
          <span>•</span>
          <Link to="/terms" className="hover:text-white transition mx-2">Terms of Service</Link>
          <span>•</span>
          <Link to="/faq" className="hover:text-white transition mx-2">FAQ</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;