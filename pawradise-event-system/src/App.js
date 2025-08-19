import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './components/Home';
import About from './components/About';
import Events from './components/Events';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
