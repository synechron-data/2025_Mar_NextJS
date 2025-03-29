import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Conference Page",
  description: "About Synechron Conference"
}

export default function Conference() {
  return (
    <div>
        <h1>Conference Page</h1>
        <h3>This is Server Rendered Page</h3>
    </div>
  );
}
