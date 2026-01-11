import { api } from './api';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ForgotPasswordRequest, ResetPasswordRequest, ChangePasswordRequest, UserProfile, VerifyEmailResponse, VerifyEmailRequest } from '@/types/auth';

// Auth API functions
export const authAPI = {
  // Login
  login: (data: LoginRequest) =>
    api<LoginResponse>('/auth/signin', {
      method: 'POST',
      data,
    }),

  // Register
  register: (data: RegisterRequest) =>
    api<RegisterResponse>('/auth/signup', {
      method: 'POST',
      data,
    }),

  // Logout
  logout: () =>
    api('/auth/logout', {
      method: 'POST',
    }),

  // Forgot Password
  forgotPassword: (data: ForgotPasswordRequest) =>
    api('/auth/forgot-password', {
      method: 'POST',
      data,
    }),

  // Reset Password
  resetPassword: (data: ResetPasswordRequest) =>
    api('/auth/reset-password', {
      method: 'POST',
      data,
    }),

  // Change Password
  changePassword: (data: ChangePasswordRequest) =>
    api('/auth/change-password', {
      method: 'POST',
      data,
    }),

  // Refresh Token
  refreshToken: () =>
    api<LoginResponse>('/auth/refresh', {
      method: 'POST',
    }),

  // Get User Profile
  getProfile: () =>
    api<UserProfile>('/auth/profile', {
      method: 'GET',
    }),

  // Update User Profile
  updateProfile: (data: Partial<UserProfile>) =>
    api<UserProfile>('/auth/profile', {
      method: 'PUT',
      data,
    }),

  // Verify Email
  verifyEmail: (data: VerifyEmailRequest) =>
    api<VerifyEmailResponse>('/auth/activate-account', {
      method: 'POST',
      data,
    }),
};