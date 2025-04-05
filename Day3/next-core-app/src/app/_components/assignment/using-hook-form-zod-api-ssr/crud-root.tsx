'use client'

import React, { useCallback, useEffect, useState } from 'react';
import FormComponent from './form';
import DataTable from '../../common/data-table';
import ConfirmModal from '../../common/confirm-modal';
import { Employee } from '../schemas/employee-schema';
import { createEmployee, deleteEmployee, updateEmployee } from '@/app/api-clients/employee-service-client';

interface CrudRootComponentProps {
    data: Employee[];
}


const CrudRootComponent: React.FC<CrudRootComponentProps> = ({ data }) => {
    const [employees, setEmployees] = useState<Employee[]>(data);
    const [employee, setEmployee] = useState<Employee>({ id: 1, name: "", designation: "", salary: 0 });
    const [edit, setEdit] = useState<boolean>(false);
    const [formDisabled, setFormDisabled] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [deleteCandidate, setDeleteCandidate] = useState<number | string | null>(null);

    const getNextId = useCallback((employees: Employee[]): number => {
        return employees.length ? Math.max(...employees.map((item) => item.id)) + 1 : 1;
    }, []);

    useEffect(() => {
        setEmployee({ id: getNextId(employees), name: "", designation: "", salary: 0 })
    }, [employees, getNextId]);

    const saveEmployee = useCallback(async (data: Employee) => {
        if (edit) {
            const updatedEmployee = await updateEmployee(data);
            const itemIndex = employees.findIndex((item) => item.id === updatedEmployee.id);
            const tempEmployees = [...employees];
            tempEmployees[itemIndex] = { ...updatedEmployee };
            setEmployees([...tempEmployees]);
        } else {
            const newEmployee = await createEmployee(data);
            setEmployees([...employees, { ...newEmployee }]);
        }
    }, [employees, employee, edit]);

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

    const handleModalYes = useCallback(async () => {
        try {
            const id = await deleteEmployee(deleteCandidate as number);
            const tempEmployees = employees.filter((item) => item.id !== id);
            setEmployees([...tempEmployees]);
            setShowModal(false);
            setDeleteCandidate(null);
        } catch (err) {
            console.error(err);
        }
    }, [deleteCandidate, employees]);

    const handleModalNo = useCallback(() => {
        setShowModal(false);
        setDeleteCandidate(null);
        setEmployee({ id: getNextId(employees), name: "", designation: "", salary: 0 });
    }, [employees, getNextId]);

    const resetEmployee = useCallback(() => {
        setEmployee({ id: getNextId(employees), name: "", designation: "", salary: 0 });
        setEdit(false);
    }, [employees, getNextId]);

    return (
        <div className="mt-3">
            <FormComponent employee={employee}
                saveEmployee={saveEmployee}
                resetEmployee={resetEmployee}
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