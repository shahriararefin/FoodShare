import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { toast } from 'react-toastify';
import { DONATION_STATUS, ROLES } from '../../constants/roles';

const DonationCard = ({ donation }) => {
    // Get both currentUser (for the ID) and userProfile (for the role and name)
    const { currentUser, userProfile } = useAuth();
    const [loading, setLoading] = useState(false);

    const { id, foodType, donorName, quantity, createdAt, address, contactNo, donorEmail, status } = donation;

    const donationDate = createdAt?.toDate().toLocaleDateString('en-GB', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    }) || 'N/A';

    const handleClaim = async () => {
        if (!currentUser || userProfile?.role !== ROLES.NGO) {
            toast.warn("Only approved NGOs can claim donations.");
            return;
        }

        setLoading(true);
        const donationRef = doc(db, 'donations', id);
        try {
            await updateDoc(donationRef, {
                status: DONATION_STATUS.CLAIMED,
                claimedBy: userProfile.name,      // The NGO's name from their profile
                claimedById: currentUser.uid      // THE FIX: The NGO's ID from authentication
            });
            toast.success('Donation claimed successfully! Please coordinate pickup.');
        } catch (err) {
            console.error("Error claiming donation:", err);
            toast.error("Failed to claim donation.");
        } finally {
            setLoading(false);
        }
    };

    const isAvailable = status === DONATION_STATUS.APPROVED || status === DONATION_STATUS.AVAILABLE;

    return (
        <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-grow">
                <div className="font-bold text-lg text-[#0C3B25]">{foodType}</div>
                <p className="text-sm text-gray-500">Donated by: <span className="font-medium">{donorName}</span> | Serves: <span className="font-medium">{quantity}</span></p>
                <p className="text-sm text-gray-600">
                    Date Posted: <span className="font-medium text-green-700">{donationDate}</span>
                </p>
                <p className="text-sm text-gray-600">
                    Location: <span className="font-medium">{address}</span>
                </p>
                <div className="text-sm text-gray-600 mt-1">
                    Contact:
                    <a href={`tel:${contactNo}`} className="text-[#176b43] underline ml-1">{contactNo}</a> |
                    <a href={`mailto:${donorEmail}`} className="text-[#176b43] underline ml-1">{donorEmail}</a>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <span className={`inline-block px-4 py-1 rounded-full text-xs font-semibold ${
                    isAvailable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                    {status}
                </span>

                {userProfile?.role === ROLES.NGO && isAvailable && (
                    <button 
                        onClick={handleClaim}
                        disabled={loading}
                        className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none mt-2 w-36"
                    >
                        {loading ? 'Claiming...' : 'Claim Donation'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default DonationCard;