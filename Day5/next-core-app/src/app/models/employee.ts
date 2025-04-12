import { z } from 'zod';

export const employeeSchema = z.object({
    id: z.coerce.number().nonnegative().int(),
    name: z.string().min(1, { message: 'Employee Name is required' }),
    designation: z.string().min(1, { message: 'Designation is required' }),
    salary: z.coerce.number({ message: 'Salary must be a number' })
        .positive({ message: "Salary must be greater than zero" })
        .nonnegative({ message: 'Salary must be a positive number' })
});

export type Employee = z.infer<typeof employeeSchema>;