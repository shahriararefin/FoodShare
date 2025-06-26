import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav'; 
import logo from '../../assets/logo.png'; // Adjust the path if needed

const Header = () => {
  return (
    <header className="flex flex-wrap justify-center sm:justify-between items-center px-8 py-4 bg-yellow-300 z-20">
      <Link to="/" className="flex items-center gap-2 mb-4 sm:mb-0">
        <img src={logo} alt="FoodShare Logo" className="h-8 w-10 object-contain" />
        <span className="font-bold text-lg text-[#1E3A2F]">FoodShare</span>
      </Link>
      {/* All navigation links are now handled by the Nav component */}
      <Nav /> 
    </header>
  );
};

export default Header;