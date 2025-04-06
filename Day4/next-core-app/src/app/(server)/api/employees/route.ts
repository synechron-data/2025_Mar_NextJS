import { employeeSchema } from "@/app/models/employee";
import { employeeDAO } from "../../data-access/employee-data-access";

const handler = (req: Request) => {
    switch (req.method) {
        case "GET":
            return handleGetEmployees();
        case "POST":
            return handlePostEmployee(req);
        default:
            return new Response("Method Not Allowed", { status: 405 });
    }
}

async function handleGetEmployees() {
    try {
        const employees = await employeeDAO.getEmployees();
        return Response.json(employees, { status: 200 });
    } catch (err) {
        return Response.json({ message: 'Failed to get employees', error: err }, { status: 500 });
    }
}

async function handlePostEmployee(req: Request) {
    try {
        const requestData = await req.json();
        const employee = employeeSchema.parse(requestData);
        const insertedEmployee = await employeeDAO.createEmployee(employee);
        return Response.json(insertedEmployee, { status: 200 });
    } catch (err) {
        return Response.json({ message: 'Failed to get employees', error: err }, { status: 500 });
    }
}

export { handler as GET, handler as POST };