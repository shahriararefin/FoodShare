import React from 'react';

const ProfileDetails = () => {
  return (
    <div className="w-full max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
      <h3 className="text-2xl font-bold text-center text-[#1E3A2F] mb-6">Your Details</h3>
      <form className="flex flex-col gap-5">
        <div>
          <label className="text-md font-semibold text-gray-700 mb-1 block">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered input-warning w-full bg-yellow-300 placeholder:text-gray-600 font-medium"
            defaultValue="Shahriar Sadi" // Example value
          />
        </div>
        <div>
          <label className="text-md font-semibold text-gray-700 mb-1 block">Email</label>
          <input
            type="email"
            placeholder="your.email@example.com"
            className="input input-bordered input-warning w-full bg-yellow-300 placeholder:text-gray-600 font-medium"
            defaultValue="shahriarsadi@example.com" // Example value
          />
        </div>
        <div>
          <label className="text-md font-semibold text-gray-700 mb-1 block">Contact</label>
          <input
            type="text"
            placeholder="Your Contact No."
            className="input input-bordered input-warning w-full bg-yellow-300 placeholder:text-gray-600 font-medium"
            defaultValue="+123 456 7890" // Example value
          />
        </div>
        <button type="submit" className="btn rounded-full bg-[#0C3B25] hover:bg-[#176b43] text-white font-bold text-lg border-2 border-gray-600 mt-4">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileDetails;
