import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const Nav = () => {
  // Get the current user from our AuthContext
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // This style will be applied to the active NavLink
  const activeLinkStyle = {
    textDecoration: 'underline',
    textUnderlineOffset: '6px',
    textDecorationThickness: '2px',
    color: '#1E3A2F'
  };

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('You have been logged out.');
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Failed to log out', error);
      alert('Failed to log out.');
    }
  };

  return (
    <nav className="flex items-center flex-wrap justify-center gap-4 sm:gap-6">
      <NavLink to="/" className="text-gray-700 font-medium text-sm sm:text-base hover:text-black transition-colors" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
        Home
      </NavLink>
      <NavLink to="/donate" className="text-gray-700 font-medium text-sm sm:text-base hover:text-black transition-colors" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
        Donate
      </NavLink>
      <NavLink to="/available-donations" className="text-gray-700 font-medium text-sm sm:text-base hover:text-black transition-colors" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
        Available Donations
      </NavLink>
      <NavLink to="/about" className="text-gray-700 font-medium text-sm sm:text-base hover:text-black transition-colors" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
        About Us
      </NavLink>
      
      {/* This is the conditional rendering part. */}
      {currentUser ? (
        // If currentUser exists (user is logged in), show Profile and Logout.
        <>
          <Link to="/profile">
            <button className="btn btn-sm text-white rounded-full bg-[#0C3B25] hover:bg-[#176b43] px-5 border-none">
              Profile
            </button>
          </Link>
          <button onClick={handleLogout} className="btn btn-sm btn-ghost text-red-600 rounded-full px-5">
            Logout
          </button>
        </>
      ) : (
        // If currentUser is null (user is logged out), show Login and Sign Up.
        <>
          <Link to="/login">
            <button className="btn btn-sm text-white rounded-full bg-[#0C3B25] hover:bg-[#176b43] px-5 border-none">
              Log In
            </button>
          </Link>
          <Link to="/signup" className="text-[#1E3A2F] font-medium text-sm sm:text-base">
            Sign Up
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
