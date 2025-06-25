import React from 'react';
import InfoSection from '../../Components/InfoSection/InfoSection';
import LoginForm from '../../Components/LoginForm/LoginForm';
import WavyBackground from '../../Components/WavyBackground/WavyBackground';

const Login = () => {
  return (
    // Set the main background to off-white and remove padding
    <main className="flex-1 flex flex-col md:flex-row items-center bg-[#FEFDF9] relative overflow-hidden">
      <WavyBackground />
      
      {/* This container ensures your content sits on top of the background */}
      <div className="relative z-10 flex flex-1 flex-col md:flex-row items-center justify-between w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <InfoSection />
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
