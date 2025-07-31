import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { toast } from 'react-toastify';

const ProfileDetails = () => {
    const { currentUser } = useAuth();
    
    // State for the user's data, loading, and errors
    const [userProfile, setUserProfile] = useState({ name: '', email: '', contact: '' });
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');

    // Effect to fetch the user's profile data when the component loads
    useEffect(() => {
        if (currentUser) {
            const fetchUserProfile = async () => {
                const docRef = doc(db, 'users', currentUser.uid);
                try {
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserProfile(docSnap.data());
                    } else {
                        setError("Could not find user profile data.");
                    }
                } catch (err) {
                    setError("Failed to fetch user profile.");
                } finally {
                    setLoading(false);
                }
            };
            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, [currentUser]);

    // Function to handle changes in the input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserProfile(prevProfile => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    // Function to save the updated details to Firestore
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!currentUser) return;

        setUpdating(true);
        const docRef = doc(db, 'users', currentUser.uid);
        try {
            await updateDoc(docRef, {
                name: userProfile.name,
                contact: userProfile.contact,
            });
            toast.success('Profile updated successfully!');
        } catch (err) {
            toast.error('Failed to update profile.');
        } finally {
            setUpdating(false);
        }
    };

    // Render loading state
    if (loading) {
        return <p className="text-center font-semibold">Loading profile...</p>;
    }

    // Render error state
    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    // Render the final form
    return (
        <div className="w-full max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-center text-[#1E3A2F] mb-6">Your Details</h3>
            <form onSubmit={handleUpdate} className="flex flex-col gap-5">
                <div>
                    <label className="text-md font-semibold text-gray-700 mb-1 block">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="p-2 border rounded w-full bg-gray-50"
                        value={userProfile.name || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="text-md font-semibold text-gray-700 mb-1 block">Email</label>
                    <input
                        type="email"
                        readOnly
                        className="p-2 border rounded w-full bg-gray-200 cursor-not-allowed"
                        value={userProfile.email || ''}
                    />
                </div>
                <div>
                    <label className="text-md font-semibold text-gray-700 mb-1 block">Contact</label>
                    <input
                        type="text"
                        name="contact"
                        className="p-2 border rounded w-full bg-gray-50"
                        value={userProfile.contact || ''}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={updating} className="btn rounded-full bg-[#0C3B25] hover:bg-[#176b43] text-white font-bold text-lg border-2 border-gray-600 mt-4 disabled:opacity-50">
                    {updating ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default ProfileDetails;