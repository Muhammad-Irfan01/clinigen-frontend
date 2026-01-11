'use client';

import toast, { Toaster } from 'react-hot-toast';

// Define toast options
const toastOptions = {
  duration: 4000, // 4 seconds
  position: 'top-center' as const,
  style: {
    background: '#fff',
    color: '#000',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  success: {
    style: {
      background: '#d4edda',
      color: '#155724',
    },
    icon: '✅',
  },
  error: {
    style: {
      background: '#f8d7da',
      color: '#721c24',
    },
    icon: '❌',
  },
  loading: {
    style: {
      background: '#d1ecf1',
      color: '#0c5460',
    },
    icon: '⏳',
  },
};

const ToastProvider = () => {
  return <Toaster toastOptions={toastOptions} />;
};

export { ToastProvider, toast };