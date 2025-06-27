import React from 'react';

const DonationCard = ({ donation }) => {
  // Destructure the properties from the donation object passed as a prop
  const { foodType, donorName, quantity, createdAt, address, contactNo, donorEmail, status } = donation;

  // Format the timestamp to a more readable date string
  const donationDate = createdAt ? new Date(createdAt.seconds * 1000).toLocaleDateString() : 'N/A';

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="font-bold text-lg text-[#0C3B25]">{foodType}</div>
        <p className="text-sm text-gray-500">Donated by: <span className="font-medium">{donorName}</span> | Serves: <span className="font-medium">{quantity}</span></p>
        <p className="text-sm text-gray-600">
          Date Posted: <span className="font-medium text-green-700">{donationDate}</span>
        </p>
        <p className="text-sm text-gray-600">
          Location: <span className="font-medium">{address}</span>
        </p>
        <div className="text-sm text-gray-600 mt-1">
          Contact:
          <a href={`tel:${contactNo}`} className="text-[#176b43] underline ml-1">{contactNo}</a> |
          <a href={`mailto:${donorEmail}`} className="text-[#176b43] underline ml-1">{donorEmail}</a>
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
