'use client'

import React, { useCallback, useState } from 'react';
import FormComponent from './form';
import DataTable from '../../common/data-table';
import { Employee } from '../models/employee';
import ConfirmModal from '../../common/confirm-modal';

const CrudRootComponent: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [employee, setEmployee] = useState<Employee>({ id: 1, name: "", designation: "", salary: 0 });
    const [edit, setEdit] = useState<boolean>(false);
    const [formDisabled, setFormDisabled] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [deleteCandidate, setDeleteCandidate] = useState<number | string | null>(null);

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
        if (edit) {
            const tempEmployees = [...employees];
            const itemIndex = tempEmployees.findIndex((item) => item.id === employee.id);
            tempEmployees.splice(itemIndex, 1, { ...employee });
            setEmployees([...tempEmployees]);
            setEmployee({ id: getNextId(tempEmployees), name: "", designation: "", salary: 0 });
            setEdit(false);
        } else {
            const tempEmployees = [...employees, { ...employee }];
            setEmployees([...tempEmployees]);
            setEmployee({ id: getNextId(tempEmployees), name: "", designation: "", salary: 0 });
        }
    }, [employees, employee, getNextId, edit]);

    const selectEmployee = useCallback((item: Employee, allowEdit: boolean) => {
        if (allowEdit) {
            setEmployee({ ...item });
            setEdit(true);
            setFormDisabled(false);
        } else {
            setEmployee({ ...item });
            setEdit(false);
            setFormDisabled(true);
        }
    }, []);

    const removeEmployee = useCallback((id: number | string) => {
        setShowModal(true);
        setDeleteCandidate(id);
    }, []);

    const handleModalYes = useCallback(() => {
        const tempEmployees = employees.filter((item) => item.id !== deleteCandidate);
        setEmployees([...tempEmployees]);
        setShowModal(false);
        setDeleteCandidate(null);
        setEmployee({ id: getNextId(tempEmployees), name: "", designation: "", salary: 0 });
    }, [deleteCandidate, employees, getNextId]);

    const handleModalNo = useCallback(() => {
        setShowModal(false);
        setDeleteCandidate(null);
        setEmployee({ id: getNextId(employees), name: "", designation: "", salary: 0 });
    }, [employees, getNextId]);

    return (
        <div className="mt-3">
            <FormComponent employee={employee} changeEmployee={changeEmployee}
                saveEmployee={saveEmployee}
                disabled={formDisabled} />
            <hr />
            <DataTable items={employees} onSelect={selectEmployee} onDelete={removeEmployee}>
                <h5 className="text-primary text-uppercase font-weight-bold">Employees Table</h5>
            </DataTable>
            <ConfirmModal show={showModal} title="Delete Employee Confirmation"
                message="Are you sure you want to delete this employee?"
                handleYes={handleModalYes}
                handleNo={handleModalNo} />
        </div>
    );
}

export default CrudRootComponent