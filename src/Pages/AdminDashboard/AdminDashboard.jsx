
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc, orderBy } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import WavyBackground from '../../Components/WavyBackground/WavyBackground';
import { toast } from 'react-toastify';
import { DONATION_STATUS } from '../../constants/roles';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
    const [pendingDonations, setPendingDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updatingId, setUpdatingId] = useState(null);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (!currentUser) {
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, "donations"),
            where("status", "==", DONATION_STATUS.PENDING),
            orderBy("createdAt", "asc")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const donationsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPendingDonations(donationsData);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching pending donations:", err);
            setError("Failed to load pending donations.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser]);

    const updateDonationStatus = async (donationId, newStatus) => {
        setUpdatingId(donationId);
        const donationRef = doc(db, 'donations', donationId);
        try {
            await updateDoc(donationRef, { status: newStatus });
            toast.success(`Donation has been ${newStatus}!`);
        } catch (err) {
            console.error(`Error updating donation to ${newStatus}:`, err);
            toast.error(`Failed to update donation. Please try again.`);
        } finally {
            setUpdatingId(null);
        }
    };

    const renderContent = () => {
        if (loading) {
            return <p className="text-center font-semibold p-8">Loading pending donations...</p>;
        }
        if (error) {
            return <p className="text-center text-red-500 p-8">{error}</p>;
        }
        if (pendingDonations.length === 0) {
            return <p className="text-center text-gray-500 p-8">No pending donations to review.</p>;
        }

        return pendingDonations.map(donation => {
            const isUpdating = updatingId === donation.id;
            const donationDate = donation.createdAt?.toDate().toLocaleDateString() || 'N/A';

            return (
                <div key={donation.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                        <p className="font-bold text-lg">{donation.foodType} <span className="font-normal text-base">(Serves: {donation.quantity})</span></p>
                        <p className="text-sm text-gray-600">From: <span className="font-medium">{donation.donorName}</span> at {donation.address}</p>
                        <p className="text-xs text-gray-500">Submitted on: {donationDate}</p>
                    </div>
                    <div className="flex gap-2 self-end sm:self-center">
                        <button
                            onClick={() => updateDonationStatus(donation.id, DONATION_STATUS.APPROVED)}
                            disabled={isUpdating}
                            className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-none w-28"
                        >
                            {isUpdating ? '...' : 'Approve'}
                        </button>
                        <button
                            onClick={() => updateDonationStatus(donation.id, DONATION_STATUS.REJECTED)}
                            disabled={isUpdating}
                            className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none w-28"
                        >
                            {isUpdating ? '...' : 'Reject'}
                        </button>
                    </div>
                </div>
            );
        });
    };

    return (
        <main className="flex-1 flex flex-col items-center bg-[#FEFDF9] relative overflow-hidden p-4">
            <WavyBackground />
            <div className="relative z-10 w-full max-w-5xl mx-auto pt-8">
                <h1 className="text-3xl font-bold text-center text-[#1E3A2F] mb-8">Admin Dashboard</h1>
                <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Pending Donations for Approval</h2>
                    <div className="space-y-4">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AdminDashboard;