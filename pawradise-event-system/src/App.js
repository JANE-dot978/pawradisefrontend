// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';

// import Home from './components/Home';
// import About from './components/About';
// import Events from './components/Events';
// import Contact from './components/Contact';
// import AdminDashboard from './components/AdminDashboard';
// import EmployeeDashboard from './components/EmployeeDashboard';
// import Signup from './components/signup';
// import Login from './components/Login';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/events" element={<Events />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
//         <Route path="/signup" element={<Signup/>}/>
//         <Route path="/Login" element={<Login/>}/>
//         <Route path="/" element={<Signup />} />
//         <Route path="/events" element={<Events />} />
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/employee" element={<EmployeeDashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import Navbar from "./components/Navbar";

// import Home from "./components/Home";
// import About from "./components/About";
// import Events from "./components/Events";
// import Contact from "./components/Contact";
// import AdminDashboard from "./components/AdminDashboard";
// import EmployeeDashboard from "./components/EmployeeDashboard";
// import Signup from "./components/signup";
// import Login from "./components/Login";
// import Footer from "./components/Footer";

// function App() {
//   // Track authentication
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // When login succeeds, call this
//   const handleLogin = () => {
//     setIsAuthenticated(true);
//   };

//   // When user logs out, call this
//   const handleLogout = () => {
//     setIsAuthenticated(false);
//   };

//   return (
//     <Router>
//       {/* Pass authentication state to Navbar */}
//       <Navbar
//         isAuthenticated={isAuthenticated}
//         onLogout={handleLogout}
//       />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/events" element={<Events />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/Footer" element={<Footer/>}/>
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/employee" element={<EmployeeDashboard />} />
//         <Route path="/signup" element={<Signup />} />
//         {/* Pass handleLogin to Login so it can update state */}
//         <Route path="/login" element={<Login onLogin={handleLogin} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import Navbar from "./components/Navbar";

// import Home from "./components/Home";
// import About from "./components/About";
// import Events from "./components/Events";
// import Contact from "./components/Contact";
// import AdminDashboard from "./components/AdminDashboard";
// import EmployeeDashboard from "./components/EmployeeDashboard";
// import Signup from "./components/Signup";  // ⬅️ Use exact file name
// import Login from "./components/Login";
// // import Footer from "./components/Footer";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//   };

//   return (
//     <Router>
//       <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/events" element={<Events />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/employee" element={<EmployeeDashboard />} />
//         <Route path="/signup" element={<Signup />} />   {/* lowercase ✅ */}
//         <Route path="/login" element={<Login onLogin={handleLogin} />} />
//       </Routes>

//       {/* <Footer /> */}
//     </Router>
//   );
// }

// export default App;
// src/App.js
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";

// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import About from "./components/About";
// import Events from "./components/Events";
// import Contact from "./components/Contact";
// import AdminDashboard from "./components/AdminDashboard";
// import EmployeeDashboard from "./components/EmployeeDashboard";
// import Signup from "./components/Signup";       // ✅ Capital S matches file
// import LoginCard from "./components/Login";    // ✅ matches export

// // import Footer from "./components/Footer";

// function App() {
//   // Track authentication
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // When login succeeds, call this
//   const handleLogin = () => {
//     setIsAuthenticated(true);
//   };

//   // When user logs out, call this
//   const handleLogout = () => {
//     setIsAuthenticated(false);
//   };

//   return (
//     <Router>
//       {/* Navbar always visible */}
//       <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

//       {/* Page routes */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/events" element={<Events />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/employee" element={<EmployeeDashboard />} />
//         <Route path="/signup" element={<Signup />} />         {/* ✅ matches import */}
//         <Route path="/login" element={<LoginCard onLogin={handleLogin} />} />
//       </Routes>

//       {/* Footer always visible */}
//       {/* <Footer /> */}
//     </Router>
//   );
// }

// export default App;
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState, useEffect } from "react";

// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import About from "./components/About";
// import Events from "./components/Events";
// import Contact from "./components/Contact";
// import AdminDashboard from "./components/AdminDashboard";
// import EmployeeDashboard from "./components/EmployeeDashboard";
// import Signup from "./components/Signup";
// import Login from "./components/Login";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Check if user is already logged in on app load
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("user");
//   };

//   return (
//     <Router>
//       <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/events" element={<Events />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/employee" element={<EmployeeDashboard />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login onLogin={handleLogin} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Events from "./components/Events";
import Contact from "./components/Contact";
import AdminDashboard from "./components/AdminDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const handleLogin = () => {
    const role = localStorage.getItem("role");
    setIsAuthenticated(true);
    setUserRole(role || "");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
  };

  const ProtectedAdminRoute = ({ children }) => {
    return isAuthenticated && userRole === "admin" ? children : <Navigate to="/login" replace />;
  };

  const ProtectedEmployeeRoute = ({ children }) => {
    return isAuthenticated && (userRole === "employee" || userRole === "admin") ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar isAuthenticated={isAuthenticated} userRole={userRole} onLogout={handleLogout} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
            <Route path="/employee" element={<ProtectedEmployeeRoute><EmployeeDashboard /></ProtectedEmployeeRoute>} />
            <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;