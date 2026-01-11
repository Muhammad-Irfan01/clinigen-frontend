import ToastDemo from '@/components/ToastDemo';

const ToastDemoPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Toast Notifications Demo</h1>
      <p className="mb-6 text-gray-600">
        This page demonstrates the usage of React Hot Toast notifications in the application.
      </p>
      
      <ToastDemo />
      
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3">How to Use Toasts</h3>
        <div className="prose">
          <p>To use toasts in your components, you have two options:</p>
          
          <h4>Option 1: Direct import</h4>
          <pre className="bg-gray-100 p-3 rounded text-sm">
            {`import { toast } from '@/components/ToastProvider';

// Usage
toast.success('Success message');
toast.error('Error message');
toast('Default message');`}
          </pre>
          
          <h4>Option 2: Using the hook</h4>
          <pre className="bg-gray-100 p-3 rounded text-sm">
            {`import useToast from '@/lib/useToast';

const MyComponent = () => {
  const { success, error, info } = useToast();
  
  // Usage
  success('Success message');
  error('Error message');
  info('Info message');
};`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ToastDemoPage;