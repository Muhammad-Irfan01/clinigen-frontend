import { authAPI } from '@/lib/authAPI';
import { cookie } from '@/lib/cookies';
import useToast from '@/lib/useToast';
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

    login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        const toast = useToast();

        try {
            const response = await authAPI.login({ email, password });

            // Store tokens in cookies - handle both naming conventions
            const accessToken = response.accessToken || response.access_token;
            const refreshToken = response.refreshToken || response.refresh_token;

            if (!accessToken) {
                throw new Error('Access token not received from server');
            }

            if (!refreshToken) {
                throw new Error('Refresh token not received from server');
            }

            // Store tokens in cookies
            cookie.set('accessToken', accessToken);
            cookie.set('refreshToken', refreshToken);

            set({
                user: response.user,
                isAuthenticated: true,
                isLoading: false
            });

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
            const signupData = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                phone: data.phone,
                jobRole: data.jobRole,
                licenseNumber: data.licenseNumber,
                extension: data.extension,
                instituteName: data.instituteName,
                addressLine1: data.addressLine1,
                townCity: data.townCity,
                country: data.country,
                medicineSearch: data.medicineSearch
            };

            const response = await authAPI.register(signupData);

            // Store tokens in cookies
            cookie.set('accessToken', response.accessToken);
            cookie.set('refreshToken', response.refreshToken);

            set({
                user: response.user,
                isAuthenticated: true,
                isLoading: false
            });

            toast.success('Registration successful!');
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            toast.error(error.message || 'Registration failed');
            throw error;
        } finally {
            set({isLoading: false})
        }
    },

    logout: () => {
        // Remove tokens from cookies
        cookie.remove('accessToken');
        cookie.remove('refreshToken');

        set({
            user: null,
            isAuthenticated: false,
            error: null
        });

        const toast = useToast();
        toast.info('Logged out successfully');
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
            const response = await authAPI.getProfile();
            set({
                user: response,
                isAuthenticated: true
            });
        } catch (error: any) {
            // If profile fetch fails, try to refresh token
            try {
                await get().refreshToken();
                const response = await authAPI.getProfile();
                set({
                    user: response,
                    isAuthenticated: true
                });
            } catch (refreshError) {
                // If refresh also fails, logout
                get().logout();
            }
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

            // Store tokens in cookies if they are returned
            if (response.access_token && response.refresh_token) {
                cookie.set('accessToken', response.access_token);
                cookie.set('refreshToken', response.refresh_token);

                // Transform the response user to match the User interface
                const transformedUser = response.user ? {
                    ...response.user,
                    name: `${response.user.firstName} ${response.user.lastName}`
                } : null;

                set({
                    user: transformedUser,
                    isAuthenticated: true,
                    isLoading: false
                });
            } else {
                set({
                    isLoading: false
                });
            }

            toast.success('Email verified successfully!');
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            toast.error(error.message || 'Failed to verify email');
            throw error;
        }
    },
}))

