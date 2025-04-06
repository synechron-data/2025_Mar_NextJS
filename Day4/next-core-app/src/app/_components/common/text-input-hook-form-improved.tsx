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
    type?: string;
}

const TextInputHookFormImproved: React.FC<TextInputHookFormProps> = ({ name, label, placeholder, readOnly, register, errors, validation, type = "text" }) => {
    const error = errors && errors[name];
    const errorMessage = error && 'message' in error ? error.message : null;

    return (
        <div className='form-group mb-1'>
            <label className='mb-0' htmlFor={name}>{label}</label>
            <input
                type={type}
                className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
                id={name}
                placeholder={placeholder}
                readOnly={readOnly}
                {...register(name, validation)}
            />
            {errorMessage && <small className='text-danger'>{errorMessage.toString()}</small>}
        </div>
    );
};

export default TextInputHookFormImproved;

// import React from 'react';
// import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

// interface TextInputHookFormProps<T extends FieldValues = FieldValues> {
//     name: string;
//     label: string;
//     placeholder?: string;
//     readOnly?: boolean;
//     register: UseFormRegister<T>;
//     errors?: FieldErrors<T>;
//     validation?: RegisterOptions;
//     type?: string;
// }

// const TextInputHookFormImproved: React.FC<TextInputHookFormProps> = ({ name, label, placeholder, readOnly, register, errors, validation, type="text" }) => {
//     const error = errors && errors[name];
//     const errorMessage = error && 'message' in error ? error.message : null;

//     return (
//         <div className='form-group mb-1'>
//             <label className='mb-0' htmlFor={name}>{label}</label>
//             <input
//                 type={type}
//                 className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
//                 id={name}
//                 placeholder={placeholder}
//                 readOnly={readOnly}
//                 {...register(name, validation)}
//             />
//             {errorMessage && <small className='text-danger'>{errorMessage.toString()}</small>}
//         </div>
//     );
// };

// export default TextInputHookFormImproved;