import { Metadata } from "next";

export const metadata:Metadata = {
  title: "About Page",
  description: "About Synechron"
}

export default function About() {
  return (
    <div>
        <h1>About Page</h1>
        <h3>This is Server Rendered Page</h3>
    </div>
  );
}
