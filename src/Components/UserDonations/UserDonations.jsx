import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import DonationCard from '../DonationCard/DonationCard'; 

const UserDonations = () => {
  // Get the current user from our global authentication context.
  const { currentUser } = useAuth();
  
  // State to hold the list of this user's specific donations.
  const [userDonations, setUserDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // useEffect runs when the component mounts to set up the data listener.
  useEffect(() => {
    // We only try to fetch data if there is a logged-in user.
    if (!currentUser) {
      setLoading(false);
      return;
    }

    // 1. Create a reference to the 'donations' collection.
    const donationsCollectionRef = collection(db, "donations");
    
    // 2. Create a query against the collection.
    //    - `where("donorId", "==", currentUser.uid)` is the crucial filter. It tells Firestore
    //      to only return documents where the 'donorId' field exactly matches the current user's ID.
    //    - `orderBy("createdAt", "desc")` sorts the results to show the newest donations first.
    const q = query(donationsCollectionRef, where("donorId", "==", currentUser.uid), orderBy("createdAt", "desc"));

    // 3. onSnapshot creates a real-time listener for this specific query.
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const donationsData = [];
      querySnapshot.forEach((doc) => {
        donationsData.push({ id: doc.id, ...doc.data() });
      });
      setUserDonations(donationsData); // Update state with the user's donations.
      setLoading(false);
    }, (err) => {
      console.error("Error fetching user donations:", err);
      setError("Failed to load your donations.");
      setLoading(false);
    });

    // Cleanup the listener when the component unmounts.
    return () => unsubscribe();
  }, [currentUser]); // The effect depends on `currentUser` to re-fetch if the user changes.

  return (
    <div className="w-full max-w-xl">
       <div className="flex items-center justify-center gap-4 mb-6">
        <span className="font-bold text-xl text-[#1E3A2F]">My Donations</span>
        <input
          type="text"
          value={`Total: ${userDonations.length}`}
          readOnly
          className="input input-warning bg-yellow-300 font-medium w-48 text-center pointer-events-none rounded-full"
        />
      </div>
      <div className="flex flex-col gap-4">
        {loading && <p className="text-center">Loading your donations...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
            userDonations.length > 0 ? (
                userDonations.map(donation => (
                    <DonationCard key={donation.id} donation={donation} />
                ))
            ) : (
                <p className="text-center text-gray-500">You have not made any donations yet.</p>
            )
        )}
      </div>
    </div>
  );
};

export default UserDonations;
