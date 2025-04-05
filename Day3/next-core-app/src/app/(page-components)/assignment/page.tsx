// import CrudRootComponent from "@/app/_components/assignment/component-composition/crud-root";
// import CrudRootComponent from "@/app/_components/assignment/using-hook-form/crud-root";
import CrudRootComponent from "@/app/_components/assignment/using-hook-form-zod/crud-root";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Assignment Page",
  description: "CRUD Assignment Solution"
}

export default function About() {
  return (
    <main className="mt-3 container">
        <h1 className="text-center text-primary">Welcome to Employee Management</h1>
        <CrudRootComponent />
    </main>
  );
}
