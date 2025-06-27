import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Import the auth instance from your config file

const LoginForm = () => {
  // We use 'useState' to manage the user's input for email and password.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // This state will hold any error message if the login fails.
  const [error, setError] = useState('');

  // This hook from react-router-dom allows us to redirect the user.
  const navigate = useNavigate();

  // This function runs when the user submits the form.
  const handleSubmit = async (e) => {
    e.preventDefault(); // This stops the page from reloading.
    setError(''); // Clear any previous errors.

    try {
      // This is the core Firebase function for signing in.
      // It takes the auth service, email, and password and checks them against Firebase's records.
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // If the above line is successful, the user is logged in.
      console.log('User logged in successfully:', userCredential.user);

      alert('Login successful! Welcome back.');
      // After a successful login, we navigate the user to the home page.
      navigate('/'); 
    } catch (err) {
      // If signInWithEmailAndPassword fails (e.g., wrong password), it throws an error.
      console.error("Error logging in:", err.message);
      // We set a user-friendly error message to be displayed in the form.
      setError("Failed to log in. Please check your email and password.");
      alert("Failed to log in. Please check your email and password.");
    }
  };

  return (
    <section className="flex-1 flex flex-col items-center justify-center z-10 p-4">
      {/* The 'onSubmit' prop calls our handleSubmit function when the form is submitted. */}
      <form onSubmit={handleSubmit} className="bg-transparent p-8 flex flex-col gap-5 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          value={email}
          // The 'onChange' event updates the 'email' state with every keystroke.
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input bg-yellow-400/80 placeholder-gray-800 font-semibold rounded-full border-2 border-gray-600 focus:border-green-800 focus:ring-green-800"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          // The 'onChange' event updates the 'password' state.
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input bg-yellow-400/80 placeholder-gray-800 font-semibold rounded-full border-2 border-gray-600 focus:border-green-800 focus:ring-green-800"
        />
        <button type="submit" className="btn rounded-full bg-[#0C3B25] hover:bg-[#176b43] text-white font-bold text-lg border-2 border-gray-600 mt-2">
          Log In
        </button>
        {/* This line conditionally renders the error message only if an error exists. */}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <div className="text-center mt-2">
            <a href="#" className="text-sm font-semibold text-gray-800 hover:underline">Forgot Password?</a>
        </div>
        <div className="text-sm text-center text-gray-800">
          Don’t have an account?
          <Link to="/signup" className="font-bold text-green-800 ml-1 hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
