import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import { publicPaths, protectedRoutes } from "./lib/constants/protected-routes";
import { RoleEnum } from "./lib/types/user-slice";

// Authenticated middleware wrapper
export default auth(async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isAuthenticated = !!request.auth;
  const authenticatedRole = request.auth?.user.role as RoleEnum 

  // 1. Allow public routes
  if (publicPaths.includes(pathname)) {
    // If user is logged in and tries to access login/register, redirect to dashboard
    if (isAuthenticated && ["/login", "/register"].includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // 2. Protected routes
  const matchedRoute = protectedRoutes.find(({ url }) => url === pathname);

  if (isAuthenticated) {
    if (matchedRoute) {
      // Check if user has the correct role
      if (matchedRoute.role.includes(authenticatedRole!)) {
        return NextResponse.next();
      } else {
        // Authenticated but unauthorized
        const errorMessage = encodeURIComponent(
          "You don't have permission to access this page"
        );
        return NextResponse.redirect(
          new URL(`/unauthorized?error=${errorMessage}`, request.url)
        );
      }
    } else {
      // If no specific match, allow access (optional — can be restricted if you prefer)
      return NextResponse.next();
    }
  }

  // 3. User is not authenticated
  return NextResponse.redirect(new URL("/login", request.url));
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
