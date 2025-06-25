import React from 'react';
import ActionTabs from '../../Components/ActionTabs/ActionTabs';
import DonationCard from '../../Components/DonationCard/DonationCard';
import WavyBackground from '../../Components/WavyBackground/WavyBackground';

// Mock data for donations - in a real application, this would come from a database or API.
const donations = [
  {
    id: 1,
    title: 'Fresh Bread & Fruits',
    time: '10:00 AM - 12:00 PM',
    location: '123 Main St, City Center',
    contact: { phone: '+1234567892', email: 'provider1@example.com' },
    status: 'Available',
  },
  {
    id: 2,
    title: 'Vegetable Curry Packets',
    time: '1:00 PM - 2:30 PM',
    location: '456 Lakeview Ave, Riverside',
    contact: { phone: '+1234567893', email: 'provider2@example.com' },
    status: 'Available',
  },
  {
    id: 3,
    title: 'Rice & Dal Meals',
    time: '5:00 PM - 7:00 PM',
    location: '789 Hill Rd, Uptown',
    contact: { phone: '+1234567894', email: 'provider3@example.com' },
    status: 'Available',
  },
];

const AvailableDonations = () => {
  return (
    <main className="flex-1 flex flex-col items-center bg-[#FEFDF9] relative overflow-hidden p-4">
      <WavyBackground />

      <div className="relative z-10 w-full flex flex-col items-center pt-8">
        <div className="w-full flex justify-center mb-4">
          <span className="inline-block bg-yellow-300 text-[#1E3A2F] font-bold text-lg md:text-xl px-8 py-2 rounded-full shadow">
            Available Donations
          </span>
        </div>
        
        <ActionTabs />

        {/* List of Donation Cards */}
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1E3A2F] mb-4 text-center">
            Previously Added Donations
          </h2>
          <div className="flex flex-col gap-4">
            {donations.map((donation) => (
              <DonationCard key={donation.id} donation={donation} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AvailableDonations;
