
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../components/logo.jpg';
// import { Menu, X } from 'lucide-react';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   // Listen to scroll event
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20); // Adjust scroll threshold if needed
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <nav
//   className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 transition-all duration-300 ${
//     isScrolled ? 'shadow-md' : ''
//   } bg-black`}
// >

//       <div className="flex justify-between items-center">
//         {/* Logo + Brand Name */}
//         <div className="flex items-center space-x-3">
//           <img src={logo} alt="company logo" className="h-16 w-32 object-contain" />
//           <div
//             className={`text-xl md:text-3xl font-bold transition-colors duration-300 ${
//               isScrolled ? 'text-pink-700' : 'text-white'
//             }`}
//           >
//             PawradiseEventSystem
//           </div>
//         </div>

//         {/* Hamburger Button */}
//         <button
//           className={`md:hidden focus:outline-none ${
//             isScrolled ? 'text-gray-700' : 'text-white'
//           }`}
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X size={30} /> : <Menu size={30} />}
//         </button>

//         {/* Desktop Links */}
//         <div className="hidden md:flex space-x-10 items-center">
//           <Link
//             to="/"
//             className={`font-bold text-2xl transition-colors duration-300 ${
//               isScrolled ? 'text-gray-700 hover:text-pink-800' : 'text-white hover:text-yellow-300'
//             }`}
//           >
//             Home
//           </Link>
//           <Link
//             to="/about"
//             className={`font-bold text-2xl transition-colors duration-300 ${
//               isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-300'
//             }`}
//           >
//             About
//           </Link>
//           <Link
//             to="/events"
//             className={`font-bold text-2xl transition-colors duration-300 ${
//               isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-300'
//             }`}
//           >
//             Events
//           </Link>
//           <Link
//             to="/contact"
//             className={`font-bold text-2xl transition-colors duration-300 ${
//               isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-300'
//             }`}
//           >
//             Contact Us
//           </Link>
//           {/* <Link
//             to="/AdminDashboard"
//             className={`font-bold text-2xl transition-colors duration-300 ${
//               isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-300'
//             }`}
//           >
//             AdminDashboard
//           </Link> */}

//           <Link
//             to="/signup"
//             className={`font-bold text-2xl transition-colors duration-300 ${
//               isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-300'
//             }`}
//           >
//             signup
//           </Link>

//           <Link
//             to="/Login"
//             className={`font-bold text-2xl transition-colors duration-300 ${
//               isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-300'
//             }`}
//           >
//             Login
//           </Link>
//         </div>
//       </div>

//       {/* Mobile Links */}
//       {isOpen && (
//         <div className="flex flex-col items-start space-y-4 mt-4 md:hidden">
//           <Link to="/" className="text-gray-700 font-semibold text-lg">Home</Link>
//           <Link to="/about" className="text-gray-700 font-semibold text-lg">About</Link>
//           <Link to="/events" className="text-gray-700 font-semibold text-lg">Events</Link>
//           <Link to="/contact" className="text-gray-700 font-semibold text-lg">Contact Us</Link>
//            {/* <Link to="/AdminDashboard" className="text-gray-700 font-semibold text-lg">Dashboard</Link> */}
//            <link to="/signup" className="text-gray-700 font-semibold text-lg">signup</link>
//            <link to="/Login" className="text-gray-700 font-semibold text-lg">login</link>
//           <Link to="/AdminDashboard">AdminDashboard</Link> {/* add this */}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../components/logo.jpg";
import Login from "../components/Login.js";
import Signup from "../components/signup.js"; // ✅ Capitalized

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 bg-black shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="company logo"
            className="h-16 w-32 object-contain"
          />
          <div className="text-xl md:text-3xl font-bold text-white">
            PawradiseEventSystem
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-10 items-center">
          <Link to="/" className="font-bold text-2xl text-white">
            Home
          </Link>
          <Link to="/about" className="font-bold text-2xl text-white">
            About
          </Link>
          <Link to="/events" className="font-bold text-2xl text-white">
            Events
          </Link>
          <Link to="/contact" className="font-bold text-2xl text-white">
            Contact Us
          </Link>

          {!user ? (
            <>
              <button
                onClick={() => setIsSignupOpen(true)}
                className="text-white font-bold"
              >
                Sign Up
              </button>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="text-white font-bold"
              >
                Login
              </button>
            </>
          ) : (
            <div className="relative">
              <button className="text-white font-bold">
                {user.user?.name} ⬇
              </button>
              <div className="absolute right-0 bg-white mt-2 rounded shadow-lg p-4">
                <p>{user.user?.email}</p>
                <p className="text-sm text-gray-500">Role: {user.user?.role}</p>
                <button
                  onClick={handleLogout}
                  className="text-red-500 mt-2"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {isLoginOpen && (
        <Login onClose={() => setIsLoginOpen(false)} setUser={setUser} />
      )}
      {isSignupOpen && (
        <Signup onClose={() => setIsSignupOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
