
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
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PawPrint, Menu, X, ArrowRight } from "lucide-react";
import Login from "../components/Login.js";
import Signup from "./Signup.js";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact Us" },
];

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Hamburger state
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const syncUserFromStorage = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };

    syncUserFromStorage();
    window.addEventListener("authchange", syncUserFromStorage);
    return () => window.removeEventListener("authchange", syncUserFromStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
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
    <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 bg-[#f7ecd0] shadow-sm">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <PawPrint size={28} className="text-orange-500" />
          <span className="font-heading text-2xl text-black">Pawradise</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`font-semibold transition pb-1 border-b-2 ${
                  isActive
                    ? "text-orange-500 border-orange-500"
                    : "text-black border-transparent hover:text-orange-500"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <button
                onClick={() => setIsSignupOpen(true)}
                className="font-semibold text-black hover:text-orange-500 transition"
              >
                Sign Up
              </button>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="font-semibold text-black hover:text-orange-500 transition"
              >
                Login
              </button>
            </>
          ) : (
            <div className="relative group">
              <button className="font-semibold text-black hover:text-orange-500 transition">
                {user.name} ⌄
              </button>
              <div className="absolute right-0 hidden group-hover:block bg-white mt-2 rounded-lg shadow-lg p-4 min-w-48">
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
          <Link
            to="/events"
            className="inline-flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-5 rounded-full shadow transition"
          >
            Explore Events <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-xl p-4 shadow-lg">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`block py-3 font-semibold text-lg transition ${
                  isActive ? "text-orange-500" : "text-black hover:text-orange-500"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            to="/events"
            onClick={() => setIsMenuOpen(false)}
            className="mt-3 inline-flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-5 rounded-full shadow transition"
          >
            Explore Events <ArrowRight size={16} />
          </Link>

          {!user ? (
            <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
              <button
                onClick={() => {
                  setIsSignupOpen(true);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-black font-semibold text-lg hover:text-orange-500 transition"
              >
                Sign Up
              </button>
              <button
                onClick={() => {
                  setIsLoginOpen(true);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-black font-semibold text-lg hover:text-orange-500 transition"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="py-2 text-black">
                <p className="font-semibold">Welcome, {user.name}</p>
                <p className="text-sm text-gray-500">Role: {user.role}</p>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-red-500 font-semibold text-lg hover:text-red-600 transition"
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