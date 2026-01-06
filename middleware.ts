import { NextRequest, NextResponse } from "next/server";


export default function middleware (request: NextRequest) {
    const token  = request.cookies.get('token')?.value;

    if(request.nextUrl.pathname.startsWith('/cart') && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}