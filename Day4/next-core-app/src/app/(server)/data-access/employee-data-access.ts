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

export const employeeDAO = {
    getEmployees,
    createEmployee
};