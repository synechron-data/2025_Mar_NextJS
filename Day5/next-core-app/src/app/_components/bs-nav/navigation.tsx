import Link from 'next/link';
import logo from '../../images/logo.png';
import Image from 'next/image';
import { auth, signOut } from '@/auth';
import BootstrapClientWrapper from './bootstrap-client-wrapper';

const Navigation = async () => {
    const session = await auth();

    return (
        <>
            <BootstrapClientWrapper />
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
                            {
                                [
                                    { href: '/', icon: 'house-fill', label: 'Home' },
                                    { href: '/conference', icon: 'people-fill', label: 'Conference' },
                                    { href: '/settings', icon: 'gear-fill', label: 'Settings' },
                                    { href: '/counter', icon: '123', label: 'Counter' },
                                    { href: '/assignment', icon: 'file-earmark', label: 'Assignment' },
                                    { href: '/chat', icon: 'chat-dots', label: 'Chat' },
                                ].map((item) => (
                                    <li key={item.href} className="nav-item px-3">
                                        <Link href={item.href} className="nav-link d-flex flex-column align-items-center">
                                            <i className={`bi bi-${item.icon}`}></i>
                                            <span>{item.label}</span>
                                        </Link>
                                    </li>
                                ))
                            }
                            {
                                session ? (
                                    <form action={async () => {
                                        'use server'
                                        await signOut({ redirectTo: '/' })
                                    }}>
                                        <li className="nav-item px-3">
                                            <button type="submit" className="nav-link d-flex flex-column align-items-center">
                                                <i className="bi bi-box-arrow-right"></i>
                                                <span>Logout</span>
                                            </button>
                                        </li>
                                    </form>
                                ) : (
                                    <li className="nav-item px-3">
                                        <Link href='/login' className="nav-link d-flex flex-column align-items-center">
                                            <i className="bi bi-box-arrow-in-left"></i>
                                            <span>Login</span>
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;