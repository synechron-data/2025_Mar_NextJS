import React from 'react';
import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister, Path } from 'react-hook-form';

interface TextInputHookFormProps<T extends FieldValues = FieldValues> {
    name: keyof T;
    label: string;
    placeholder?: string;
    readOnly?: boolean;
    register: UseFormRegister<T>;
    errors?: FieldErrors<T>;
    validation?: RegisterOptions;
    type?: string;
}

function TextInputHookFormImproved<TFieldValues extends FieldValues>({
    name,
    label,
    placeholder,
    readOnly,
    register,
    errors,
    validation,
    type = 'text',
}: TextInputHookFormProps<TFieldValues>) {
    const fieldError = errors?.[name];
    const errorMessage =
        fieldError && 'message' in fieldError ? fieldError.message : null;

    return (
        <div className='form-group mb-1'>
            <label className='mb-0' htmlFor={name as string}>
                {label}
            </label>
            <input
                type={type}
                className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
                id={name as string}
                placeholder={placeholder}
                readOnly={readOnly}
                {...register(name as Path<TFieldValues>, validation as RegisterOptions<TFieldValues, Path<TFieldValues>>)}
            />
            {errorMessage && (
                <small className='text-danger'>{errorMessage.toString()}</small>
            )}
        </div>
    );
}

export default TextInputHookFormImproved;