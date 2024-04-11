import { NextRequest, NextResponse } from "next/server"

export async function middleware(request:NextRequest) {
    try {

        const isPublicPage = request.nextUrl.pathname === '/login' || 
                             request.nextUrl.pathname === '/register' || 
                             request.nextUrl.pathname === '/forgotpass' || 
                             request.nextUrl.pathname === '/reset-password' || 
                             request.nextUrl.pathname === '/maintenance' || 
                             request.nextUrl.pathname === '/coming-soon' ||
                             request.nextUrl.pathname === '/twostep'
        
        // if there is no token and the page is not public , redirect to login        
        const token = request.cookies.get('token')?.value
        // const token = false

        // console.log(token, isPublicPage)

        // if there is no token and the page is not public , redirect to login  
        if(!token && !isPublicPage){
            return NextResponse.redirect(new URL('/login', request.nextUrl))
        }

        // if there is token and the page is public, redirect to home page
        if(token && isPublicPage){
            return NextResponse.redirect(new URL('/backend/dashboard', request.nextUrl))
        }

        return NextResponse.next()

    }
    catch (error) {
        console.error("Error: ", error)
        return NextResponse.error()
    }
}

export const config = {
    matcher: [
        "/login",
        "/register",
        "/forgotpass",
        "/reset-password",
        "/maintenance",
        "/coming-soon",
        "/twostep",
        "/backend/:path*",
    ]
}