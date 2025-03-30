import { Metadata } from "next";
import styles from './conference.module.css';

export const metadata:Metadata = {
  title: "Conference Page",
  description: "About Synechron Conference"
}

export default function Conference() {
  return (
    <div>
        <h1>Conference Page</h1>
        <h3 className={styles.test}>This is Server Rendered Page</h3>
    </div>
  );
}
