'use client'

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <li className="nav-item px-3">
            <button
                type="button"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="nav-link d-flex flex-column align-items-center">
                <i className="bi bi-box-arrow-right"></i>
                <span>Logout</span>
            </button>
        </li>
    );
}
