import React from 'react';

// The component takes 'donation' as a prop
const DonationCard = ({ donation }) => {
  const { title, time, location, contact, status } = donation;

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="font-semibold text-lg text-[#0C3B25]">{title}</div>
        <div className="text-sm text-gray-600">
          Available: <span className="font-medium text-green-700">{time}</span>
        </div>
        <div className="text-sm text-gray-600">
          Location: <span className="font-medium">{location}</span>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Contact:
          <a href={`tel:${contact.phone}`} className="text-[#176b43] underline ml-1">{contact.phone}</a> |
          <a href={`mailto:${contact.email}`} className="text-[#176b43] underline ml-1">{contact.email}</a>
        </div>
      </div>
      <span className={`inline-block mt-2 md:mt-0 px-4 py-1 rounded-full text-xs font-semibold ${
        status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        {status}
      </span>
    </div>
  );
};

export default DonationCard;
