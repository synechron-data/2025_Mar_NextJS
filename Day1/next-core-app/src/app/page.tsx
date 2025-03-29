import Link from 'next/link'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Index Page",
  description: "Index Page for Synechron"
}

export default function Home() {
  return (
    <>
      <header className="bg-light py-5">
        <div className="container px-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-8">
              <div className="text-center my-5">
                <h1 className="display-4 fw-bold">Welcome to Next.js with Bootstrap</h1>
                <p className="lead mb-4">A beautifully designed landing page template using Next.js 14 and Bootstrap 5</p>
                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                  <Link href="/get-started" className="btn btn-primary btn-lg px-4 me-sm-3">Get Started</Link>
                  <Link href="/learn-more" className="btn btn-outline-secondary btn-lg px-4">Learn More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
