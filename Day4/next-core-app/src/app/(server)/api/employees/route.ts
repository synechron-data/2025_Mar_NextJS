import { employeeDAO } from "../../data-access/employee-data-access";

const handler = (req: Request) => {
    switch (req.method) {
        case "GET":
            return handleGetEmployees();
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

export { handler as GET };