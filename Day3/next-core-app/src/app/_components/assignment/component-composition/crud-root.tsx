'use client'

import React, { useCallback, useState } from 'react';
import FormComponent from './form';
import DataTable from '../../common/data-table';
import { Employee } from '../models/employee';

const CrudRootComponent: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [employee, setEmployee] = useState<Employee>({ id: 1, name: "", designation: "", salary: 0 });

    const changeEmployee = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const field = e.target.id;
        const newEmployee = { ...employee };
        if ((field === "id" || field === "salary") && e.target.value) {
            newEmployee[field] = parseInt(e.target.value);
        } else if ((field === "designation" || field === "name") && e.target.value) {
            newEmployee[field] = e.target.value;
        }
        setEmployee(newEmployee);
    }, [employee]);

    const getNextId = useCallback((employees: Employee[]): number => {
        return employees.length ? employees[employees.length - 1].id + 1 : 1;
    }, []);

    const saveEmployee = useCallback(() => {
        const tempEmployees = [...employees, { ...employee }];
        setEmployees([...tempEmployees]);
        setEmployee({ id: getNextId(tempEmployees), name: "", designation: "", salary: 0 });
    }, [employees, employee]);

    return (
        <div className="mt-3">
            <FormComponent employee={employee} changeEmployee={changeEmployee}
                saveEmployee={saveEmployee} />
            <hr />
            <DataTable items={employees}>
                <h5 className="text-primary text-uppercase font-weight-bold">Employees Table</h5>
            </DataTable>
        </div>
    );
}

export default CrudRootComponent