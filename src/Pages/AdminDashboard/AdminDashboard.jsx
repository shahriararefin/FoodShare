import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import WavyBackground from '../../Components/WavyBackground/WavyBackground';
import { toast } from 'react-toastify';
import { DONATION_STATUS, ROLES } from '../../constants/roles';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
    // State for donations
    const [pendingDonations, setPendingDonations] = useState([]);
    const [donationsLoading, setDonationsLoading] = useState(true);
    const [donationsError, setDonationsError] = useState('');
    const [updatingDonationId, setUpdatingDonationId] = useState(null);

    // State for users
    const [users, setUsers] = useState([]);
    const [usersLoading, setUsersLoading] = useState(true);
    const [usersError, setUsersError] = useState('');
    const [updatingUserId, setUpdatingUserId] = useState(null);
    const [newRoles, setNewRoles] = useState({});

    const { currentUser } = useAuth();

    // Effect for fetching pending donations (real-time)
    useEffect(() => {
        if (!currentUser) { setDonationsLoading(false); return; }
        const q = query(collection(db, "donations"), where("status", "==", DONATION_STATUS.PENDING), orderBy("createdAt", "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setPendingDonations(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setDonationsLoading(false);
        }, (err) => {
            console.error("Error fetching pending donations:", err);
            setDonationsError("Failed to load pending donations.");
            setDonationsLoading(false);
        });
        return () => unsubscribe();
    }, [currentUser]);

    // Effect for fetching all users (once on load)
    useEffect(() => {
        if (!currentUser) { setUsersLoading(false); return; }
        const fetchUsers = async () => {
            try {
                const usersQuery = query(collection(db, "users"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(usersQuery);
                setUsers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (err) {
                console.error("Error fetching users:", err);
                setUsersError("Failed to load users.");
            } finally {
                setUsersLoading(false);
            }
        };
        fetchUsers();
    }, [currentUser]);

    // --- Restored Donation Update Logic ---
    const updateDonationStatus = async (donationId, newStatus) => {
        setUpdatingDonationId(donationId);
        const donationRef = doc(db, 'donations', donationId);
        try {
            await updateDoc(donationRef, { status: newStatus });
            toast.success(`Donation has been ${newStatus}!`);
        } catch (err) {
            console.error(`Error updating donation to ${newStatus}:`, err);
            toast.error(`Failed to update donation. Please try again.`);
        } finally {
            setUpdatingDonationId(null);
        }
    };

    const handleRoleUpdate = async (userId) => {
        const newRole = newRoles[userId];
        if (!newRole) { return toast.warn("Please select a new role first."); }
        setUpdatingUserId(userId);
        const userDocRef = doc(db, 'users', userId);
        try {
            await updateDoc(userDocRef, { role: newRole });
            toast.success("User role updated successfully!");
            const updatedUsers = users.map(user => user.id === userId ? { ...user, role: newRole } : user);
            setUsers(updatedUsers);
        } catch (err) {
            console.error("Error updating user role:", err);
            toast.error("Failed to update user role.");
        } finally {
            setUpdatingUserId(null);
        }
    };

    const handleRoleChange = (userId, role) => {
        setNewRoles(prev => ({ ...prev, [userId]: role }));
    };

    // --- Restored Donation Rendering Logic ---
    const renderDonationsContent = () => {
        if (donationsLoading) return <p className="text-center font-semibold">Loading donations...</p>;
        if (donationsError) return <p className="text-center text-red-500">{donationsError}</p>;
        if (pendingDonations.length === 0) return <p className="text-center text-gray-500">No pending donations to review.</p>;
        
        return pendingDonations.map(donation => {
            const isUpdating = updatingDonationId === donation.id;
            return (
                <div key={donation.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                        <p className="font-bold">{donation.foodType} (Serves: {donation.quantity})</p>
                        <p className="text-sm text-gray-600">{donation.address} - By: {donation.donorName}</p>
                    </div>
                    <div className="flex gap-2 self-end sm:self-center">
                        <button onClick={() => updateDonationStatus(donation.id, DONATION_STATUS.APPROVED)} disabled={isUpdating} className="btn btn-sm btn-success text-white w-24">{isUpdating ? '...' : 'Approve'}</button>
                        <button onClick={() => updateDonationStatus(donation.id, DONATION_STATUS.REJECTED)} disabled={isUpdating} className="btn btn-sm btn-error text-white w-24">{isUpdating ? '...' : 'Reject'}</button>
                    </div>
                </div>
            );
        });
    };

    return (
        <main className="flex-1 flex flex-col items-center bg-[#FEFDF9] relative overflow-hidden p-4">
            <WavyBackground />
            <div className="relative z-10 w-full max-w-5xl mx-auto pt-8 space-y-12">
                <h1 className="text-3xl font-bold text-center text-[#1E3A2F] mb-8">Admin Dashboard</h1>

                {/* --- PENDING DONATIONS SECTION --- */}
                <section className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Pending Donations for Approval</h2>
                    <div className="space-y-4">{renderDonationsContent()}</div>
                </section>

                {/* --- USER MANAGEMENT SECTION --- */}
                <section className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">User Management</h2>
                    <div className="space-y-4">
                        {usersLoading && <p className="text-center font-semibold">Loading users...</p>}
                        {usersError && <p className="text-center text-red-500">{usersError}</p>}
                        {!usersLoading && !usersError && users.map(user => {
                            const isUpdating = updatingUserId === user.id;
                            return (
                                <div key={user.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                    <div>
                                        <p className="font-bold text-lg">{user.name}</p>
                                        <p className="text-sm text-gray-600">{user.email}</p>
                                        <p className="text-xs text-gray-500">Current Role: <span className="font-bold uppercase">{user.role}</span></p>
                                    </div>
                                    <div className="flex gap-2 self-end sm:self-center items-center">
                                        <select
                                            className="select select-bordered select-sm bg-yellow-400/80 border-gray-600 text-gray-800 font-semibold"
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            defaultValue={user.role}
                                            disabled={isUpdating}
                                        >
                                            <option value={ROLES.DONOR}>Donor</option>
                                            <option value={ROLES.NGO}>NGO</option>
                                            <option value={ROLES.ADMIN}>Admin</option>
                                        </select>
                                        <button
                                            onClick={() => handleRoleUpdate(user.id)}
                                            disabled={isUpdating}
                                            className="btn btn-sm bg-[#0C3B25] hover:bg-[#176b43] text-white border-none w-28"
                                        >
                                            {isUpdating ? '...' : 'Update'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default AdminDashboard;