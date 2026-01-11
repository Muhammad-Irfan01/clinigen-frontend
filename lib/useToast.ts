import { toast } from '@/components/ToastProvider';

export const useToast = () => {
  const success = (message: string) => {
    toast.success(message);
  };

  const error = (message: string) => {
    toast.error(message);
  };

  const info = (message: string) => {
    toast(message);
  };

  const loading = (message: string) => {
    toast.loading(message);
  };

  const promise = <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return toast.promise(promise, messages);
  };

  return {
    success,
    error,
    info,
    loading,
    promise,
  };
};

export default useToast;