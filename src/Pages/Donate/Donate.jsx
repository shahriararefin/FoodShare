import React from "react";
import DonateForm from '../../Components/DonateForm/DonateForm';
import WavyBackground from '../../Components/WavyBackground/WavyBackground';

const Donate = () => {
  return (
    // The <main> tag should be the top-level element for a page component.
    // The background color is now handled by the main App.jsx layout.
    <main className="flex-1 flex flex-col items-center justify-center bg-[#FEFDF9] relative overflow-hidden p-4">
      <WavyBackground />
      
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full">
        <DonateForm />
      </div>

      {/* Footer Section */}
      
    </main>
  );
};

export default Donate;