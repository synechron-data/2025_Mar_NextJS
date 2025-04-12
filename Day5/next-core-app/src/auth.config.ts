import { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login'
    },
    providers: [],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            console.log(nextUrl.pathname);
            return !!auth;
        }
    }
} satisfies NextAuthConfig;

// 1. Protect Specific Routes
// authorized({ auth, request: { nextUrl } }) {
//     const protectedPaths = ['/dashboard', '/settings'];
//     const isProtected = protectedPaths.includes(nextUrl.pathname);
//     return !isProtected || !!auth;
//   }

// 2. Role-Based Access Control (RBAC)
// authorized({ auth, request: { nextUrl } }) {
//     const adminOnlyRoutes = ['/admin', '/settings'];
//     const isAdminRoute = adminOnlyRoutes.includes(nextUrl.pathname);
//     const isAdmin = auth?.user?.role === 'admin';
//     return isAdminRoute ? isAdmin : true;
//   }