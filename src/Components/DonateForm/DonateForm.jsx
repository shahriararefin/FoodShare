import React from 'react';

const DonateForm = () => {
  return (
    <div className="w-full max-w-4xl mx-auto z-10">
      <div className="text-center mb-8">
        <h2 className="inline-block bg-yellow-400 text-gray-800 font-bold text-xl px-6 py-2 rounded-full shadow-md">
          Share Your Surplus
        </h2>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <div>
            <label className="text-lg font-semibold text-gray-700 mb-2 block">Donor/ Event name</label>
            <input
              type="text"
              placeholder="e.g. name"
              className="input bg-yellow-400/70 placeholder-gray-600 font-semibold rounded-full border-2 border-gray-600 w-full focus:border-green-800 focus:ring-green-800"
            />
          </div>
          <div>
            <label className="text-lg font-semibold text-gray-700 mb-2 block">Type of Food</label>
            <input
              type="text"
              placeholder="e.g. cooked meal"
              className="input bg-yellow-400/70 placeholder-gray-600 font-semibold rounded-full border-2 border-gray-600 w-full focus:border-green-800 focus:ring-green-800"
            />
          </div>
          <div>
            <label className="text-lg font-semibold text-gray-700 mb-2 block">Quantity</label>
            <input
              type="text"
              placeholder="e.g. 50"
              className="input bg-yellow-400/70 placeholder-gray-600 font-semibold rounded-full border-2 border-gray-600 w-full focus:border-green-800 focus:ring-green-800"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <div>
            <label className="text-lg font-semibold text-gray-700 mb-2 block">Address/ Location</label>
            <input
              type="text"
              placeholder="e.g. pickup location"
              className="input bg-yellow-400/70 placeholder-gray-600 font-semibold rounded-full border-2 border-gray-600 w-full focus:border-green-800 focus:ring-green-800"
            />
          </div>
          <div>
            <label className="text-lg font-semibold text-gray-700 mb-2 block">Contact No.</label>
            <input
              type="text"
              placeholder="e.g. pickup location"
              className="input bg-yellow-400/70 placeholder-gray-600 font-semibold rounded-full border-2 border-gray-600 w-full focus:border-green-800 focus:ring-green-800"
            />
          </div>
          <div className="mt-auto">
             <button type="submit" className="btn rounded-full bg-[#0C3B25] hover:bg-[#176b43] text-white font-bold text-lg border-2 border-gray-600 w-full md:w-auto px-16">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DonateForm;
