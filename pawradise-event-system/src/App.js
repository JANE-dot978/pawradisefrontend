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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";

import Home from "./components/Home";
import About from "./components/About";
import Events from "./components/Events";
import Contact from "./components/Contact";
import AdminDashboard from "./components/AdminDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import Signup from "./components/signup";
import Login from "./components/Login";

function App() {
  // Track authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // When login succeeds, call this
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // When user logs out, call this
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {/* Pass authentication state to Navbar */}
      <Navbar
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/signup" element={<Signup />} />
        {/* Pass handleLogin to Login so it can update state */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
