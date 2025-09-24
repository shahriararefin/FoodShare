import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, GeoPoint } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { DONATION_STATUS } from '../../constants/roles';
import DonationCard from '../../Components/DonationCard/DonationCard';
import DonationCardSkeleton from '../../Components/DonationCard/DonationCardSkeleton';
import WavyBackground from '../../Components/WavyBackground/WavyBackground';
import { toast } from 'react-toastify';

// --- HELPER FUNCTION to calculate distance between two lat/lng points ---
// This is the Haversine formula, which calculates the great-circle distance
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
};

const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};


const AvailableDonations = () => {
    // State for all donations fetched from Firestore
    const [allDonations, setAllDonations] = useState([]);
    // State for donations that are displayed after filtering
    const [filteredDonations, setFilteredDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State for the filter UI
    const [radius, setRadius] = useState(10); // Default radius of 10km
    const [isFiltering, setIsFiltering] = useState(false);

    // Fetch all approved donations
    useEffect(() => {
        const q = query(
            collection(db, "donations"),
            where("status", "==", DONATION_STATUS.APPROVED),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const donationsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAllDonations(donationsData);
            setFilteredDonations(donationsData); // Initially, show all
            setLoading(false);
        }, (err) => {
            console.error("Error fetching available donations:", err);
            setError("Failed to load donations.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleFilterByDistance = () => {
        setIsFiltering(true);

        // 1. Get user's current location from the browser
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser.");
            setIsFiltering(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                // 2. Filter the donations based on distance
                const nearbyDonations = allDonations.filter(donation => {
                    if (donation.location instanceof GeoPoint) {
                        const distance = getDistanceFromLatLonInKm(
                            latitude,
                            longitude,
                            donation.location.latitude,
                            donation.location.longitude
                        );
                        return distance <= radius;
                    }
                    return false;
                });

                setFilteredDonations(nearbyDonations);
                toast.success(`Showing ${nearbyDonations.length} donations within ${radius} km.`);
                setIsFiltering(false);
            },
            () => {
                toast.error("Unable to retrieve your location. Please enable location services.");
                setIsFiltering(false);
            }
        );
    };

    const clearFilter = () => {
        setFilteredDonations(allDonations);
        setRadius(10);
        toast.info("Filter cleared.");
    };
    
    // ... (Your renderContent function can be adapted for the new state)

    return (
        <main className="flex-1 flex flex-col items-center bg-[#FEFDF9] relative overflow-hidden p-4">
            <WavyBackground />
            <div className="relative z-10 w-full flex flex-col items-center pt-8">
                {/* --- NEW: Filter UI --- */}
               <div className="w-full max-w-4xl mx-auto p-4 bg-white/60 backdrop-blur-sm rounded-lg shadow-md mb-8">
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <label htmlFor="radius" className="font-semibold text-gray-700">
            Show donations within:
        </label>

        <div className="flex items-center gap-2">
            <input
                type="number"
                id="radius"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                // 👇 Updated classes to match your theme's inputs
                className="input bg-yellow-400/80 text-gray-800 font-semibold rounded-full border-2 border-gray-600 w-24 text-center"
            />
            <span className="font-semibold text-gray-700">km</span>
        </div>

        <button
            onClick={handleFilterByDistance}
            disabled={isFiltering}
            // 👇 Updated classes to match your primary action button
            className="btn rounded-full bg-[#0C3B25] hover:bg-[#176b43] text-white font-bold border-2 border-gray-600 disabled:opacity-50"
        >
            {isFiltering ? 'Locating...' : 'Filter'}
        </button>

        <button
            onClick={clearFilter}
            // 👇 Updated classes for a subtle, secondary action
            className="btn btn-ghost hover:bg-gray-200 rounded-full"
        >
            Clear Filter
        </button>
    </div>
</div>
                <div className="w-full max-w-4xl mx-auto">
                    {/* Your existing rendering logic */}
                    {loading && <DonationCardSkeleton />}
                    {error && <p className="text-center text-red-500">{error}</p>}
                    {!loading && !error && (
                        <div className="flex flex-col gap-4">
                            {filteredDonations.length > 0 ? (
                                filteredDonations.map((donation) => (
                                    <DonationCard key={donation.id} donation={donation} />
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No available donations match your criteria.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default AvailableDonations;