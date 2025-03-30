import { Metadata } from "next";
import styles from './conference.module.css';
// import CounterAssignment from "@/app/_components/counter/counter-assignment";
// import CounterAssignment from "@/app/_components/counter/counter-assignment-fn";
// import CounterAssignment from "@/app/_components/counter/counter-assignment-fn-o";
import CounterAssignment from "@/app/_components/counter/counter-assignment-reducer";

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
