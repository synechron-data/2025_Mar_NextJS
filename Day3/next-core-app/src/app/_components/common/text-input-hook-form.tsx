import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface TextInputHookFormProps {
    name: string;
    label: string;
    placeholder?: string;
    readOnly?: boolean;
    register: UseFormRegister<any>;
    errors?: FieldErrors;
    validation?: any;
}

const TextInputHookForm: React.FC<TextInputHookFormProps> = ({ name, label, placeholder, readOnly, register, errors, validation }) => {
    const error = errors && errors[name];
    const errorMessage = error && 'message' in error ? error.message : null;

    return (
        <div className='form-group mb-1'>
            <label className='mb-0' htmlFor={name}>{label}</label>
            <input
                className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
                type='text'
                id={name}
                placeholder={placeholder}
                readOnly={readOnly}
                {...register(name, validation)}
            />
            {errorMessage && <small className='text-danger'>{errorMessage.toString()}</small>}
        </div>
    );
};

export default TextInputHookForm;