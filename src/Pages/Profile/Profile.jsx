import React from 'react';
import ProfileDetails from '../../Components/ProfileDetails/ProfileDetails';
import UserDonations from '../../Components/UserDonations/UserDonations'
import WavyBackground from '../../Components/WavyBackground/WavyBackground';


const Profile = () => {
  return (
    <main className="flex-1 flex flex-col items-center bg-[#FEFDF9] relative overflow-hidden p-4">
      <WavyBackground />

      <div className="relative z-10 w-full flex flex-col items-center pt-8">
        <p className="italic text-lg text-center text-gray-700 mb-8 mt-2">
          share surplus, fight hunger, and make a difference
        </p>

        <div className="flex flex-col lg:flex-row w-full justify-center items-start gap-12 px-4">
          {/* Left Side: User Profile Details */}
          <ProfileDetails />
          
          {/* Right Side: User's Donation History */}
          <UserDonations />
        </div>
      </div>
    </main>
  );
};

export default Profile;
