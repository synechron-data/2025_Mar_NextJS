import { Employee, employeeSchema } from "../_components/assignment/schemas/employee-schema"

const API_URL = process.env.NEXT_PUBLIC_EMPLOYEES_API_URL || "";

export const fetchEmployees = async (): Promise<Array<Employee>> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch employees');
    }
    const data = await response.json();
    return employeeSchema.array().parse(data);
}

export const fetchEmployeesSSR = async (): Promise<Array<Employee>> => {
    const response = await fetch(API_URL, { cache: "no-store" });
    if (!response.ok) {
        throw new Error('Failed to fetch employees');
    }
    const data = await response.json();
    return employeeSchema.array().parse(data);
}

export const createEmployee = async (employee: Employee): Promise<Employee> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeSchema.parse(employee))
    });
    if (!response.ok) {
        throw new Error('Failed to create employee');
    }
    const data = await response.json();
    return employeeSchema.parse(data);
}

export const updateEmployee = async (employee: Employee): Promise<Employee> => {
    const response = await fetch(`${API_URL}/${employee.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeSchema.parse(employee))
    });
    if (!response.ok) {
        throw new Error('Failed to update employee');
    }
    const data = await response.json();
    return employeeSchema.parse(data);
}

export const deleteEmployee = async (id: number): Promise<number> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete employee');
    } else {
        return id;
    }
}