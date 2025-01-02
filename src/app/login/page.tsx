"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Login() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    // Clear error
    setError("");

    // Send login data to the server or handle it
    console.log({ email, password });
    // You can integrate an API here

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        // Store user data or handle successful login
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
        router.push('/dashboard'); // Redirect to dashboard
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (error) {
      setError('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-500 to-pink-500 p-6">
      <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text">
          Welcome Back!
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Link to Signup */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-purple-600 hover:text-pink-500 font-medium hover:underline"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
