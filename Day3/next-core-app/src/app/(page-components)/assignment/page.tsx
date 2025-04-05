// // import CrudRootComponent from "@/app/_components/assignment/component-composition/crud-root";
// // import CrudRootComponent from "@/app/_components/assignment/using-hook-form/crud-root";
// // import CrudRootComponent from "@/app/_components/assignment/using-hook-form-zod/crud-root";
// import CrudRootComponent from "@/app/_components/assignment/using-hook-form-zod-api/crud-root";

// import { Metadata } from "next";

// export const metadata:Metadata = {
//   title: "Assignment Page",
//   description: "CRUD Assignment Solution"
// }

// export default function About() {
//   return (
//     <main className="mt-3 container">
//         <h1 className="text-center text-primary">Welcome to Employee Management</h1>
//         <CrudRootComponent />
//     </main>
//   );
// }


// ------------------------------------------------------ For SSR

import CrudRootComponent from "@/app/_components/assignment/using-hook-form-zod-api-ssr/crud-root";
import { fetchEmployeesSSR } from "@/app/api-clients/employee-service-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assignment Page",
  description: "CRUD Assignment Solution"
}

export default async function Assignment() {
  const employees = await fetchEmployeesSSR();

  return (
    <main className="mt-3 container">
      <h1 className="text-center text-primary">Welcome to Employee Management</h1>
      <CrudRootComponent data={employees} />
    </main>
  );
}
