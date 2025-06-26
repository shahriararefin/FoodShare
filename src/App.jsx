//src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import all page and layout components from their specific sub-folders
import Header from './Components/Header/Header'; 
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import Donate from './Pages/Donate/Donate';
import AvailableDonations from './Pages/AvailableDonations/AvailableDonations';
import Profile from './Pages/Profile/Profile';

function App() {
  return (
    // This div sets the overall background and layout for all pages
    <div className="min-h-screen bg-yellow-100 flex flex-col">
      {/* The single, shared Header component appears on every page */}
      <Header />
      
      {/* The Routes component handles switching between the different page components */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/available-donations" element={<AvailableDonations />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
