import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import WavyBackground from '../../Components/WavyBackground/WavyBackground';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset link sent! Please check your email inbox (and spam folder).");
        } catch (err) {
            console.error("Error sending password reset email:", err);
            toast.error("Could not send reset link. Please check the email address.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex-1 flex flex-col items-center justify-center bg-[#FEFDF9] relative overflow-hidden p-4">
            <WavyBackground />
            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Reset Your Password</h2>
                <p className="text-gray-600 mb-8">Enter your email address and we'll send you a link to reset your password.</p>
                
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Your Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input bg-yellow-400/80 placeholder-gray-800 font-semibold rounded-full border-2 border-gray-600 focus:border-green-800 focus:ring-green-800"
                    />
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="btn rounded-full bg-[#0C3B25] hover:bg-[#176b43] text-white font-bold text-lg border-2 border-gray-600 disabled:opacity-50"
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                <div className="mt-4">
                    <Link to="/login" className="font-bold text-green-800 hover:underline">
                        Back to Log In
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default ForgotPassword;