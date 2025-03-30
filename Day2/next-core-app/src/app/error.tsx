'use client'

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="container d-flex flex-column align-items-center vh-100 mt-5">
            <div className="card text-center shadow-lg border-0" style={{ maxWidth: "500px" }}>
                <div className="card-header bg-danger text-white">
                    <i className="bi bi-exclamation-triangle-fill fs-1 my-3"></i>
                </div>
                <div className="card-body p-5">
                    <h2 className="card-title mb-3">Oops!</h2>
                    <p className="card-text lead mb-4">
                        Something went wrong while processing your request.
                    </p>
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button 
                            className="btn btn-danger btn-lg"
                            onClick={() => reset()}
                        >
                            <i className="bi bi-arrow-clockwise me-2"></i>
                            Try Again
                        </button>
                    </div>
                </div>
                <div className="card-footer text-muted py-3">
                    <small>
                        Error reference: {error.digest ? `#${error.digest.substring(0, 6)}` : 'Unknown'}
                    </small>
                </div>
            </div>
        </div>
    );
}