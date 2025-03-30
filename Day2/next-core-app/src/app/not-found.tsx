'use client'

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="card text-center shadow-lg border-0" style={{ maxWidth: "500px" }}>
                <div className="card-header bg-primary text-white">
                    <i className="bi bi-question-circle-fill fs-1 my-3"></i>
                </div>
                <div className="card-body p-5">
                    <h1 className="display-1 fw-bold mb-3">404</h1>
                    <h2 className="card-title mb-3">Page Not Found</h2>
                    <p className="card-text lead mb-4">
                        The page you are looking for does not exist or has been moved.
                    </p>
                    <div className="d-flex gap-3 justify-content-center">
                        <Link href="/" className="btn btn-primary btn-lg">
                            <i className="bi bi-house-door-fill me-2"></i>
                            Go Home
                        </Link>
                        <button 
                            className="btn btn-outline-secondary btn-lg"
                            onClick={() => window.history.back()}
                        >
                            <i className="bi bi-arrow-left me-2"></i>
                            Go Back
                        </button>
                    </div>
                </div>
                <div className="card-footer text-muted py-3">
                    <small>
                        If you believe this is an error, please contact support.
                    </small>
                </div>
            </div>
        </div>
    );
}