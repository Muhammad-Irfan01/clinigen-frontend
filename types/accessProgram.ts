// Access Program and Patient types

export interface AccessProgram {
  id: number;
  name: string;
  company: string;
  status: string;
  description: string;
  estimatedDelivery: string;
  slug: string;
  price: string;
  createdAt: string;
  updatedAt: string;
}

export interface Patient {
  id: number;
  patientId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  programId?: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientRequest {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  patientId?: string;
  programId: number;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}