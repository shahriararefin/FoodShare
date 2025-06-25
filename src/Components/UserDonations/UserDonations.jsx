import React from 'react';
// Correct the import path to be a relative path from the current directory
import DonationCard from '../../Components/DonationCard/DonationCard'; 

// Mock data for this specific user's donations
const userDonations = [
  {
    id: 1,
    title: 'Leftover party food',
    time: 'June 24, 2025',
    location: '123 Main St, City Center',
    contact: { phone: '+1234567892', email: 'provider1@example.com' },
    status: 'Completed',
  },
  {
    id: 2,
    title: 'Canned Goods Drive',
    time: 'May 15, 2025',
    location: '456 Lakeview Ave, Riverside',
    contact: { phone: '+1234567893', email: 'provider2@example.com' },
    status: 'Completed',
  },
];

const UserDonations = () => {
  return (
    <div className="w-full max-w-xl">
       <div className="flex items-center justify-center gap-4 mb-6">
        <span className="font-bold text-xl text-[#1E3A2F]">My Donations</span>
        <input
          type="text"
          value={`Total: ${userDonations.length}`}
          readOnly
          className="input input-warning bg-yellow-300 font-medium w-48 text-center pointer-events-none rounded-full"
        />
      </div>
      <div className="flex flex-col gap-4">
        {userDonations.map(donation => (
          <DonationCard key={donation.id} donation={donation} />
        ))}
      </div>
    </div>
  );
};

export default UserDonations;
