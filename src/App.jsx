import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import all page and layout components
import Header from './Components/Header/Header'; 
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import Donate from './Pages/Donate/Donate';
import AvailableDonations from './Pages/AvailableDonations/AvailableDonations';
import Profile from './Pages/Profile/Profile';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'; // Import the ProtectedRoute component

function App() {
  return (
    <div className="min-h-screen bg-yellow-100 flex flex-col">
      <Header />
      
      <Routes>
        {/* These routes are public and can be accessed by anyone */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/available-donations" element={<AvailableDonations />} />

        {/* These routes are protected. We wrap their elements in our ProtectedRoute component. */}
        <Route 
          path="/donate" 
          element={
            <ProtectedRoute>
              <Donate />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
