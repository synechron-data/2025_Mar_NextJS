"use client"

import Link from 'next/link';
import logo from '../../images/logo.png';
import Image from 'next/image';
import { useEffect } from 'react';

const Navigation = () => {
    useEffect(() => {
        // Bootstarp JS depends on document API, which will be avialable on client browser
        // So we have to load the bootstrap js only on the client side
        // require('bootstrap/dist/js/bootstrap.bundle.min.js');

        import('bootstrap')
        .then(() => {
            // Bootstrap JS successfully loaded
            console.log('Bootstrap JS loaded');
        })
        .catch(err => {
            console.error('Failed to load Bootstrap JS', err);
        });
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link href="/" className="navbar-brand d-flex flex-column align-items-center">
                    <Image src={logo} alt="logo" height={40} width={40} />
                    {/* <img src={logo.src} alt="logo" height="40" width="40" /> */}
                    <span>TECHNIZER INDIA</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item px-3">
                            <Link href='/' className="nav-link d-flex flex-column align-items-center">
                                <i className="bi bi-house-fill"></i>
                                <span>Home</span>
                            </Link>
                        </li>
                        <li className="nav-item px-3">
                            <Link href='/conference' className="nav-link d-flex flex-column align-items-center">
                                <i className="bi bi-people-fill"></i>
                                <span>Conference</span>
                            </Link>
                        </li>
                        <li className="nav-item px-3">
                            <Link href='/settings' className="nav-link d-flex flex-column align-items-center">
                                <i className="bi bi-gear-fill"></i>
                                <span>Settings</span>
                            </Link>
                        </li>
                        <li className="nav-item px-3">
                            <Link href='/counter' className="nav-link d-flex flex-column align-items-center">
                                <i className="bi bi-123"></i>
                                <span>Counter</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;