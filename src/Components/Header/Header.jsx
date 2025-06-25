import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav'; 

const Header = () => {
  return (
    <header className="flex flex-wrap justify-center sm:justify-between items-center px-8 py-4 bg-yellow-300 z-20">
      <Link to="/" className="flex items-center gap-2 mb-4 sm:mb-0">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path d="M2 12L22 2L12 22L10 14L2 12Z" fill="#1E3A2F" />
        </svg>
        <span className="font-bold text-lg text-[#1E3A2F]">FoodShare</span>
      </Link>
      {/* All navigation links are now handled by the Nav component */}
      <Nav /> 
    </header>
  );
};

export default Header;