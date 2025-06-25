import React from 'react';

const PartnerCard = ({ partner }) => {
  const { logo, name, area, contact } = partner;

  return (
    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg flex items-center gap-4 w-full max-w-sm">
      <div className="w-16 h-16 bg-blue-200 rounded-full flex-shrink-0 flex items-center justify-center">
        {/* You can use an img tag here if you have actual logos */}
        <span className="text-2xl">{logo}</span>
      </div>
      <div>
        <h4 className="font-bold text-gray-800">{name}</h4>
        <p className="text-sm text-gray-600">Serving: {area}</p>
        <p className="text-sm text-gray-600">
          Contact: <a href={`mailto:${contact}`} className="text-blue-600 underline">{contact}</a>
        </p>
      </div>
    </div>
  );
};

export default PartnerCard;
