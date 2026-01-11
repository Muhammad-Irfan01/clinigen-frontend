# Toast Notifications

React Hot Toast has been integrated into the application. You can now easily show toast notifications throughout the application.

## Usage

### Direct import:

```tsx
import { toast } from '@/components/ToastProvider';

// Show different types of toasts
toast.success('Operation completed successfully!');
toast.error('An error occurred!');
toast.loading('Loading...');
toast('This is a default toast');

// You can also use promise-based toasts
const response = await toast.promise(
  fetch('/api/data'),
  {
    loading: 'Loading...',
    success: 'Data loaded successfully!',
    error: 'Failed to load data'
  }
);
```

### Using the useToast hook:

```tsx
import useToast from '@/lib/useToast';

const MyComponent = () => {
  const { success, error, info, loading, promise } = useToast();

  const handleAction = () => {
    success('Action completed successfully!');
    // or
    error('An error occurred!');
  };

  return (
    <div>
      <button onClick={handleAction}>Perform Action</button>
    </div>
  );
};
```

### Toast Options

The toast provider is configured with the following options:
- Duration: 4 seconds
- Position: Top-right
- Custom styling for success, error, and loading states

## Components

- `ToastProvider`: The provider component that should be added to your root layout
- `toast`: The toast function that can be imported and used in any component
- `useToast`: A custom hook that provides convenient methods for different toast types

The ToastProvider has already been added to the root layout in `app/layout.tsx`.