const handler = (req: Request) => {
    switch (req.method) {
        case "GET":
            return Response.json({ message: "Employee API working" }, { status: 200 });
        default:
            return new Response("Method Not Allowed", { status: 405 });
    }
}

export { handler as GET };