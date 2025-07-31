// src/Components/UserDonations/UserDonations.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import DonationCard from '../DonationCard/DonationCard'; // We'll reuse the card component
import { ROLES } from '../../constants/roles';

const UserDonations = () => {
    const { currentUser, userProfile } = useAuth();
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!currentUser || !userProfile) {
            setLoading(false);
            return;
        }

        let fieldToQuery = '';
        if (userProfile.role === ROLES.DONOR) {
            fieldToQuery = 'donorId';
        } else if (userProfile.role === ROLES.NGO) {
            fieldToQuery = 'claimedById';
        } else {
            setLoading(false);
            return; // Don't fetch for other roles like admin on this component
        }

        const q = query(
            collection(db, "donations"),
            where(fieldToQuery, "==", currentUser.uid),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const userDonations = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDonations(userDonations);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching user donations:", err);
            setError("Failed to load your donations.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser, userProfile]);

    const title = userProfile.role === ROLES.NGO ? "My Claimed Donations" : "My Donations";
    const emptyMessage = userProfile.role === ROLES.NGO ? "You have not claimed any donations yet." : "You have not made any donations yet.";

    if (loading) return <p className="text-center font-semibold">Loading your donations...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="w-full max-w-2xl">
            <h3 className="text-2xl font-bold text-center text-[#1E3A2F] mb-6">{title}</h3>
            <div className="flex flex-col gap-4">
                {donations.length > 0 ? (
                    donations.map(donation => <DonationCard key={donation.id} donation={donation} />)
                ) : (
                    <p className="text-center text-gray-500 bg-white/50 p-4 rounded-lg">{emptyMessage}</p>
                )}
            </div>
        </div>
    );
};

export default UserDonations;