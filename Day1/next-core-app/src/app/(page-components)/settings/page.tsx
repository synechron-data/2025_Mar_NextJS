import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Settings Page",
  description: "About Synechron Settings"
}

export default function Settings() {
  return (
    <div>
        <h1>Settings Page</h1>
        <h3>This is Server Rendered Page</h3>
    </div>
  );
}
