import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

interface LoadingButtonProps {
    loading: boolean;
    btnColor?: string;
    textColor?: string;
    children: React.ReactNode;
    className?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
    textColor = 'text-white',
    btnColor = 'primary',
    children,
    loading = false,
    className = ''
}) => {
    return (
        <Button
            type="submit"
            variant={btnColor}
            disabled={loading}
            className={`w-100 py-3 fw-semibold rounded-4 shadow-sm d-flex align-items-center justify-content-center gap-2 ${className}`}
            style={{
                transition: 'all 0.3s ease-in-out',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {loading && (
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                />
            )}
            <span className={textColor}>{loading ? 'Please wait...' : children}</span>
        </Button>
    );
};

export default LoadingButton;
