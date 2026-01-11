"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Info, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAccessProgramStore } from '@/store/accessProgram.store';
import useToast from '@/lib/useToast';

export default function NewPatient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { accessPrograms, loading: programsLoading, fetchAccessPrograms, createPatient } = useAccessProgramStore();
    const toast = useToast();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    // Get program ID from URL if available
    const programIdFromUrl = searchParams.get('programId');

    useEffect(() => {
      fetchAccessPrograms();

      // If program ID is provided in URL, set it as default
      if (programIdFromUrl) {
        setValue('programId', parseInt(programIdFromUrl));
      }
    }, [programIdFromUrl]);

    const onSubmit = async (data: any) => {
      try {
        // Format the data to match the CreatePatientRequest interface
        const patientData = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          dob: data.dob,
          gender: data.gender,
          patientId: data.patientId,
          programId: parseInt(data.programId),
          address: data.address,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country || 'UK',
        };

        await createPatient(patientData);
        toast.success('Patient created successfully!');
        router.push('/patients'); // Redirect to patients page after successful creation
      } catch (error) {
        console.error('Error creating patient:', error);
        toast.error('Failed to create patient');
      }
    };

    if (programsLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-2xl font-bold">Loading programs...</div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#f9f8f4] p-4 md:p-12 font-sans text-[#2d1a47]">
        <div className="max-w-4xl mx-auto">

          {/* Header matching 'Patients' dashboard style */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight">Create new patient</h1>
            <button onClick={() => router.push('/patients')} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <X size={28} />
            </button>
          </div>

          {/* Main Form Container */}
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">

            {/* Blue info bar often seen in clinical portals */}
            <div className="bg-[#f3effb] px-8 py-4 flex items-start gap-3 border-b border-gray-200">
              <Info size={18} className="text-[#7c3aed] mt-0.5" />
              <p className="text-sm font-medium">
                Provide the patient's basic information to begin enrollment. Fields marked with <span className="text-red-500">*</span> are mandatory.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12 space-y-10">

              {/* Program Selection - Custom Dropdown style */}
              <div className="flex flex-col gap-3">
                <label className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">
                  Select Program <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("programId", { required: "Please select a program" })}
                    className="w-full h-11 appearance-none bg-white border border-gray-300 rounded-sm px-4 font-bold text-sm text-[#2d1a47] outline-none focus:ring-1 focus:ring-purple-400"
                  >
                    <option value="">Search by program name</option>
                    {accessPrograms.map(program => (
                      <option key={program.id} value={program.id}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <Input
                  label="Patient ID / Reference"
                  placeholder="By program, generic name..."
                  type="text"
                  className='border rounded-lg p-2 border-gray-300 focus:outline-none'
                  registration={register("patientId", { required: "ID is required" })}
                  error={errors.patientId as any}
                />

                <Input
                  label="Date of Birth"
                  placeholder="DD/MM/YYYY"
                  type="date"
                  className='border rounded-lg p-2 border-gray-300 focus:outline-none'
                  registration={register("dob", { required: "DOB is required" })}
                  error={errors.dob as any}
                />

                <Input
                  label="First Name"
                  placeholder="Enter first name"
                  type="text"
                  className='border rounded-lg p-2 border-gray-300 focus:outline-none'
                  registration={register("firstName", { required: "Required" })}
                  error={errors.firstName as any}
                />

                <Input
                  label="Last Name"
                  placeholder="Enter last name"
                  type="text"
                  className='border rounded-lg p-2 border-gray-300 focus:outline-none'
                  registration={register("lastName", { required: "Required" })}
                  error={errors.lastName as any}
                />

                <Input
                  label="Email"
                  placeholder="Enter email"
                  type="email"
                  className='border rounded-lg p-2 border-gray-300 focus:outline-none'
                  registration={register("email")}
                  error={errors.email as any}
                />

                <Input
                  label="Phone"
                  placeholder="Enter phone number"
                  type="tel"
                  className='border rounded-lg p-2 border-gray-300 focus:outline-none'
                  registration={register("phone")}
                  error={errors.phone as any}
                />

                <Input
                  label="Address"
                  placeholder="Enter address"
                  type="text"
                  className='border rounded-lg p-2 border-gray-300 focus:outline-none'
                  registration={register("address")}
                  error={errors.address as any}
                />

                <Input
                  label="City"
                  placeholder="Enter city"
                  type="text"
                  className='border rounded-lg p-2 border-gray-300 focus:outline-none'
                  registration={register("city")}
                  error={errors.city as any}
                />

                <Input
                  label="State/Province"
                  placeholder="Enter state"
                  type="text"
                  className='border rounded-lg p-2 border-gray-300 focus:outline-none'
                  registration={register("state")}
                  error={errors.state as any}
                />

                <Input
                  label="ZIP/Postal Code"
                  placeholder="Enter ZIP code"
                  type="text"
                  className='border rounded-lg p-2 border-gray-300 focus:outline-none'
                  registration={register("zip")}
                  error={errors.zip as any}
                />

                <Input
                  label="Country"
                  placeholder="Enter country"
                  type="text"
                  className='border rounded-lg p-2 border-gray-300 focus:outline-none'
                  registration={register("country", { value: "UK" })}
                  error={errors.country as any}
                />

                <Input
                  label="Initials"
                  placeholder="J.M."
                  type="text"
                  className='border rounded-lg p-2 border-gray-300 focus:outline-none'
                  registration={register("initials")}
                  error={errors.initials as any}
                />

                {/* Gender Radio Group */}
                <div className="flex flex-col gap-3">
                  <label className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    {['Male', 'Female', 'Other'].map((g) => (
                      <label key={g} className="flex-1 flex items-center justify-center h-11 border border-gray-300 rounded-sm font-bold text-sm cursor-pointer hover:bg-gray-50 transition-colors has-checked:border-[#7c3aed] has-checked:bg-[#f3effb] has-checked:text-[#7c3aed]">
                        <input type="radio" value={g} {...register("gender", { required: true })} className="hidden" />
                        {g}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-10 flex flex-col sm:flex-row items-center justify-end gap-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => router.push('/patients')}
                  className="text-[#7c3aed] font-bold text-sm hover:underline uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#7c3aed] text-white px-10 py-3 rounded-full font-bold text-sm shadow-md hover:bg-[#6d28d9] transition-all transform active:scale-95"
                >
                  Create patient
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}