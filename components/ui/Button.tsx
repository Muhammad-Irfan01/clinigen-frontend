import { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx';

type ButtonVarient = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    varient?: ButtonVarient;
    isLoading?: boolean;
    children?: ReactNode
}

export const Button = ({
    children,
    varient = 'primary',
    isLoading = false,
    disabled,
    className,
    ...rest
}: ButtonProps) => {
  return (
    <button
    disabled={ disabled || isLoading}
    className={clsx(
        'px-4 py-2 rounded-md transition',
        {
            'bg-blue-500 text-white hover:bg-blue-600': varient === 'primary',
            'bg-gray-200 text-[#413851] hover:bg-gray-300': varient === 'secondary',
            'bg-red-500 text-white hover:bg-red-600': varient === 'danger',
            'opacity-50 cursor-not-allowed': disabled || isLoading,
        },
        className
    )}
    {...rest}
    >
        {isLoading ? "Loading..." : children}
    </button>
  );
}


