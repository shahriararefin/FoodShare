import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import DonationCard from '../DonationCard/DonationCard';

const RecentDonations = () => {
    // State to hold the list of recent donations from Firestore
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // useEffect hook to set up the real-time listener when the component mounts
    useEffect(() => {
        // Create a query to get documents from the 'donations' collection.
        // - orderBy("createdAt", "desc") sorts them to show the newest first.
        // - limit(3) fetches only the 3 most recent donations.
        const q = query(collection(db, "donations"), orderBy("createdAt", "desc"), limit(3));

        // onSnapshot creates the real-time listener.
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const donationsData = [];
            querySnapshot.forEach((doc) => {
                donationsData.push({ id: doc.id, ...doc.data() });
            });
            setDonations(donationsData);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching recent donations:", err);
            setError("Failed to load recent donations.");
            setLoading(false);
        });

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, []); // Empty array ensures this effect runs only once on mount

    return (
        <div className="w-full max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Recent Donations</h2>
            {loading && <p className="text-center font-semibold">Loading recent donations...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && (
                <div className="flex flex-col gap-4">
                    {donations.length > 0 ? (
                        donations.map(donation => (
                            <DonationCard key={donation.id} donation={donation} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No donations have been made yet.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default RecentDonations;
