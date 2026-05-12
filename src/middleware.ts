import { auth } from "@/lib/auth/better-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that do NOT require authentication
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/api/auth", // Better Auth API must always be public
];

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  // Allow all API auth routes
  if (nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Check if route is public
  const isPublic = publicRoutes.some((route) =>
    nextUrl.pathname.startsWith(route),
  );

  // Get session from Better Auth
  const session = await auth.api.getSession({ headers: req.headers });

  // If route is public → allow
  if (isPublic) {
    // If user is logged in and tries to access login/register → redirect to dashboard
    if (
      session &&
      (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // If route is protected and user is NOT logged in → redirect to login
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Otherwise allow
  return NextResponse.next();
}

// Match all routes except static files
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$).*)",
  ],
};
