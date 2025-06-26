import React from 'react';
import PartnerCard from '../PartnerCard/PartnerCard';

// Mock data for NGO partners
const partners = [
  {
    id: 1,
    logo: '🤝',
    name: 'Helping Hands Foundation',
    area: 'City Center, Riverside',
    contact: 'helpinghands@example.com',
  },
  {
    id: 2,
    logo: '🍲',
    name: 'Food For All Trust',
    area: 'Uptown, Downtown',
    contact: 'foodforall@example.com',
  },
  {
    id: 3,
    logo: '❤️',
    name: 'Share & Care Society',
    area: 'Suburbs, City Outskirts',
    contact: 'sharecare@example.com',
  },
   {
    id: 4,
    logo: '💖',
    name: 'Share & Care Society',
    area: 'Suburbs, City Outskirts',
    contact: 'sharecare@example.com',
  },
];

const NgoPartners = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-12 ">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Our NGO Partners</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partners.map(partner => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>
    </div>
  );
};

export default NgoPartners;
