import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Nav = () => {
  // This style will be applied to the active NavLink to underline it
  const activeLinkStyle = {
    textDecoration: 'underline',
    textUnderlineOffset: '6px',
    textDecorationThickness: '2px',
    color: '#1E3A2F'
  };

  return (
    <nav className="flex items-center flex-wrap justify-center gap-4 sm:gap-6">
      <NavLink 
        to="/" 
        className="text-gray-700 font-medium text-sm sm:text-base hover:text-black transition-colors"
        style={({ isActive }) => isActive ? activeLinkStyle : undefined}
      >
        Home
      </NavLink>
      <NavLink 
        to="/donate" 
        className="text-gray-700 font-medium text-sm sm:text-base hover:text-black transition-colors"
        style={({ isActive }) => isActive ? activeLinkStyle : undefined}
      >
        Donate
      </NavLink>
      <NavLink 
        to="/available-donations" 
        className="text-gray-700 font-medium text-sm sm:text-base hover:text-black transition-colors"
        style={({ isActive }) => isActive ? activeLinkStyle : undefined}
      >
        Available Donations
      </NavLink>
      <NavLink 
        to="/about" 
        className="text-gray-700 font-medium text-sm sm:text-base hover:text-black transition-colors"
        style={({ isActive }) => isActive ? activeLinkStyle : undefined}
      >
        About Us
      </NavLink>
      <Link to="/profile">
        <button className="btn btn-sm text-white rounded-full bg-[#0C3B25] hover:bg-[#176b43] px-5 border-none">
          Profile
        </button>
      </Link>
    </nav>
  );
};

export default Nav;
