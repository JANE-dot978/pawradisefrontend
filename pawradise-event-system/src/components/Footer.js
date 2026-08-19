// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import { PawPrint, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="px-6 pt-12 pb-6 md:px-16 lg:px-24 w-full text-white bg-black">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <PawPrint size={26} className="text-white" />
            <span className="font-heading text-2xl text-white">Pawradise</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed max-w-xs">
            Your premier destination for pet-friendly events and experiences. Join our
            community of pet lovers and create unforgettable memories with your furry friends.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:text-orange-400 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-orange-400 transition">About us</Link></li>
            <li><Link to="/events" className="hover:text-orange-400 transition">Events</Link></li>
            <li><Link to="/contact" className="hover:text-orange-400 transition">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-lg mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/faq" className="hover:text-orange-400 transition">Help Center</Link></li>
            <li><Link to="/privacy" className="hover:text-orange-400 transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-orange-400 transition">Terms of Use</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-lg mb-4">Get In Touch</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <Phone size={16} /> +254 723 456 789
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> info@pawradise.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Nairobi, Kenya
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
        {new Date().getFullYear()}. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
