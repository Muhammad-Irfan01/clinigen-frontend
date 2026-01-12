"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, Download, Package, Loader2, Calendar, User, Mail, Phone, MapPin } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useAccessProgramStore } from '@/store/accessProgram.store';
import { Patient } from '@/types/accessProgram';

export default function PatientDetailPage() {
    const router = useRouter();
    const params = useParams();
    const { selectedPatient, loading, error, fetchPatientById } = useAccessProgramStore();
    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
        const patientId = Array.isArray(params.id) ? parseInt(params.id[0]) : parseInt(params.id);
        if (patientId) {
            fetchPatientById(patientId);
        }
    }, [params.id]);

    useEffect(() => {
        if (selectedPatient) {
            setPatient(selectedPatient);
        }
    }, [selectedPatient]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading patient details...</span>
            </div>
        );
    }

    if (!patient) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500">Patient not found</h2>
                    <p className="mt-2 text-gray-600">The patient you're looking for doesn't exist or you don't have access.</p>
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={() => router.push('/patients')}
                            className="bg-[#706FE4] hover:bg-[#D89AFE] text-white px-6 py-2 rounded-full font-bold"
                        >
                            Back to Patients
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9F9F9] p-6 md:p-10 font-sans text-[#1A1A1A]">
            <div className="max-w-7xl mx-auto">

                {/* Breadcrumb */}
                <button onClick={() => router.back()} className="flex items-center text-sm font-semibold text-blue-600 hover:underline mb-4">
                    <ChevronLeft className="w-4 h-4 mr-1" /> View patients
                </button>

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold">Patient {patient.patientId}</h1>
                        <p className="text-gray-600">{patient.firstName} {patient.lastName}</p>
                    </div>

                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#D1D5DB] text-gray-700 rounded-full font-bold text-sm hover:bg-gray-300 transition-colors">
                            <Download className="w-4 h-4" /> Download records
                        </button>
                    </div>
                </div>

                {/* Patient Information Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Personal Information */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold border-b pb-4 mb-6">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-start gap-3">
                                <User className="text-gray-400 mt-1" size={20} />
                                <div>
                                    <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">Full Name</p>
                                    <p className="text-sm font-bold">{patient.firstName} {patient.lastName}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Calendar className="text-gray-400 mt-1" size={20} />
                                <div>
                                    <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">Date of Birth</p>
                                    <p className="text-sm font-bold">N/A</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="text-gray-400 mt-1" size={20} />
                                <div>
                                    <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">Email</p>
                                    <p className="text-sm font-bold">{patient.email || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="text-gray-400 mt-1" size={20} />
                                <div>
                                    <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">Phone</p>
                                    <p className="text-sm font-bold">{patient.phone || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="md:col-span-2 flex items-start gap-3">
                                <MapPin className="text-gray-400 mt-1" size={20} />
                                <div className="flex-1">
                                    <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">Address</p>
                                    <p className="text-sm font-bold">N/A</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Patient Summary */}
                    <div className="bg-white rounded-xl shadow-sm border-2 border-black p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-black">Patient Summary</h2>
                            </div>
                            <div className="space-y-4 text-sm border-b pb-6">
                                <div className="flex justify-between text-gray-700 font-medium">
                                    <span>Patient ID:</span>
                                    <span className="font-bold">{patient.patientId}</span>
                                </div>
                                <div className="flex justify-between text-gray-700 font-medium">
                                    <span>Status:</span>
                                    <span className="font-bold">{patient.status}</span>
                                </div>
                                <div className="flex justify-between text-gray-700 font-medium">
                                    <span>Program:</span>
                                    <span className="font-bold">{patient.programId ? `Program #${patient.programId}` : 'N/A'}</span>
                                </div>
                                <div className="flex justify-between text-gray-700 font-medium">
                                    <span>Created:</span>
                                    <span className="font-bold">{new Date(patient.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="pt-6">
                            <span className="text-sm font-bold">Current Status:</span>
                            <div className={`mt-2 px-4 py-2 rounded-full text-sm font-bold ${
                                patient.status === 'active' ? 'bg-green-100 text-green-800' :
                                patient.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                                {patient.status}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Orders */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b flex justify-between items-center bg-white">
                        <h2 className="text-lg font-bold">Related Orders</h2>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-600">No related orders found for this patient.</p>
                    </div>
                </section>
            </div>
        </div>
    );
}