import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Index Page",
  description: "Index Page for Synechron"
}

export default function Home() {
  return (
    <div>
        <h1>Index Page</h1>
        <h3>This is Server Rendered Page</h3>
    </div>
  );
}
