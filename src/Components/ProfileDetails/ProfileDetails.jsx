import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
// Import updateDoc from firestore to update documents
import { doc, getDoc, updateDoc } from 'firebase/firestore';    
import { db } from '../../firebaseConfig';            

const ProfileDetails = () => {
  const { currentUser } = useAuth();
  
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    contact: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false); // Add a new loading state for the update process
  const [error, setError] = useState('');

  // This useEffect hook fetches the initial profile data. It runs when the component mounts
  // or when the currentUser changes.
  useEffect(() => {
    if (currentUser) {
      const fetchUserProfile = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, 'users', currentUser.uid);
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
    }
  }, [currentUser]);

  // This function handles changes in the input fields and updates the local state.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // This function handles the form submission to update the user's profile in Firestore.
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true); // Disable the button while the update is in progress
    setError('');

    // Create a reference to the specific user document in the 'users' collection.
    const docRef = doc(db, 'users', currentUser.uid);
    try {
      // Use the updateDoc function to save the new name and contact info.
      // We don't update the email as it's linked to their authentication.
      await updateDoc(docRef, {
        name: userProfile.name,
        contact: userProfile.contact,
      });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error("Error updating profile:", err);
      setError('Failed to update profile.');
      alert('Failed to update profile.');
    } finally {
      setUpdating(false); // Re-enable the button
    }
  };

  // Display a loading message while fetching data.
  if (loading) {
    return <p className="text-center font-semibold">Loading profile...</p>;
  }

  // Display an error message if fetching failed.
  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="w-full max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
      <h3 className="text-2xl font-bold text-center text-[#1E3A2F] mb-6">Your Details</h3>
      {/* The form now calls handleUpdate when submitted. */}
      <form onSubmit={handleUpdate} className="flex flex-col gap-5">
        <div>
          <label className="text-md font-semibold text-gray-700 mb-1 block">Name</label>
          <input
            type="text"
            name="name" // The 'name' attribute must match the state property.
            className="input input-bordered input-warning w-full bg-yellow-300 placeholder:text-gray-600 font-medium"
            value={userProfile.name}
            onChange={handleChange} // Call handleChange when the user types.
          />
        </div>
        <div>
          <label className="text-md font-semibold text-gray-700 mb-1 block">Email</label>
          <input
            type="email"
            readOnly // Email should not be changeable.
            className="input input-bordered w-full bg-gray-200 placeholder:text-gray-600 font-medium cursor-not-allowed"
            value={userProfile.email}
          />
        </div>
        <div>
          <label className="text-md font-semibold text-gray-700 mb-1 block">Contact</label>
          <input
            type="text"
            name="contact" // The 'name' attribute must match the state property.
            className="input input-bordered input-warning w-full bg-yellow-300 placeholder:text-gray-600 font-medium"
            value={userProfile.contact}
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
