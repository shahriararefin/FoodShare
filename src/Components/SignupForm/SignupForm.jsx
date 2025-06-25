import React from 'react';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  return (
    <section className="flex-1 flex flex-col items-center justify-center z-10 p-4 w-full">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 italic mb-8 text-center">
        share surplus, fight hunger, and make a difference
      </h2>
      <form className="bg-transparent p-8 flex flex-col gap-5 w-full max-w-sm">
        <input
          type="text"
          placeholder="Name"
          className="input bg-yellow-400/80 placeholder-gray-800 font-semibold rounded-full border-2 border-gray-600 focus:border-green-800 focus:ring-green-800"
        />
        <input
          type="email"
          placeholder="Email"
          className="input bg-yellow-400/80 placeholder-gray-800 font-semibold rounded-full border-2 border-gray-600 focus:border-green-800 focus:ring-green-800"
        />
        <input
          type="text"
          placeholder="Contact"
          className="input bg-yellow-400/80 placeholder-gray-800 font-semibold rounded-full border-2 border-gray-600 focus:border-green-800 focus:ring-green-800"
        />
        <input
          type="password"
          placeholder="Password"
          className="input bg-yellow-400/80 placeholder-gray-800 font-semibold rounded-full border-2 border-gray-600 focus:border-green-800 focus:ring-green-800"
        />
        <button type="submit" className="btn rounded-full bg-[#0C3B25] hover:bg-[#176b43] text-white font-bold text-lg border-2 border-gray-600 mt-2">
          Sign Up
        </button>
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
