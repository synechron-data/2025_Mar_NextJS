import { Employee } from '@/app/models/employee';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'app', '(server)', 'data', 'employees.json');

export const readData = (): Promise<Array<Employee>> => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(`Error reading file: ${err}`);
            } else {
                try {
                    const employees: Employee[] = JSON.parse(data);
                    resolve(employees);
                } catch (err) {
                    reject(`Error parsing JSON: ${err}`);
                }
            }
        });
    });
}

export const writeData = (data: Array<Employee>): Promise<Array<Employee>> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), 'utf-8', (err) => {
            if (err) {
                reject(`Error writing file: ${err}`);
            } else {
                readData().then(resolve).catch(reject);
            }
        });
    });
}