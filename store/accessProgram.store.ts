import { create } from 'zustand';
import { accessProgramAPI } from '@/lib/accessProgramAPI';
import { AccessProgram, Patient, CreatePatientRequest } from '@/types/accessProgram';

interface AccessProgramState {
  accessPrograms: AccessProgram[];
  patients: Patient[];
  selectedProgram: AccessProgram | null;
  selectedPatient: Patient | null;
  loading: boolean;
  error: string | null;

  // Access Program methods
  fetchAccessPrograms: () => Promise<void>;
  fetchAccessProgramById: (id: number) => Promise<void>;
  fetchPatientsForProgram: (id: number) => Promise<void>;

  // Patient methods
  fetchAllPatients: () => Promise<void>;
  fetchPatientById: (id: number) => Promise<void>;
  createPatient: (data: CreatePatientRequest) => Promise<Patient>;
  updatePatient: (id: number, data: Partial<CreatePatientRequest>) => Promise<Patient>;
  deletePatient: (id: number) => Promise<void>;
}

export const useAccessProgramStore = create<AccessProgramState>((set, get) => ({
  accessPrograms: [],
  patients: [],
  selectedProgram: null,
  selectedPatient: null,
  loading: false,
  error: null,

  fetchAccessPrograms: async () => {
    set({ loading: true, error: null });

    try {
      const response = await accessProgramAPI.getAllAccessPrograms();
      set({
        accessPrograms: response,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchAccessProgramById: async (id: number) => {
    set({ loading: true, error: null });

    try {
      const response = await accessProgramAPI.getAccessProgramById(id);
      set({
        selectedProgram: response,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchPatientsForProgram: async (id: number) => {
    set({ loading: true, error: null });

    try {
      const response = await accessProgramAPI.getPatientsForProgram(id);
      set({
        patients: response,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchAllPatients: async () => {
    set({ loading: true, error: null });

    try {
      const response = await accessProgramAPI.getAllPatients();
      set({
        patients: response,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchPatientById: async (id: number) => {
    set({ loading: true, error: null });

    try {
      const response = await accessProgramAPI.getPatientById(id);
      set({
        selectedPatient: response,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  createPatient: async (data: CreatePatientRequest) => {
    set({ loading: true, error: null });

    try {
      const response = await accessProgramAPI.createPatient(data);
      // Add the new patient to the list
      set((state) => ({
        patients: [...state.patients, response],
        loading: false,
      }));
      return response;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updatePatient: async (id: number, data: Partial<CreatePatientRequest>) => {
    set({ loading: true, error: null });

    try {
      const response = await accessProgramAPI.updatePatient(id, data);
      set((state) => ({
        patients: state.patients.map(p => p.id === id ? response : p),
        selectedPatient: state.selectedPatient?.id === id ? response : state.selectedPatient,
        loading: false,
      }));

      return response;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deletePatient: async (id: number) => {
    set({ loading: true, error: null });

    try {
      await accessProgramAPI.deletePatient(id);
      set((state) => ({
        patients: state.patients.filter(p => p.id !== id),
        selectedPatient: state.selectedPatient?.id === id ? null : state.selectedPatient,
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));