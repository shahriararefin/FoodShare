// src/Pages/Login/Login.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import WavyBackground from '../../Components/WavyBackground/WavyBackground';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      navigate('/');
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
      console.error("Error logging in:", err);
    }
  };

  // --- NEW: Function to handle Google Sign-In ---
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user already exists in our Firestore 'users' collection
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      // If the user document doesn't exist, create it
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          role: 'donor', // Assign a default role
          createdAt: new Date()
        });
        toast.success("Welcome! Your profile has been created.");
      } else {
        toast.success("Welcome back!");
      }

      navigate('/'); // Redirect after successful login/signup

    } catch (error) {
      setError("Failed to sign in with Google. Please try again.");
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center bg-[#FEFDF9] relative overflow-hidden p-4">
      <WavyBackground />
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center w-full max-w-screen-md mx-auto">
        <section className="flex-1 flex flex-col items-center justify-center z-10 p-4 w-full">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 italic mb-8 text-center">
            share surplus, fight hunger and make a difference
          </h2>
          <form onSubmit={handleSubmit} className="bg-transparent p-8 flex flex-col gap-5 w-full max-w-sm">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input bg-yellow-400/80 placeholder-gray-800 font-semibold rounded-full border-2 border-gray-600 focus:border-green-800 focus:ring-green-800"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input bg-yellow-400/80 placeholder-gray-800 font-semibold rounded-full border-2 border-gray-600 focus:border-green-800 focus:ring-green-800"
            />
            <div className="text-right -mt-3 mb-3">
              <Link to="/forgot-password" className="text-sm text-green-800 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <button type="submit" className="btn rounded-full bg-[#0C3B25] hover:bg-[#176b43] text-white font-bold text-lg border-2 border-gray-600 mt-2">
              Log In
            </button>

            {/* --- NEW: Google Sign-In Button --- */}
            <div className="divider text-gray-600">OR</div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn rounded-full bg-white hover:bg-gray-100 text-gray-800 font-bold text-lg border-2 border-gray-400"
            >
              <img src="/google-logo.svg" alt="Google logo" className="w-6 h-6 mr-2" />
              Sign In with Google
            </button>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <div className="text-sm text-center text-gray-800 mt-2">
              Don't have an account?
              <Link to="/signup" className="font-bold text-green-800 ml-1 hover:underline">
                Sign Up
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Login;