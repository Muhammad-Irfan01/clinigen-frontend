"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Info,
  Loader2,
  Pencil
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/auth.store';
import { authAPI } from '@/lib/authAPI';
import useToast from '@/lib/useToast';

// --- Components ---

const InfoSection = ({ 
  title, 
  children,
  onEdit 
}: { 
  title: string; 
  children: React.ReactNode;
  onEdit?: () => void;
}) => (
  <div className="flex-1 min-w-62.5 space-y-4">
    <div className="flex justify-between items-center border-b pb-2 mb-4">
      <h3 className="text-sm font-bold text-[#1A1A1A]">{title}</h3>
      {onEdit && (
        <button 
          onClick={onEdit}
          className="text-[#706FE4] hover:text-[#5a4fcf] transition-colors"
          title="Edit section"
        >
          <Pencil size={16} />
        </button>
      )}
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-start gap-2 group">
    <div className="flex-1 min-w-0">
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">{label}</p>
      <p className="text-sm font-bold text-gray-800 break-words hyphens-auto">{value || 'Not set'}</p>
    </div>
  </div>
);

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: Array<{
    name: string;
    label: string;
    value: string;
    type?: string;
  }>;
  onSave: (data: Record<string, string>) => void;
  isLoading?: boolean;
}

const EditModal = ({ isOpen, onClose, title, fields, onSave, isLoading }: EditModalProps) => {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      const initialValues: Record<string, string> = {};
      fields.forEach(field => {
        initialValues[field.name] = field.value;
      });
      setValues(initialValues);
    }
  }, [isOpen, fields]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 space-y-4">
        <h2 className="text-xl font-bold text-[#1A1A1A]">{title}</h2>
        
        <div className="space-y-4">
          {fields.map(field => (
            <div key={field.name}>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-tight mb-1">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  value={values[field.name] || ''}
                  onChange={(e) => setValues(prev => ({ ...prev, [field.name]: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#706FE4]"
                  rows={3}
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  value={values[field.name] || ''}
                  onChange={(e) => setValues(prev => ({ ...prev, [field.name]: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#706FE4]"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            varient="secondary" 
            onClick={onClose}
            className="flex-1"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            varient="primary" 
            onClick={() => onSave(values)}
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function AccountDetailPage() {
  const { user, fetchProfile, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    section: string;
    fields: Array<{ name: string; label: string; value: string; type?: string }>;
  }>({ isOpen: false, section: '', fields: [] });
  
  const toast = useToast();

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      await fetchProfile();
    } catch (error: any) {
      toast.error('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (data: Record<string, string>) => {
    try {
      setIsUpdating(true);
      
      // Map the form data to the API format
      const updateData: Record<string, string> = {};
      
      // Map field names to API field names
      const fieldMapping: Record<string, string> = {
        firstName: 'firstName',
        lastName: 'lastName',
        phone: 'phone',
        jobRole: 'jobRole',
        licenseNumber: 'licenseNumber',
        instituteName: 'instituteName',
        addressLine1: 'addressLine1',
        townCity: 'townCity',
        country: 'country'
      };

      Object.keys(data).forEach(key => {
        if (fieldMapping[key]) {
          updateData[fieldMapping[key]] = data[key];
        }
      });

      await authAPI.updateProfile(updateData);
      await fetchProfile();
      toast.success('Profile updated successfully!');
      setEditModal({ isOpen: false, section: '', fields: [] });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const openEditModal = (section: string) => {
    if (!user) return;

    let fields: Array<{ name: string; label: string; value: string; type?: string }> = [];
    let title = '';

    switch (section) {
      case 'personal':
        title = 'Edit Personal Information';
        fields = [
          { name: 'firstName', label: 'First Name', value: user.first_name || '' },
          { name: 'lastName', label: 'Last Name', value: user.last_name || '' },
          { name: 'phone', label: 'Phone Number', value: user.phone || '' }
        ];
        break;
      case 'job':
        title = 'Edit Job Information';
        fields = [
          { name: 'jobRole', label: 'Job Role / Specialism', value: user.user_profiles?.job_role || '' },
          { name: 'licenseNumber', label: 'License Number', value: user.user_profiles?.license_number || '' }
        ];
        break;
      case 'institute':
        title = 'Edit Institute Information';
        fields = [
          { name: 'instituteName', label: 'Institute Name', value: user.user_profiles?.institute_name || '' },
          { name: 'addressLine1', label: 'Address', value: user.user_profiles?.address_line_1 || '', type: 'textarea' },
          { name: 'townCity', label: 'Town/City', value: user.user_profiles?.town_city || '' },
          { name: 'country', label: 'Country', value: user.user_profiles?.country || '' }
        ];
        break;
    }

    setEditModal({ isOpen: true, section, fields });
  };

  // Get display values
  const fullName = user ? `${user.first_name} ${user.last_name}`.trim() : '';
  const initials = fullName ? fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  const jobRole = user?.user_profiles?.job_role || 'Not set';
  const institute = user?.user_profiles?.institute_name || 'Not set';
  const licenseNumber = user?.user_profiles?.license_number || 'Not set';
  const phone = user?.phone || 'Not set';
  const address = user?.user_profiles?.address_line_1 || 'Not set';
  const townCity = user?.user_profiles?.town_city || '';
  const country = user?.user_profiles?.country || 'United Kingdom';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#706FE4]" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-600">Please sign in to view your account</p>
          <Button varient="primary" onClick={() => window.location.href = '/signin'}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-6 md:p-12 text-[#1A1A1A] font-sans">
      <div className="max-w-5xl mx-auto space-y-6">

        <h1 className="text-2xl font-black mb-8">Account detail</h1>

        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col lg:flex-row gap-12">
          <div className="shrink-0">
            <div className="w-20 h-20 bg-[#FFD1C1] rounded-full flex items-center justify-center text-2xl font-bold text-[#1A1A1A]">
              {initials}
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-12">
            <InfoSection 
              title="Personal information" 
              onEdit={() => openEditModal('personal')}
            >
              <Field 
                label="Full name" 
                value={fullName} 
              />
              <Field 
                label="Email" 
                value={user.email} 
              />
              <Field 
                label="Phone number" 
                value={phone}
              />
            </InfoSection>

            <InfoSection 
              title="Job title" 
              onEdit={() => openEditModal('job')}
            >
              <Field 
                label="Specialism" 
                value={jobRole}
              />
              <Field 
                label="Your job" 
                value={jobRole}
              />
              <Field 
                label="License or registration number" 
                value={licenseNumber}
              />
            </InfoSection>

            <InfoSection 
              title="Institutes" 
              onEdit={() => openEditModal('institute')}
            >
              <Field 
                label="Current" 
                value={institute}
              />
              <Field 
                label="Permissions" 
                value={user.roles?.[0]?.name || 'Basic user'} 
              />
              <Field 
                label="Address" 
                value={`${address}, ${townCity}, ${country}`.replace(/, , /g, ', ').replace(/, $/, '')}
              />
            </InfoSection>
          </div>
        </section>

        {/* Shipping Addresses */}
        <section className="space-y-4">
          <h2 className="font-bold px-2">Shipping addresses</h2>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 w-full">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold text-sm">Primary</span>
              <span className="bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-bold px-2 py-0.5 rounded">Selected</span>
            </div>

            <div className="space-y-1 mb-8">
              <p className="text-[11px] font-bold text-gray-400 uppercase">Address</p>
              <p className="text-sm font-bold leading-relaxed text-gray-700">
                {address}, {townCity}, {country}
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-[#F3E8FF] rounded-lg p-4 flex flex-col md:flex-row gap-4">
              <div className="text-[#7C3AED] mt-1 shrink-0"><Info size={20} fill="currentColor" className="text-white" /></div>
              <div className="text-xs leading-relaxed text-[#1D0E62]">
                <p className="font-bold mb-1">Shipping addresses</p>
                <p>
                  To add, remove, or change your shipping address, please contact our Customer Services team
                  directly on <span className="font-bold">+44 (0) 1932 824 100</span> or email
                  ukcustomerservice@clinigengroup.com.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 px-8 max-w-lg w-full">
             <span className="font-bold text-sm text-gray-800">Additional</span>
             <span className="ml-3 bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">0</span>
          </div>
        </section>

        {/* Billing Info */}
        <section className="space-y-4">
          <div className="px-2 font-bold uppercase text-[11px] tracking-widest text-gray-500">Billing information</div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 w-full">
            <div className="space-y-1 mb-6">
              <p className="text-[11px] font-bold text-gray-400 uppercase">Address</p>
              <p className="text-sm font-bold leading-relaxed text-gray-700">
                {address}, {townCity}, {country}
              </p>
            </div>
            <div className="bg-[#F3E8FF] rounded-lg p-4 flex flex-col md:flex-row gap-4">
              <div className="text-[#7C3AED] mt-1 shrink-0"><Info size={20} fill="currentColor" className="text-white" /></div>
              <div className="text-xs leading-relaxed text-[#1D0E62]">
                <p className="font-bold mb-1">Need to update your billing information?</p>
                <p>To change your billing information please contact Credit Control by emailing
                creditcontrol@clinigengroup.com
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Edit Modal */}
      <EditModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, section: '', fields: [] })}
        title={editModal.fields.length > 0 ? `Edit ${editModal.section === 'personal' ? 'Personal' : editModal.section === 'job' ? 'Job' : 'Institute'} Information` : ''}
        fields={editModal.fields}
        onSave={handleUpdateProfile}
        isLoading={isUpdating}
      />
    </div>
  );
}
