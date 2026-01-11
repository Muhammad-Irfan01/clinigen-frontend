// import { NextRequest, NextResponse } from "next/server";


// export default function middleware (request: NextRequest) {
//     const token  = request.cookies.get('accessToken')?.value;

//     if(request.nextUrl.pathname.startsWith('/cart') && !token) {
//         return NextResponse.redirect(new URL("/login", request.url));
//     }
// }


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthPage = pathname.startsWith("/signin") || pathname.startsWith("/signup");
  const isProtectedPage =
    pathname.startsWith("/cart") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/dashboard");

  // Not logged in → block protected pages
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Logged in → block auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/profile/:path*",
    "/dashboard/:path*",
    "/signin",
    "/signup",
  ],
};
