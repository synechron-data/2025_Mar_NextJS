import { Metadata } from "next";
import styles from './conference.module.css';
import CounterAssignment from "@/app/_components/counter/counter-assignment";

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
