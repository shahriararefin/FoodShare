import React from 'react';

const InfoSection = () => {
  return (
    <section className="flex-1 flex flex-col gap-6 max-w-xl z-10 text-center md:text-left mb-12 md:mb-0 p-4">
      <div className="flex gap-4 items-center justify-center md:justify-start">
        <img
          src="https://img.icons8.com/ios/50/broccoli.png"
          alt="Broccoli"
          className="w-12 h-12"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/50x50/FBBF24/1E3A2F?text=Broc'; }}
        />
        <img
          src="https://img.icons8.com/ios/50/carrot.png"
          alt="Carrot"
          className="w-12 h-12"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/50x50/FBBF24/1E3A2F?text=Carrot'; }}
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A2F] leading-tight">
        REDUCE WASTE,
        <br />
        SHARE FOOD,
        <br />
        CHANGE LIVES
      </h1>
      <p className="italic text-yellow-700 text-lg">
        Sharing food with those in need
      </p>
    </section>
  );
};

export default InfoSection;
