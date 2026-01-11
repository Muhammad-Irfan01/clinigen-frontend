'use client';

import { toast } from '@/components/ToastProvider';

const ToastDemo = () => {
  const showToast = (type: 'success' | 'error' | 'loading' | 'custom') => {
    switch (type) {
      case 'success':
        toast.success('This is a success message!');
        break;
      case 'error':
        toast.error('This is an error message!');
        break;
      case 'loading':
        toast.loading('This is a loading message!');
        break;
      case 'custom':
        toast('This is a custom toast!');
        break;
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">Toast Demo</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => showToast('success')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Success Toast
        </button>
        <button
          onClick={() => showToast('error')}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Error Toast
        </button>
        <button
          onClick={() => showToast('loading')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Loading Toast
        </button>
        <button
          onClick={() => showToast('custom')}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          Custom Toast
        </button>
      </div>
    </div>
  );
};

export default ToastDemo;
