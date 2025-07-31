// src/components/RecentDonations/RecentDonations.jsx

import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { DONATION_STATUS } from '../../constants/roles'; // Assuming you have constants
import DonationCard from '../DonationCard/DonationCard';
import DonationCardSkeleton from '../DonationCard/DonationCardSkeleton'; // Import skeleton

const RecentDonations = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const q = query(
            collection(db, "donations"),
            where("status", "==", DONATION_STATUS.APPROVED), // Using constant
            orderBy("createdAt", "desc"),
            limit(3)
        );

        // Note: This query requires a composite index in Firestore.
        // Check your browser console for a link to create it if it doesn't exist.

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const donationsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDonations(donationsData);
            setLoading(false);
            setError(''); // Clear any previous errors on successful fetch
        }, (err) => {
            console.error("Error fetching recent donations:", err);
            setError("Failed to load donations. Please try again later.");
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup subscription
    }, []);

    // Helper function to keep JSX clean
    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex flex-col gap-4">
                    {[...Array(3)].map((_, index) => <DonationCardSkeleton key={index} />)}
                </div>
            );
        }

        if (error) {
            return <p className="text-center text-red-500">{error}</p>;
        }

        if (donations.length === 0) {
            return <p className="text-center text-gray-500">No recent donations are available.</p>;
        }

        return (
            <div className="flex flex-col gap-4">
                {donations.map(donation => (
                    <DonationCard key={donation.id} donation={donation} />
                ))}
            </div>
        );
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Recent Donations</h2>
            {renderContent()}
        </div>
    );
};

export default RecentDonations;