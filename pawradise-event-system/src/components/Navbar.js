import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../components/logo.jpg';
import { Menu, X } from 'lucide-react'; // Lucide icons (optional)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 md:px-12 py-4">
      <div className="flex justify-between items-center">
        {/* Logo + Brand Name */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="company logo" className="h-16 w-32 object-contain" />
          <div className="text-xl md:text-3xl font-bold text-blue-600">PawradiseEventSystem</div>
        </div>

        {/* Hamburger Button (visible on small screens) */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-10 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-800 font-bold text-2xl">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 font-bold text-2xl">About</Link>
          <Link to="/events" className="text-gray-700 hover:text-blue-600 font-bold text-2xl">Events</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-bold text-2xl">Contact Us</Link>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="flex flex-col items-start space-y-4 mt-4 md:hidden">
          <Link to="/" className="text-gray-700 hover:text-blue-800 font-semibold text-lg">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 font-semibold text-lg">About</Link>
          <Link to="/events" className="text-gray-700 hover:text-blue-600 font-semibold text-lg">Events</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-semibold text-lg">Contact Us</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
