import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  return (
    <section className="flex-1 flex flex-col items-center justify-center z-10 p-4">
      <form className="bg-transparent p-8 flex flex-col gap-5 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          className="input bg-yellow-400/80 placeholder-gray-800 font-semibold rounded-full border-2 border-gray-600 focus:border-green-800 focus:ring-green-800"
        />
        <input
          type="password"
          placeholder="Password"
          className="input bg-yellow-400/80 placeholder-gray-800 font-semibold rounded-full border-2 border-gray-600 focus:border-green-800 focus:ring-green-800"
        />
        <button type="submit" className="btn rounded-full bg-[#0C3B25] hover:bg-[#176b43] text-white font-bold text-lg border-2 border-gray-600 mt-2">
          Log In
        </button>
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
