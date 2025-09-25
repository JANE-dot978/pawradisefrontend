
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


// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import logo from "../components/logo.jpg";
// import Login from "../components/Login.js";
// import Signup from "./Signup.js"; // ✅ Capitalized

// const Navbar = () => {
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [isSignupOpen, setIsSignupOpen] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const stored = localStorage.getItem("user");
//     if (stored) setUser(JSON.parse(stored));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 bg-black shadow-md">
//       <div className="flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center space-x-3">
//           <img
//             src={logo}
//             alt="company logo"
//             className="h-16 w-32 object-contain"
//           />
//           <div className="text-xl md:text-3xl font-bold text-white">
//             PawradiseEventSystem
//           </div>
//         </div>

//         {/* Desktop Links */}
//         <div className="hidden md:flex space-x-10 items-center">
//           <Link to="/" className="font-bold text-2xl text-white">
//             Home
//           </Link>
//           <Link to="/about" className="font-bold text-2xl text-white">
//             About
//           </Link>
//           <Link to="/events" className="font-bold text-2xl text-white">
//             Events
//           </Link>
//           <Link to="/contact" className="font-bold text-2xl text-white">
//             Contact Us
//           </Link>

//           {!user ? (
//             <>
//               <button
//                 onClick={() => setIsSignupOpen(true)}
//                 className="text-white font-bold"
//               >
//                 Sign Up
//               </button>
//               <button
//                 onClick={() => setIsLoginOpen(true)}
//                 className="text-white font-bold"
//               >
//                 Login
//               </button>
//             </>
//           ) : (
//             <div className="relative">
//               <button className="text-white font-bold">
//                 {user.user?.name} ⬇
//               </button>
//               <div className="absolute right-0 bg-white mt-2 rounded shadow-lg p-4">
//                 <p>{user.user?.email}</p>
//                 <p className="text-sm text-gray-500">Role: {user.user?.role}</p>
//                 <button
//                   onClick={handleLogout}
//                   className="text-red-500 mt-2"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modals */}
//       {isLoginOpen && (
//         <Login onClose={() => setIsLoginOpen(false)} setUser={setUser} />
//       )}
//       {isSignupOpen && (
//         <Signup onClose={() => setIsSignupOpen(false)} />
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../components/logo.jpg";
import Login from "../components/Login.js";
import Signup from "./Signup.js";

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Hamburger state
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoginOpen(false);
    
    // Redirect based on role
    if (userData.role === "admin") {
      navigate("/admin");
    } else if (userData.role === "employee") {
      navigate("/employee");
    } else {
      navigate("/events");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10 items-center">
          <Link to="/" className="font-bold text-2xl text-white hover:text-pink-400 transition">
            Home
          </Link>
          <Link to="/about" className="font-bold text-2xl text-white hover:text-pink-400 transition">
            About
          </Link>
          <Link to="/events" className="font-bold text-2xl text-white hover:text-pink-400 transition">
            Events
          </Link>
          <Link to="/contact" className="font-bold text-2xl text-white hover:text-pink-400 transition">
            Contact Us
          </Link>

          {!user ? (
            <>
              <button
                onClick={() => setIsSignupOpen(true)}
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded transition"
              >
                Sign Up
              </button>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
              >
                Login
              </button>
            </>
          ) : (
            <div className="relative">
              <button className="text-white font-bold hover:text-pink-400 transition">
                {user.name} ⬇
              </button>
              <div className="absolute right-0 bg-white mt-2 rounded shadow-lg p-4 min-w-48">
                <p className="text-gray-800 font-medium">Welcome, {user.name}</p>
                <p className="text-sm text-gray-500">Role: {user.role}</p>
                <button
                  onClick={handleLogout}
                  className="text-red-500 mt-2 hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-black rounded-lg p-4">
          <Link 
            to="/" 
            className="block py-3 text-white font-bold text-xl hover:text-pink-400 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="block py-3 text-white font-bold text-xl hover:text-pink-400 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/events" 
            className="block py-3 text-white font-bold text-xl hover:text-pink-400 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Events
          </Link>
          <Link 
            to="/contact" 
            className="block py-3 text-white font-bold text-xl hover:text-pink-400 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>

          {!user ? (
            <div className="mt-4 space-y-3">
              <button
                onClick={() => {
                  setIsSignupOpen(true);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-3 text-white font-bold text-xl hover:text-pink-400 transition"
              >
                Sign Up
              </button>
              <button
                onClick={() => {
                  setIsLoginOpen(true);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-3 text-white font-bold text-xl hover:text-pink-400 transition"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <div className="py-3 text-white">
                <p className="font-bold">Welcome, {user.name}</p>
                <p className="text-sm text-gray-400">Role: {user.role}</p>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-3 text-red-500 font-bold text-xl hover:text-red-400 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      {isLoginOpen && (
        <Login 
          onClose={() => setIsLoginOpen(false)} 
          onLoginSuccess={handleLoginSuccess} 
        />
      )}
      {isSignupOpen && (
        <Signup onClose={() => setIsSignupOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;