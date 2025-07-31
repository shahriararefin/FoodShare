import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import components
import Header from './Components/Header/Header'; 
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import Donate from './Pages/Donate/Donate';
import AvailableDonations from './Pages/AvailableDonations/AvailableDonations';
import Profile from './Pages/Profile/Profile';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';

const App = () => {
  return (
    <div className="min-h-screen bg-yellow-100 flex flex-col">
      <Header />
      
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/available-donations" element={<AvailableDonations />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Protected routes that just require login */}
        <Route path="/donate" element={<ProtectedRoute><Donate /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Protected route that requires the 'admin' role */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
      
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;