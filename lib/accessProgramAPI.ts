import { api } from './api';
import { AccessProgram, Patient, CreatePatientRequest } from '@/types/accessProgram';

// Access Program API functions
export const accessProgramAPI = {
  // Access Program endpoints
  getAllAccessPrograms: () =>
    api<AccessProgram[]>('/access-program', {
      method: 'GET',
    }),

  getAccessProgramById: (id: number) =>
    api<AccessProgram>(`/access-program/${id}`, {
      method: 'GET',
    }),

  getPatientsForProgram: (id: number) =>
    api<Patient[]>(`/access-program/${id}/patients`, {
      method: 'GET',
    }),

  // Patient endpoints
  getAllPatients: () =>
    api<Patient[]>('/access-program/patients/all', {
      method: 'GET',
    }),

  getPatientById: (id: number) =>
    api<Patient>(`/access-program/patients/${id}`, {
      method: 'GET',
    }),

  createPatient: (data: CreatePatientRequest) =>
    api<Patient>('/access-program/patients', {
      method: 'POST',
      data,
    }),

  updatePatient: (id: number, data: Partial<CreatePatientRequest>) =>
    api<Patient>(`/access-program/patients/${id}`, {
      method: 'PATCH',
      data,
    }),

  deletePatient: (id: number) =>
    api<void>(`/access-program/patients/${id}`, {
      method: 'DELETE',
    }),
};