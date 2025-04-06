import React, { useEffect } from 'react';
import { Employee } from '../models/employee';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextInputHookForm from '../../common/text-input-hook-form';

interface FormComponentProps {
    employee: Employee;
    saveEmployee: (data: Employee) => void;
    resetEmployee: () => void;
    disabled: boolean;
}

const FormComponent: React.FC<FormComponentProps> = ({ employee, saveEmployee, resetEmployee, disabled }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Employee>({
        defaultValues: employee
    });

    useEffect(() => {
        reset(employee);
    }, [employee, reset]);

    const onSubmit: SubmitHandler<Employee> = (data) => {
        saveEmployee(data);
    }

    return (
        <div className='row'>
            <div className='col-sm-8 offset-sm-2'>
                <form className='form-horizontal' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <fieldset disabled={disabled}>
                        <legend className="text-center text-secondary text-uppercase font-weight-bold">Add/Edit Employee Information</legend>
                        <hr className="mt-0" />

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <TextInputHookForm label="Employee Id" name="id" readOnly={true} register={register} errors={errors} />
                            </div>
                            <div className="col-md-6">
                                <TextInputHookForm label="Employee Name" name="name" register={register} errors={errors}
                                    validation={{ required: 'Employee Name is required' }} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <TextInputHookForm label="Designation" name="designation" register={register} errors={errors}
                                    validation={{ required: 'Designation is required' }} />
                            </div>
                            <div className="col-md-6">
                                <TextInputHookForm label="Salary" name="salary" register={register} errors={errors}
                                    validation={{
                                        required: 'Salary is required',
                                        validate: {
                                            isNumber: (value: string) => !isNaN(Number(value)) || 'Salary must be a number',
                                            isPositive: (value: string) => Number(value) > 0 || 'Salary must be a positive number'
                                        }
                                    }} />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6">
                                <button type="submit" className="btn btn-success w-100">Save</button>
                            </div>
                            <div className="col-md-6">
                                <button type="reset" className="btn btn-primary w-100" onClick={resetEmployee}>Reset</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default FormComponent