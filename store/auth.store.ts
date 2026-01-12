import { authAPI } from '@/lib/authAPI';
import { cookie } from '@/lib/cookies';
import useToast from '@/lib/useToast';
import { useRouter } from 'next/navigation';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
    id: string;
    email: string;
    name: string;
    // Add other user fields as needed
}

interface signupUser {
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

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Auth methods
    login: (email: string, password: string) => Promise<void>;
    signup: (data: signupUser) => Promise<void>;
    logout: () => void;
    refreshToken: () => Promise<void>;
    fetchProfile: () => Promise<void>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    verifyEmail: (code: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({

    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        const toast = useToast();

        try {
            // Backend sets cookies, no token handling needed
            const res = await authAPI.login({ email, password });

            // Fetch user profile after login
            // const user = await authAPI.getProfile();

            set({ user: res.user, isAuthenticated: true, isLoading: false });
            toast.success('Login successful!');
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            toast.error(error.message || 'Login failed');
            throw error;
        }
    },

    signup: async (data) => {
        set({ isLoading: true, error: null });
        const toast = useToast();

        try {
            const res = await authAPI.register(data);

            set({
                user: null,
                isAuthenticated: false,
                isLoading: false
            });

            toast.success('Registration successful! Please check your email to activate your account.');
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            toast.error(error.message || 'Registration failed');
            throw error;
        }
    },

    logout: async () => {
        const toast = useToast();

        try {
            await authAPI.logout(); // Backend clears cookies
            set({ user: null, isAuthenticated: false, error: null });
            toast.info('Logged out successfully');
        } catch (error: any) {
            toast.error(error.message || 'Logout failed');
            throw error;
        }
    },

    refreshToken: async () => {
        try {
            const response = await authAPI.refreshToken();

            // Update tokens in cookies
            cookie.set('accessToken', response.accessToken);
            cookie.set('refreshToken', response.refreshToken);

            set({
                user: response.user,
                isAuthenticated: true
            });
        } catch (error) {
            // If refresh fails, logout the user
            get().logout();
            throw error;
        }
    },

    fetchProfile: async () => {
        try {
            const user = await authAPI.getProfile();
            set({ user, isAuthenticated: true });
        } catch (error) {
            set({ user: null, isAuthenticated: false });
        }
    },


    changePassword: async (currentPassword: string, newPassword: string) => {
        const toast = useToast();

        try {
            await authAPI.changePassword({ currentPassword, newPassword });
            toast.success('Password changed successfully!');
        } catch (error: any) {
            toast.error(error.message || 'Failed to change password');
            throw error;
        }
    },

    forgotPassword: async (email: string) => {
        const toast = useToast();

        try {
            await authAPI.forgotPassword({ email });
            toast.success('Password reset link sent to your email');
        } catch (error: any) {
            toast.error(error.message || 'Failed to send reset link');
            throw error;
        }
    },

    resetPassword: async (code: string, newPassword: string) => {
        const toast = useToast();

        try {
            // The backend expects a code (from email) and new password
            await authAPI.resetPassword({ code, password: newPassword });
            toast.success('Password reset successful. You can now login with your new password.');
        } catch (error: any) {
            toast.error(error.message || 'Failed to reset password');
            throw error;
        }
    },

    verifyEmail: async (code: string) => {
        set({ isLoading: true, error: null });
        const toast = useToast();

        try {
            const response = await authAPI.verifyEmail({ code });

            if (response.user) {
                // Redirect to sign in page after successful verification
                window.location.href = "/signin";
            }
            toast.success('Email verified successfully!');
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            toast.error(error.message || 'Failed to verify email');
            throw error;
        }
    },
}))

