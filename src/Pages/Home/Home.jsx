import React from 'react';
import { Link } from 'react-router-dom';
import DonationActions from '../../Components/DonationActions/DonationActions';
import RecentDonations from '../../Components/RecentDonations/RecentDonations';

const Home = () => {
  return (
    <div className="nax-h-screen bg-yellow-100 flex flex-col overflow-hidden">
      {/* Simplified Header for Home Page */}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <DonationActions />
        <RecentDonations />
      </main>
    </div>
  );
};

export default Home;