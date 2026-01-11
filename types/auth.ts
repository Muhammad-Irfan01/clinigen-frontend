// Auth request and response types

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RegisterRequest {
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

export interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  code: string;
  password: string;
}

export interface VerifyEmailRequest {
  code: string;
}

export interface VerifyEmailResponse {
  message: string;
  access_token?: string;
  refresh_token?: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  // Add other profile fields as needed
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  // Add other user fields as needed
}