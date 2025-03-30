import { Metadata } from "next";
// import CounterAssignment from "@/app/_components/counter/counter-assignment";
// import CounterAssignment from "@/app/_components/counter/counter-assignment-fn";
// import CounterAssignment from "@/app/_components/counter/counter-assignment-fn-o";
// import CounterAssignment from "@/app/_components/counter/counter-assignment-reducer";
// import CounterAssignment from "@/app/_components/counter/counter-assignment-context";
import CounterAssignment from "@/app/_components/counter/counter-assignment-forward-ref";

export const metadata:Metadata = {
  title: "Counter Page",
  description: "About Counter Assignment"
}

export default function Counter() {
  return (
    <div>
        <CounterAssignment />
    </div>
  );
}
