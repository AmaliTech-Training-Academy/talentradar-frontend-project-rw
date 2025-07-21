import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAuth } from "./lib/auth";
import { protectedRoutes } from "./lib/constants/protected-routes";
import { RoleEnum } from "./lib/types/user-slice";

const publicPaths = ["/", "/login", "/register", "/unauthorized"];

export async function middleware(request: NextRequest) {
  const cookie = await cookies()
  const { pathname } = request.nextUrl;

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const token = cookie.get("token")?.value;
  const verifiedToken = token ? await verifyAuth(token) : null;

  if (!verifiedToken) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }

  const userRole = (verifiedToken.role as RoleEnum) || null;

  const matchedRoute = protectedRoutes.find((route) =>
    pathname.startsWith(route.url)
  );

  if (matchedRoute) {
    if (!userRole || !matchedRoute.role.includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
