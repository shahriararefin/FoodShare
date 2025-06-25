import React from 'react';
import { NavLink } from 'react-router-dom';

const HomeNav = () => {
    const activeLinkStyle = {
        backgroundColor: '#0C3B25',
        color: 'white',
    };

    return (
        <nav className="flex items-center gap-4">
            <NavLink
                to="/"
                className="btn btn-sm rounded-full bg-transparent text-gray-800 border-2 border-gray-600 hover:bg-[#0C3B25] hover:text-white"
                style={({ isActive }) => isActive ? activeLinkStyle : undefined}
            >
                Home
            </NavLink>
            <NavLink
                to="/about"
                className="btn btn-sm rounded-full bg-transparent text-gray-800 border-2 border-gray-600 hover:bg-[#0C3B25] hover:text-white"
                style={({ isActive }) => isActive ? activeLinkStyle : undefined}
            >
                About Us
            </NavLink>
            <NavLink
                to="/profile"
                className="btn btn-sm rounded-full bg-transparent text-gray-800 border-2 border-gray-600 hover:bg-[#0C3B25] hover:text-white"
                style={({ isActive }) => isActive ? activeLinkStyle : undefined}
            >
                Profile
            </NavLink>
        </nav>
    );
};

export default HomeNav;
