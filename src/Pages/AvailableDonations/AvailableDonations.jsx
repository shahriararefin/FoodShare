import React, { useState, useEffect } from 'react';
import ActionTabs from '../../Components/ActionTabs/ActionTabs';
import DonationCard from '../../Components/DonationCard/DonationCard';
import DonationCardSkeleton from '../../Components/DonationCard/DonationCardSkeleton'; // Import skeleton
import WavyBackground from '../../Components/WavyBackground/WavyBackground';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore'; // Import where
import { db } from '../../firebaseConfig';
import { DONATION_STATUS } from '../../constants/roles'; // Import constants

const AvailableDonations = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Query for donations that are approved and ready to be claimed.
        const q = query(
            collection(db, "donations"),
            where("status", "==", DONATION_STATUS.APPROVED), // <-- The crucial filter
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const donationsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDonations(donationsData);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching available donations:", err);
            setError("Failed to load donations. Please check your connection.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Helper function to keep the JSX clean
    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex flex-col gap-4">
                    {/* Display 5 skeletons while loading */}
                    {[...Array(5)].map((_, index) => <DonationCardSkeleton key={index} />)}
                </div>
            );
        }

        if (error) {
            return <p className="text-center text-red-500">{error}</p>;
        }

        if (donations.length === 0) {
            return <p className="text-center text-gray-500">No available donations at the moment. Check back soon!</p>;
        }

        return (
            <div className="flex flex-col gap-4">
                {donations.map((donation) => (
                    <DonationCard key={donation.id} donation={donation} />
                ))}
            </div>
        );
    };

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

                <div className="w-full max-w-4xl mx-auto mt-4">
                    {renderContent()}
                </div>
            </div>
        </main>
    );
};

export default AvailableDonations;