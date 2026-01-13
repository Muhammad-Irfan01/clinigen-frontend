import { authApi } from './apiService';
import { AccessProgram, Patient, CreatePatientRequest } from '@/types/accessProgram';

// Access Program API functions
export const accessProgramAPI = {
  // Access Program endpoints
  getAllAccessPrograms: () =>
    authApi<AccessProgram[]>('/access-program', {
      method: 'GET',
    }),

  getAccessProgramById: (id: number) =>
    authApi<AccessProgram>(`/access-program/${id}`, {
      method: 'GET',
    }),

  getPatientsForProgram: (id: number) =>
    authApi<Patient[]>(`/access-program/${id}/patients`, {
      method: 'GET',
    }),

  // Patient endpoints
  getAllPatients: () =>
    authApi<Patient[]>('/access-program/patients/all', {
      method: 'GET',
    }),

  getPatientById: (id: number) =>
    authApi<Patient>(`/access-program/patients/${id}`, {
      method: 'GET',
    }),

  createPatient: (data: CreatePatientRequest) =>
    authApi<Patient>('/access-program/patients', {
      method: 'POST',
      data,
    }),

  updatePatient: (id: number, data: Partial<CreatePatientRequest>) =>
    authApi<Patient>(`/access-program/patients/${id}`, {
      method: 'PATCH',
      data,
    }),

  deletePatient: (id: number) =>
    authApi<void>(`/access-program/patients/${id}`, {
      method: 'DELETE',
    }),
};