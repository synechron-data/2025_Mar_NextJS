import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Hello Page",
  description: "About Synechron"
}

export default function Hello() {
  return (
    <div>
        <h1>Hello Page</h1>
        <h3>This is Server Rendered Page</h3>
    </div>
  );
}
