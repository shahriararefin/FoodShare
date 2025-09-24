import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc, serverTimestamp, GeoPoint } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { toast } from 'react-toastify';
import { DONATION_STATUS } from '../../constants/roles';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

const DonateForm = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        donorName: '',
        foodType: '',
        quantity: '',
        contactNo: '',
    });
    const [address, setAddress] = useState(null);
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddressSelect = async (selectedAddress) => {
        setAddress(selectedAddress);
        try {
            const results = await geocodeByAddress(selectedAddress.label);
            const latLng = await getLatLng(results[0]);
            setCoords(latLng);
        } catch (error) {
            console.error('Error getting coordinates', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!currentUser) {
            toast.error('You must be logged in to donate.');
            return setLoading(false);
        }
        
        if (!address || !coords) {
            toast.error("Please select a valid address from the suggestions.");
            return setLoading(false);
        }

        try {
            await addDoc(collection(db, 'donations'), {
                ...formData,
                address: address.label,
                quantity: Number(formData.quantity),
                donorId: currentUser.uid,
                donorEmail: currentUser.email,
                status: DONATION_STATUS.PENDING,
                createdAt: serverTimestamp(),
                location: new GeoPoint(coords.lat, coords.lng),
            });

            toast.success('Donation submitted for review! Thank you.');
            navigate('/profile');
        } catch (err) {
            console.error("Error submitting donation:", err);
            toast.error('Failed to submit donation. Please try again.');
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
                        <label className="text-lg font-semibold text-gray-700 mb-2 block">Donor/Event Name</label>
                        <input
                            type="text" name="donorName" value={formData.donorName} onChange={handleChange}
                            placeholder="e.g. Your Name or Event Name" required
                            className="input bg-yellow-400/70 placeholder-gray-600 font-semibold rounded-full border-2 border-gray-600 w-full focus:border-green-800 focus:ring-green-800"
                        />
                    </div>
                    <div>
                        <label className="text-lg font-semibold text-gray-700 mb-2 block">Type of Food</label>
                        <input
                            type="text" name="foodType" value={formData.foodType} onChange={handleChange}
                            placeholder="e.g. Cooked Meals, Groceries" required
                            className="input bg-yellow-400/70 placeholder-gray-600 font-semibold rounded-full border-2 border-gray-600 w-full focus:border-green-800 focus:ring-green-800"
                        />
                    </div>
                    <div>
                        <label className="text-lg font-semibold text-gray-700 mb-2 block">Quantity (serves approx.)</label>
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
                        <label className="text-lg font-semibold text-gray-700 mb-2 block">Address / Location</label>
                        <GooglePlacesAutocomplete
                            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                            selectProps={{
                                value: address,
                                onChange: handleAddressSelect,
                                placeholder: 'Start typing your address...',
                                styles: {
                                    input: (provided) => ({
                                        ...provided,
                                        backgroundColor: 'rgba(252, 211, 77, 0.7)',
                                        fontWeight: '600',
                                        color: '#374151',
                                        borderRadius: '9999px',
                                        padding: '0.75rem 1rem',
                                        border: '2px solid #4B5563',
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isFocused ? '#FEF3C7' : 'white',
                                        color: '#374151',
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: '#374151',
                                        fontWeight: '600',
                                    }),
                                },
                            }}
                        />
                    </div>
                    <div>
                        <label className="text-lg font-semibold text-gray-700 mb-2 block">Contact No.</label>
                        <input
                            type="tel" name="contactNo" value={formData.contactNo} onChange={handleChange}
                            placeholder="e.g. +880123456789" required
                            className="input bg-yellow-400/70 placeholder-gray-600 font-semibold rounded-full border-2 border-gray-600 w-full focus:border-green-800 focus:ring-green-800"
                        />
                    </div>
                    <div className="mt-auto">
                        <button type="submit" disabled={loading} className="btn rounded-full bg-[#0C3B25] hover:bg-[#176b43] text-white font-bold text-lg border-2 border-gray-600 w-full md:w-auto px-16 disabled:opacity-50">
                            {loading ? 'Submitting...' : 'Submit for Review'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DonateForm;