import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Corrected: All auth functions are now in one import line
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

// Corrected: All firestore functions in one line
import { doc, setDoc } from 'firebase/firestore';

// Corrected: Only one import for your config
import { auth, db } from '../../firebaseConfig';


const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Send the verification email
        await sendEmailVerification(user);
        toast.info("A verification link has been sent to your email.");

        // Save the user's details to Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            contact: contact,
            role: 'donor',
            createdAt: new Date()
        });
        
        navigate('/login'); // Redirect to login page to let them log in after verifying
    } catch (err) {
      console.error("Error signing up:", err.code, err.message);
      // Provide more specific error feedback
      if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already in use.');
        alert('This email address is already in use.');
      } else {
        setError(err.message);
        alert(`Error: ${err.message}`);
      }
    }
  };

  return (
    <section className="flex-1 flex flex-col items-center justify-center z-10 p-4 w-full">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 italic mb-8 text-center">
        share surplus, fight hunger, and make a difference
      </h2>
      <form onSubmit={handleSubmit} className="bg-transparent p-8 flex flex-col gap-5 w-full max-w-sm">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input bg-yellow-400/80 placeholder-gray-800 font-semibold rounded-full border-2 border-gray-600 focus:border-green-800 focus:ring-green-800"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input bg-yellow-400/80 placeholder-gray-800 font-semibold rounded-full border-2 border-gray-600 focus:border-green-800 focus:ring-green-800"
        />
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          className="input bg-yellow-400/80 placeholder-gray-800 font-semibold rounded-full border-2 border-gray-600 focus:border-green-800 focus:ring-green-800"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
          className="input bg-yellow-400/80 placeholder-gray-800 font-semibold rounded-full border-2 border-gray-600 focus:border-green-800 focus:ring-green-800"
        />
        <button type="submit" className="btn rounded-full bg-[#0C3B25] hover:bg-[#176b43] text-white font-bold text-lg border-2 border-gray-600 mt-2">
          Sign Up
        </button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <div className="text-sm text-center text-gray-800 mt-2">
          Already have an account?
          <Link to="/login" className="font-bold text-green-800 ml-1 hover:underline">
            Log In
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignupForm;
