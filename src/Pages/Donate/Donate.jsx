import React from "react";

import DonateForm from '../../Components/DonateForm/DonateForm';
import WavyBackground from '../../Components/WavyBackground/WavyBackground';

const Donate = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center bg-[#FEFDF9] relative overflow-hidden p-4">
      <WavyBackground />
      
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full">
        <DonateForm />
      </div>

      {/* Footer Section */}
      <footer className="relative z-10 w-full bg-yellow-400 p-6 mt-16 text-center">
       
        <p className="max-w-2xl mx-auto text-gray-700 mt-2">
          
        </p>
      </footer>
    </main>
  );
};

export default Donate;