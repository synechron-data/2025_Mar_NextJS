import React from 'react';
import TextInput from '../../common/text-input';
import { Employee } from '../models/employee';

interface FormComponentProps {
    employee: Employee;
    changeEmployee: (e: React.ChangeEvent<HTMLInputElement>) => void;
    saveEmployee: () => void;
}

const FormComponent: React.FC<FormComponentProps> = (props) => {
    return (
        <div className='row'>
            <div className='col-sm-8 offset-sm-2'>
                <form className='form-horizontal' autoComplete='off' onSubmit={(e) => {
                    e.preventDefault();
                    props.saveEmployee();
                }}>
                    <fieldset>
                        <legend className="text-center text-secondary text-uppercase font-weight-bold">Add/Edit Employee Information</legend>
                        <hr className="mt-0" />

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <TextInput label="Employee Id" name="id" value={props.employee.id.toString()} readOnly={true} />
                            </div>
                            <div className="col-md-6">
                                <TextInput label="Employee Name" name="name" value={props.employee.name} onChange={props.changeEmployee} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <TextInput label="Designation" name="designation" value={props.employee.designation} onChange={props.changeEmployee} />
                            </div>
                            <div className="col-md-6">
                                <TextInput label="Salary" name="salary" value={props.employee.salary.toString()} onChange={props.changeEmployee} />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6">
                                <button type="submit" className="btn btn-success w-100">Save</button>
                            </div>
                            <div className="col-md-6">
                                <button type="reset" className="btn btn-primary w-100">Reset</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default FormComponent