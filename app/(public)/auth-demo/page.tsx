'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useToast } from '@/lib/useToast';

const AuthDemoPage = () => {
  const { user, isAuthenticated, isLoading, login, signup, logout } = useAuthStore();
  const { success, error } = useToast();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    jobRole: '',
    licenseNumber: '',
    extension: '',
    instituteName: '',
    addressLine1: '',
    townCity: '',
    country: '',
    medicineSearch: ''
  });
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginForm.email, loginForm.password);
      success('Login successful!');
    } catch (err: any) {
      error(err.message || 'Login failed');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup({
        ...registerForm,
        firstName: registerForm.firstName || 'John',
        lastName: registerForm.lastName || 'Doe',
        phone: registerForm.phone || '1234567890',
        jobRole: registerForm.jobRole || 'Doctor',
        licenseNumber: registerForm.licenseNumber || 'N/A',
        extension: registerForm.extension || '',
        instituteName: registerForm.instituteName || 'Generic Institute',
        addressLine1: registerForm.addressLine1 || 'N/A',
        townCity: registerForm.townCity || 'N/A',
        country: registerForm.country || 'N/A',
        medicineSearch: registerForm.medicineSearch || 'N/A'
      });
      success('Registration successful!');
      setActiveTab('login'); // Switch to login tab after successful registration
    } catch (err: any) {
      error(err.message || 'Registration failed');
    }
  };

  const handleLogout = () => {
    logout();
    success('Logged out successfully');
  };

  if (isAuthenticated && user) {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Welcome, {user.name}!</h2>
          <p className="mb-4">You are successfully logged in.</p>
          <p className="mb-4 text-sm text-gray-600">Email: {user.email}</p>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex border-b mb-4">
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'login'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'register'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>

          {activeTab === 'login' ? (
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={registerForm.firstName}
                  onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={registerForm.lastName}
                  onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reg-email">
                  Email
                </label>
                <input
                  type="email"
                  id="reg-email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reg-password">
                  Password
                </label>
                <input
                  type="password"
                  id="reg-password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthDemoPage;