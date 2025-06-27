import React from 'react';
import { Link } from 'react-router-dom';

const ActionTabs = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-8">
      {/* Request Pickup Tab
      <Link
        to="/available-donations" // This could link to a specific request page later
        className="flex flex-col items-center bg-[#0C3B25] hover:bg-[#176b43] text-white font-bold px-10 py-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
      >
        <svg width="40" height="40" fill="none" viewBox="0 0 24 24" className="mb-2">
          <path
            d="M3 13h2l.4 2M7 13h10l1.2-4H6.4M7 13l-1.2 4M17 13l1.2 4M5 21h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2z"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Request Pickup
      </Link> */}
      {/* Donate Food Tab */}
      <Link
        to="/donate"
        className="flex flex-col items-center bg-yellow-300 hover:bg-yellow-400 text-[#1E3A2F] font-bold px-10 py-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
      >
        <svg width="40" height="40" fill="none" viewBox="0 0 24 24" className="mb-2">
          <path
            d="M12 21c-4.97 0-9-4.03-9-9 0-4.97 4.03-9 9-9s9 4.03 9 9c0 4.97-4.03 9-9 9zm0-16a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm1 7h4v2h-4v4h-2v-4H7v-2h4V7h2v4z"
            fill="#1E3A2F"
          />
        </svg>
        Donate Food
      </Link>
    </div>
  );
};

export default ActionTabs;
