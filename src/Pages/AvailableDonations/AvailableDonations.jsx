import React, { useState, useEffect } from 'react';
import ActionTabs from '../../Components/ActionTabs/ActionTabs';
import DonationCard from '../../Components/DonationCard/DonationCard';
import WavyBackground from '../../Components/WavyBackground/WavyBackground';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const AvailableDonations = () => {
  // State to hold the list of donations fetched from Firestore
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Create a query to get documents from the 'donations' collection,
    // ordered by their creation time in descending order (newest first).
    const q = query(collection(db, "donations"), orderBy("createdAt", "desc"));

    // onSnapshot is a real-time listener. It runs once to get the initial data,
    // and then it runs again every time the data in the collection changes.
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const donationsData = [];
      querySnapshot.forEach((doc) => {
        // We push the document data, along with its unique ID, into our array.
        donationsData.push({ id: doc.id, ...doc.data() });
      });
      setDonations(donationsData); // Update our state with the new data
      setLoading(false);
    }, (err) => {
      // This is the error handler for the listener
      console.error("Error fetching donations:", err);
      setError("Failed to load donations. Please try again later.");
      setLoading(false);
    });

    // This cleanup function unsubscribes from the listener when the component unmounts.
    return () => unsubscribe();
  }, []); // The empty dependency array means this effect runs only once.

  return (
    <main className="flex-1 flex flex-col items-center bg-[#FEFDF9] relative overflow-hidden p-4">
      <WavyBackground />

      <div className="relative z-10 w-full flex flex-col items-center pt-8">
        <div className="w-full flex justify-center mb-4">
          <span className="inline-block bg-yellow-300 text-[#1E3A2F] font-bold text-lg md:text-xl px-8 py-2 rounded-full shadow">
            Available Donations
          </span>
        </div>
        
        <ActionTabs />

        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1E3A2F] mb-4 text-center">
            Current Available Donations
          </h2>
          {loading && <p className="text-center">Loading donations...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && (
            <div className="flex flex-col gap-4">
              {donations.length > 0 ? (
                donations.map((donation) => (
                  <DonationCard key={donation.id} donation={donation} />
                ))
              ) : (
                <p className="text-center text-gray-500">No available donations at the moment. Be the first to share!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AvailableDonations;
