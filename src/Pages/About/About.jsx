import React from 'react';
import { Link } from 'react-router-dom';
import NgoPartners from '../../Components/NgoPartners/NgoPartners';

const About = () => {
  return (
    <div className="min-h-screen bg-yellow-100 flex flex-col">
     
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start p-8">
        <div className="w-48 h-48 bg-yellow-400 rounded-full my-8 shadow-lg">
            {/* You can place an image of a person or logo here */}
        </div>
        <div className="bg-yellow-400 text-gray-800 font-semibold text-lg px-8 py-4 rounded-full shadow-md text-center max-w-2xl">
            We will be at your door to pick up the food and share it to needy ones
        </div>
        <NgoPartners />
      </main>
    </div>
  );
};

export default About;
