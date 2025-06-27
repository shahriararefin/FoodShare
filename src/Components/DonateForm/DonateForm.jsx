import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const DonateForm = () => {
  // Get the current user to associate the donation with them
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // State to manage the form inputs
  const [formData, setFormData] = useState({
    donorName: '',
    foodType: '',
    quantity: '',
    address: '',
    contactNo: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // A single handler to update the form data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setError('You must be logged in to make a donation.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      // Create a reference to the 'donations' collection in Firestore
      const donationsCollectionRef = collection(db, 'donations');
      
      // Use addDoc to create a new document with an auto-generated ID
      await addDoc(donationsCollectionRef, {
        ...formData, // Spread all the form data into the document
        donorId: currentUser.uid, // Add the ID of the user who is donating
        donorEmail: currentUser.email, // Also store the donor's email
        status: 'Available', // Set the initial status
        createdAt: serverTimestamp(), // Use a server timestamp for creation time
      });

      alert('Donation submitted successfully! Thank you.');
      navigate('/available-donations'); // Redirect to the list of donations

    } catch (err) {
      console.error("Error submitting donation:", err);
      setError('Failed to submit donation. Please try again.');
      alert('Failed to submit donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto z-10">
      <div className="text-center mb-8">
        <h2 className="inline-block bg-yellow-400 text-gray-800 font-bold text-xl px-6 py-2 rounded-full shadow-md">
          Share Your Surplus
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <div>
            <label className="text-lg font-semibold text-gray-700 mb-2 block">Donor/ Event name</label>
            <input
              type="text" name="donorName" value={formData.donorName} onChange={handleChange}
              placeholder="e.g. name" required
              className="input bg-yellow-400/70 placeholder-gray-600 font-semibold rounded-full border-2 border-gray-600 w-full focus:border-green-800 focus:ring-green-800"
            />
          </div>
          <div>
            <label className="text-lg font-semibold text-gray-700 mb-2 block">Type of Food</label>
            <input
              type="text" name="foodType" value={formData.foodType} onChange={handleChange}
              placeholder="e.g. cooked meal" required
              className="input bg-yellow-400/70 placeholder-gray-600 font-semibold rounded-full border-2 border-gray-600 w-full focus:border-green-800 focus:ring-green-800"
            />
          </div>
          <div>
            <label className="text-lg font-semibold text-gray-700 mb-2 block">Quantity (for how many people)</label>
            <input
              type="number" name="quantity" value={formData.quantity} onChange={handleChange}
              placeholder="e.g. 50" required
              className="input bg-yellow-400/70 placeholder-gray-600 font-semibold rounded-full border-2 border-gray-600 w-full focus:border-green-800 focus:ring-green-800"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <div>
            <label className="text-lg font-semibold text-gray-700 mb-2 block">Address/ Location</label>
            <input
              type="text" name="address" value={formData.address} onChange={handleChange}
              placeholder="e.g. pickup location" required
              className="input bg-yellow-400/70 placeholder-gray-600 font-semibold rounded-full border-2 border-gray-600 w-full focus:border-green-800 focus:ring-green-800"
            />
          </div>
          <div>
            <label className="text-lg font-semibold text-gray-700 mb-2 block">Contact No.</label>
            <input
              type="tel" name="contactNo" value={formData.contactNo} onChange={handleChange}
              placeholder="e.g. +123456789" required
              className="input bg-yellow-400/70 placeholder-gray-600 font-semibold rounded-full border-2 border-gray-600 w-full focus:border-green-800 focus:ring-green-800"
            />
          </div>
          <div className="mt-auto">
             <button type="submit" disabled={loading} className="btn rounded-full bg-[#0C3B25] hover:bg-[#176b43] text-white font-bold text-lg border-2 border-gray-600 w-full md:w-auto px-16 disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default DonateForm;
