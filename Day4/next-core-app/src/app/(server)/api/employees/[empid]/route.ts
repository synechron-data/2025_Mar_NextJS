import { employeeDAO } from "@/app/(server)/data-access/employee-data-access";
import { employeeSchema } from "@/app/models/employee";

const handler = (req: Request, { params }: { params: { empid: string } }) => {
    switch (req.method) {
        case "GET":
            return handleGetEmployee(req, params.empid);
        case "PUT":
            return handlePutEmployee(req, params.empid);
        case "DELETE":
            return handleDeleteEmployee(req, params.empid);
        default:
            return new Response("Method Not Allowed", { status: 405 });
    }
}

async function handleGetEmployee(req: Request, empid: string) {
    try {
        const id = parseInt(empid);
        if (isNaN(id)) {
            return Response.json({ message: 'Invalid Employee Id' }, { status: 400 });
        }

        const employee = await employeeDAO.getEmployee(id);
        return Response.json(employee, { status: 200 });
    } catch (err) {
        return Response.json({ message: 'Failed to get employee', error: err }, { status: 500 });
    }
}

async function handlePutEmployee(req: Request, empid: string) {
    try {
        const id = parseInt(empid);

        if (isNaN(id)) {
            return Response.json({ message: 'Invalid Employee Id' }, { status: 400 });
        }

        const data = await req.json();

        if (id !== parseInt(data.id)) {
            return Response.json({ message: 'Employee Id mismatch' }, { status: 400 });
        }

        const employee = employeeSchema.parse(data);
        const updatedEmployee = await employeeDAO.findAndUpdateEmployee(id, employee);
        return Response.json(updatedEmployee, { status: 200 });
    } catch (err) {
        return Response.json({ message: 'Failed to update employee', error: err }, { status: 500 });
    }
}

async function handleDeleteEmployee(req: Request, empid: string) {
    try {
        const id = parseInt(empid);
        if (isNaN(id)) {
            return Response.json({ message: 'Invalid Employee Id' }, { status: 400 });
        }

        await employeeDAO.findAndDeleteEmployee(id);
        return new Response(null, { status: 204 });
    } catch (err) {
        return Response.json({ message: 'Failed to delete employee', error: err }, { status: 500 });
    }
}

export { handler as GET, handler as PUT, handler as DELETE };