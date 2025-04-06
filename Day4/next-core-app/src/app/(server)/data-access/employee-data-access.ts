import { Employee, employeeSchema } from "@/app/models/employee";
import { readData, writeData } from "../utilities/file-handler";

let employees: Array<Employee> = [];

await (async function initializeEmployees() {
    try {
        const data = await readData();
        employees = data.map(e => employeeSchema.parse(e));
    } catch (err) {
        console.error(`Error initializing employees: ${err}`);
        employees = [];
    }
})();

const getEmployees = (): Promise<Array<Employee>> => {
    return new Promise((resolve, reject) => {
        if (employees.length > 0) {
            resolve(employees);
        } else {
            reject("No employees found");
        }
    });
}

const getEmployee = (id: number): Promise<Employee> => {
    return new Promise((resolve, reject) => {
        const employee = employees.find((e) => e.id === id);
        if (employee) {
            resolve(employee);
        } else {
            reject(`Employee with Id - ${id}, not found`);
        }
    });
}

const createEmployee = (employeeToInsert: Employee): Promise<Employee | undefined> => {
    return new Promise(async (resolve, reject) => {
        employees.push(employeeToInsert);
        try {
            const data = await writeData(employees);
            employees = data.map(e => employeeSchema.parse(e));
            resolve(employees.find((e) => e.id === employeeToInsert.id));
        } catch (err) {
            reject(`Failed to insert employee: ${err}`);
        }
    });
}

const findAndUpdateEmployee = (id: number, employeeToUpdate: Employee): Promise<Employee | undefined> => {
    return new Promise(async (resolve, reject) => {
        const index = employees.findIndex((e) => e.id === id);
        if (index !== -1) {
            employees[index] = { ...employees[index], ...employeeToUpdate };
            try {
                const data = await writeData(employees);
                employees = data.map(e => employeeSchema.parse(e));
                resolve(employees.find((e) => e.id === id));
            } catch (err) {
                reject(`Failed to update employee: ${err}`);
            }
        }
    });
}

// const findAndDeleteEmployee = (id: number): Promise<void> => {
//     return new Promise(async (resolve, reject) => {
//         employees = employees.filter((e) => e.id !== id);
//         try {
//             const data = await writeData(employees);
//             employees = data.map(e => employeeSchema.parse(e));
//             resolve();
//         } catch (err) {
//             reject(`Failed to delete employee: ${err}`);
//         }
//     });
// }

const findAndDeleteEmployee = async (id: number) => {
    employees = employees.filter((e) => e.id !== id);
    try {
        const data = await writeData(employees);
        employees = data.map(e => employeeSchema.parse(e));
    } catch (err) {
        throw Error(`Failed to delete employee: ${err}`);
    }
}

export const employeeDAO = {
    getEmployees,
    getEmployee,
    createEmployee,
    findAndUpdateEmployee,
    findAndDeleteEmployee
};