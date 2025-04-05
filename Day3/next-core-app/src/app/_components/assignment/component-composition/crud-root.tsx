'use client'

import React, { useState } from 'react';
import FormComponent from './form';
import DataTable from '../../common/data-table';
import { Employee } from '../models/employee';

const CrudRootComponent: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([
        { id: 1, name: "Anjali Sharma", designation: "Software Engineer", salary: 75000 },
        { id: 2, name: "Rahul Verma", designation: "Senior Developer", salary: 95000 },
        { id: 3, name: "Neha Gupta", designation: "Product Manager", salary: 120000 },
        { id: 4, name: "Amit Joshi", designation: "UI/UX Designer", salary: 70000 },
    ]);

    return (
        <div className="mt-3">
            <FormComponent />
            <hr />
            <DataTable items={employees}>
                <h5 className="text-primary text-uppercase font-weight-bold">Employees Table</h5>
            </DataTable>
        </div>
    );
}

export default CrudRootComponent