import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAuth } from "./lib/auth";
import { protectedRoutes, publicPaths } from "./lib/constants/protected-routes";
import { RoleEnum } from "./lib/types/user-slice";
import { CustomJwtPayload } from "./lib/types/auth";


export async function middleware(request: NextRequest) {
  // const cookie = await cookies();
  // const { pathname } = request.nextUrl;

  // if (publicPaths.includes(pathname)) {
  //   return NextResponse.next();
  // }

  // const token = cookie.get("token")?.value;
  // const verifiedToken: CustomJwtPayload | null = token
  //   ? await verifyAuth(token)
  //   : null;
  // if (!verifiedToken) {
  //   const response = NextResponse.redirect(new URL("/login", request.url));
  //   response.cookies.delete("token");
  //   return response;
  // }

  // const userRole = (verifiedToken.role.split("_")[1] as RoleEnum) || null;
  // const matchedRoute = protectedRoutes.find((route) =>
  //   pathname.startsWith(route.url)
  // );

  // if (matchedRoute) {
  //   if (!userRole || !matchedRoute.role.includes(userRole)) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
