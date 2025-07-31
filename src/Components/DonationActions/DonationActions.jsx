import React from 'react';
import { Link } from 'react-router-dom';

const DonationActions = () => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 my-12">
            {/* Donate Food Card */}
            <Link to="/donate" className="text-center group">
                <div className="w-48 h-48 bg-yellow-400 rounded-2xl mb-4 shadow-lg transition-transform transform group-hover:scale-105 overflow-hidden">
                    <img 
                        src="/donate.jpg" 
                        alt="A person holding a box of fresh food to donate" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="btn rounded-full bg-yellow-400 text-gray-800 font-bold border-2 border-gray-600 group-hover:bg-yellow-500 px-8">
                    Donate Food
                </div>
            </Link>

            {/* Available Donations Card */}
            <Link to="/available-donations" className="text-center group">
                <div className="w-48 h-48 bg-yellow-400 rounded-2xl mb-4 shadow-lg transition-transform transform group-hover:scale-105 overflow-hidden">
                     <img 
                        src="/available_donations.jpg" 
                        alt="A collection of available donated food items" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="btn rounded-full bg-yellow-400 text-gray-800 font-bold border-2 border-gray-600 group-hover:bg-yellow-500 px-8">
                    Available Donations
                </div>
            </Link>
        </div>
    );
};

export default DonationActions;
