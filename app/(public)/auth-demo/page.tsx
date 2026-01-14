'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useToast } from '@/lib/useToast';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useForm } from 'react-hook-form';

interface LoginFormInputs {
  email: string;
  password: string;
}

interface RegisterFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  jobRole: string;
  licenseNumber: string;
  extension: string;
  instituteName: string;
  addressLine1: string;
  townCity: string;
  country: string;
  medicineSearch: string;
}

const AuthDemoPage = () => {
  const { user, isAuthenticated, isLoading, login, signup, logout } = useAuthStore();
  const { success, error } = useToast();
  const loginFormMethods = useForm<LoginFormInputs>();
  const registerFormMethods = useForm<RegisterFormInputs>();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const handleLogin = async (data: LoginFormInputs) => {
    try {
      await login(data.email, data.password);
      success('Login successful!');
      loginFormMethods.reset(); // Reset form after successful login
    } catch (err: any) {
      error(err.message || 'Login failed');
    }
  };

  const handleRegister = async (data: RegisterFormInputs) => {
    try {
      await signup({
        ...data,
        firstName: data.firstName || 'John',
        lastName: data.lastName || 'Doe',
        phone: data.phone || '1234567890',
        jobRole: data.jobRole || 'Doctor',
        licenseNumber: data.licenseNumber || 'N/A',
        extension: data.extension || '',
        instituteName: data.instituteName || 'Generic Institute',
        addressLine1: data.addressLine1 || 'N/A',
        townCity: data.townCity || 'N/A',
        country: data.country || 'N/A',
        medicineSearch: data.medicineSearch || 'N/A'
      });
      success('Registration successful!');
      registerFormMethods.reset(); // Reset form after successful registration
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
          <Button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex border-b mb-4">
            <Button
              varient={activeTab === 'login' ? 'primary' : 'secondary'}
              className={`py-2 px-4 font-medium ${
                activeTab === 'login'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </Button>
            <Button
              varient={activeTab === 'register' ? 'primary' : 'secondary'}
              className={`py-2 px-4 font-medium ${
                activeTab === 'register'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </Button>
          </div>

          {activeTab === 'login' ? (
            <form onSubmit={loginFormMethods.handleSubmit(handleLogin)}>
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                registration={loginFormMethods.register("email", { required: "Email is required" })}
                error={loginFormMethods.formState.errors.email}
              />
              <div className="mb-4"></div>
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                registration={loginFormMethods.register("password", { required: "Password is required" })}
                error={loginFormMethods.formState.errors.password}
              />
              <div className="mb-4"></div>
              <Button
                type="submit"
                disabled={isLoading}
                isLoading={isLoading}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          ) : (
            <form onSubmit={registerFormMethods.handleSubmit(handleRegister)}>
              <Input
                label="First Name"
                type="text"
                placeholder="Enter your first name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                registration={registerFormMethods.register("firstName", { required: "First name is required" })}
                error={registerFormMethods.formState.errors.firstName}
              />
              <div className="mb-4"></div>
              <Input
                label="Last Name"
                type="text"
                placeholder="Enter your last name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                registration={registerFormMethods.register("lastName", { required: "Last name is required" })}
                error={registerFormMethods.formState.errors.lastName}
              />
              <div className="mb-4"></div>
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                registration={registerFormMethods.register("email", { required: "Email is required" })}
                error={registerFormMethods.formState.errors.email}
              />
              <div className="mb-4"></div>
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                registration={registerFormMethods.register("password", { required: "Password is required" })}
                error={registerFormMethods.formState.errors.password}
              />
              <div className="mb-4"></div>
              <Button
                type="submit"
                disabled={isLoading}
                isLoading={isLoading}
                className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthDemoPage;