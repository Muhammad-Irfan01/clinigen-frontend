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

export interface VerifyResetEmailRequest {
  email: string;
  code: string;
}

export interface VerifyResetEmailResponse {
  message: string;
  email: string;
  userId: number;
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
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  created_at?: string;
  updated_at?: string;
  user_profiles?: {
    id: number;
    user_id: number;
    job_role: string | null;
    license_number: string | null;
    extension: string | null;
    institute_name: string | null;
    address_line_1: string | null;
    town_city: string | null;
    country: string | null;
    created_at: string;
    updated_at: string;
  };
  roles?: Array<{
    id: number;
    name: string;
    permissions: string | null;
  }>;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  created_at?: string;
  updated_at?: string;
  user_profiles?: {
    id: number;
    user_id: number;
    job_role: string | null;
    license_number: string | null;
    extension: string | null;
    institute_name: string | null;
    address_line_1: string | null;
    town_city: string | null;
    country: string | null;
    created_at: string;
    updated_at: string;
  };
}