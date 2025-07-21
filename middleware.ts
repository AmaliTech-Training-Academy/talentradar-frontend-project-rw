import { NextRequest, NextResponse } from 'next/server'


export default async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const authHeader = request.headers.get('Authorization');
    
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (token) {
        url.pathname = '/dashboard';
        return Response.redirect(url);
        }
    }
    
    url.pathname = '/login';
    return Response.redirect(url);
    }
