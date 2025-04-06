import { Employee, employeeSchema } from "@/app/models/employee";
import { readData } from "../utilities/file-handler";

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

export const employeeDAO = {
    getEmployees
};