import React from 'react';
import DonationCard from '../DonationCard/DonationCard';

// Mock data for recent donations
const recentDonationsData = [
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
        contact: { phone: '+1234567891', email: 'provider2@example.com' },
        status: 'Available',
    },
];

const RecentDonations = () => {
    return (
        <div className="w-full max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Recent Donations</h2>
            <div className="flex flex-col gap-4">
                {recentDonationsData.map(donation => (
                    <DonationCard key={donation.id} donation={donation} />
                ))}
            </div>
        </div>
    );
};

export default RecentDonations;
