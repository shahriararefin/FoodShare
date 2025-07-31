import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const Nav = () => {
  // Get both the auth user and their Firestore profile (which contains the role)
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();

  const activeLinkStyle = {
    textDecoration: 'underline',
    textUnderlineOffset: '6px',
    textDecorationThickness: '2px',
    color: '#1E3A2F'
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('You have been logged out.');
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
      alert('Failed to log out.');
    }
  };

  return (
    <nav className="flex items-center flex-wrap justify-center gap-4 sm:gap-6">
      {/* Regular Links */}
      <NavLink to="/" className="text-gray-700 font-medium text-sm sm:text-base hover:text-black" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Home</NavLink>
      <NavLink to="/donate" className="text-gray-700 font-medium text-sm sm:text-base hover:text-black" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Donate</NavLink>
      <NavLink to="/available-donations" className="text-gray-700 font-medium text-sm sm:text-base hover:text-black" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Available Donations</NavLink>
      <NavLink to="/about" className="text-gray-700 font-medium text-sm sm:text-base hover:text-black" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>About Us</NavLink>
      
      {/* NEW: Conditionally render the Admin Dashboard link */}
      {userProfile && userProfile.role === 'admin' && (
        <NavLink to="/admin" className="text-blue-600 font-bold text-sm sm:text-base hover:text-blue-800" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
          Admin
        </NavLink>
      )}

      {/* Auth Links */}
      {currentUser ? (
        <>
          <Link to="/profile">
            <button className="btn btn-sm text-white rounded-full bg-[#0C3B25] hover:bg-[#176b43] px-5 border-none">Profile</button>
          </Link>
          <button onClick={handleLogout} className="btn btn-sm btn-ghost text-red-600 rounded-full px-5">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">
            <button className="btn btn-sm text-white rounded-full bg-[#0C3B25] hover:bg-[#176b43] px-5 border-none">Log In</button>
          </Link>
          <Link to="/signup" className="text-[#1E3A2F] font-medium text-sm sm:text-base">Sign Up</Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
