import Link from 'next/link'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Index Page",
  description: "Index Page for Synechron"
}

export default function Home() {
  // throw new Error("This is a Server Error");
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

      <section className="py-5 border-bottom">
        <div className="container px-5">
          <div className="row g-4">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3 p-4">
                <i className="bi bi-collection"></i>
              </div>
              <h2 className="h4 fw-bold">Responsive Design</h2>
              <p>Looks great on any device, whether it&apos;s a phone, tablet, or desktop.</p>
              <Link href="/responsive" className="text-decoration-none">
                Learn more
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3 p-4">
                <i className="bi bi-building"></i>
              </div>
              <h2 className="h4 fw-bold">Modern Framework</h2>
              <p>Built with Next.js 14, offering server components and improved performance.</p>
              <Link href="/modern" className="text-decoration-none">
                Learn more
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
            <div className="col-lg-4">
              <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3 p-4">
                <i className="bi bi-toggles2"></i>
              </div>
              <h2 className="h4 fw-bold">Easy to Customize</h2>
              <p>Easily customize components with Bootstrap&apos;s extensive utility classes.</p>
              <Link href="/customize" className="text-decoration-none">
                Learn more
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-4 bg-dark text-white">
        <div className="container text-center">
          <p className="mb-0">© 2025 NextBootstrap. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
