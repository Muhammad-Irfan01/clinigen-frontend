import React from 'react'
import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from 'react-hook-form'

interface inputField {
    label?: string,
    type: string,
    placeholder: string,
    registration: UseFormRegisterReturn,
    className: string,
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
}
export const Input = ({
    label,
    type = 'text',
    placeholder,
    registration,
    className,
    error
}: inputField) => {
  return (
    <div className='flex flex-col gap-2'>
      <label className='font-medium'>{label}</label>

      <input
       type={type}
       placeholder={placeholder}
       className={className}
       {...registration} 
       />

       {error && typeof error.message === 'string' && error.message && (
        <span className='text-sm text-red-500'>{error.message}</span>
       )}
    </div>
  )
}

