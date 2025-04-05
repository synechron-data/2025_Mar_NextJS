import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeSchema, Employee } from '../schemas/employee-schema';
import TextInputHookFormImproved from '../../common/text-input-hook-form-improved';

interface FormComponentProps {
    employee: Employee;
    saveEmployee: (data: Employee) => void;
    resetEmployee: () => void;
    disabled: boolean;
}

const FormComponent: React.FC<FormComponentProps> = ({ employee, saveEmployee, resetEmployee, disabled }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Employee>({
        resolver: zodResolver(employeeSchema),
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
                                <TextInputHookFormImproved label="Employee Id" name="id" readOnly={true} register={register} errors={errors} />
                            </div>
                            <div className="col-md-6">
                                <TextInputHookFormImproved label="Employee Name" name="name" register={register} errors={errors} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <TextInputHookFormImproved label="Designation" name="designation" register={register} errors={errors} />
                            </div>
                            <div className="col-md-6">
                                <TextInputHookFormImproved label="Salary" type="number" name="salary" register={register} errors={errors} />
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