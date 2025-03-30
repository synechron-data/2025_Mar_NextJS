const handler = (req: Request) => {
    switch (req.method) {
        case 'GET':
            return handleGetEmployees();
        default:
            return new Response("Method Not Allowed", { status: 405 });
    }
}

function handleGetEmployees() {
    return Response.json([], { status: 200 });
}

export { handler as GET };