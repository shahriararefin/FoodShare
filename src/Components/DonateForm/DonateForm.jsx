import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { toast } from 'react-toastify';
import { DONATION_STATUS } from '../../constants/roles';

const DonateForm = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        donorName: '',
        foodType: '',
        quantity: '',
        address: '',
        contactNo: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!currentUser) {
            toast.error('You must be logged in to make a donation.');
            return;
        }

        const { donorName, foodType, quantity, address, contactNo } = formData;
        if (!donorName.trim() || !foodType.trim() || !address.trim() || !contactNo.trim() || !quantity) {
             setError('All fields are required. Please fill out the entire form.');
             toast.error('All fields are required.');
             return;
        }
        if (Number(quantity) <= 0) {
            setError("Quantity must be a positive number.");
            toast.error("Quantity must be a positive number.");
            return;
        }
        
        setLoading(true);
        
        try {
            await addDoc(collection(db, 'donations'), {
                ...formData,
                quantity: Number(formData.quantity),
                donorId: currentUser.uid,
                donorEmail: currentUser.email,
                status: DONATION_STATUS.PENDING,
                createdAt: serverTimestamp(),
            });

            toast.success('Donation submitted for review! Thank you.');
            navigate('/profile');

        } catch (err) {
            console.error("Error submitting donation:", err);
            setError('Failed to submit donation. Please try again.');
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
                        <label className="text-lg font-semibold text-gray-700 mb-2 block">Address/Location</label>
                        <input
                            type="text" name="address" value={formData.address} onChange={handleChange}
                            placeholder="e.g. 123 Food St, Anytown" required
                            className="input bg-yellow-400/70 placeholder-gray-600 font-semibold rounded-full border-2 border-gray-600 w-full focus:border-green-800 focus:ring-green-800"
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
                         <button type="submit" disabled={loading} className="btn rounded-full bg-[#0C3B25] hover:bg-[#176b43] text-white font-bold text-lg border-2 border-gray-600 w-full disabled:opacity-50">
                          {loading ? 'Submitting...' : 'Submit for Review'}
                        </button>
                    </div>
                </div>
            </form>

            {error && <p className="text-red-600 font-bold text-center mt-4 bg-red-100 border border-red-600 rounded-md p-2">{error}</p>}
        </div>
    );
};

export default DonateForm;