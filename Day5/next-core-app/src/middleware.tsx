// import { NextRequest, NextResponse } from "next/server";

// // This function can also be async
// export default function testMiddleware(req: NextRequest) {
//     console.log('Url: ', req.url);
//     console.log('This is a Test Middleware');
//     return NextResponse.next();
// }

// // --------------------------------------------

// import { NextRequest, NextResponse } from "next/server";

// // This function can also be async
// export function middleware(req: NextRequest) {
//     console.log('Url: ', req.url);
//     console.log('This is a Test Middleware');
//     return NextResponse.next();
// }

// ----------------------------------------------- Matcher

// import { NextRequest, NextResponse } from "next/server";

// // This function can also be async
// export function middleware(req: NextRequest) {
//     console.log('Url: ', req.url);
//     console.log('This is a Test Middleware');
//     return NextResponse.next();
// }

// // export const config = {
// //     matcher: '/counter'
// // }

// // export const config = {
// //     matcher: ['/counter', '/chat']
// // }

// // export const config = {
// //     matcher: ['/counter/:path*', '/chat/:path*']
// // }

// // export const config = {
// //     matcher: [
// //         '/((?!api|_next/static|_next/image|favicon.ico).*)'
// //     ]
// // }

// export const config = {
//     matcher: [
//         {
//             source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
//             has: [{ type: 'header', key: 'x-my-key' }],
//             missing: [{ type: 'header', key: 'x-test-key' }]
//         }
//     ]
// }

// ---------------------------------------------- Auth
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico, icon.png).*)'
    ]
}