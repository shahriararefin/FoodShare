import React from 'react';
import SignupForm from '../../Components/SignupForm/SignupForm';
import WavyBackground from '../../Components/WavyBackground/WavyBackground';

const Signup = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center bg-[#FEFDF9] relative overflow-hidden p-4">
      <WavyBackground />
      
      {/* This container ensures your content sits on top of the background and is centered */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center w-full max-w-screen-md mx-auto">
        <SignupForm />
      </div>
    </main>
  );
};

export default Signup;
