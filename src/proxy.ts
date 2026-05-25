import { auth } from "@/lib/auth/auth";
import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";

// Public routes that do NOT require authentication
const publicRoutes = [
  "/login",
  "/register",
  "/api/auth", // Better Auth API must always be public
];

export async function proxy(req: NextRequest) {
  // get pathname from request URL
  const { nextUrl } = req;

  console.log("Middleware running for:", nextUrl.pathname);

  // Get session from Better Auth
  const session = await auth.api.getSession({ headers: await headers() });

  // Allow all API auth routes
  if (nextUrl.pathname.startsWith("/api/auth")) {
    console.log("API auth route accessed, allowing:", nextUrl.pathname);
    return NextResponse.next();
  }

  // Check if route is public
  const isPublic = publicRoutes.some(
    (route) => nextUrl.pathname === "/" || nextUrl.pathname.startsWith(route),
  );

  // If route is public → allow
  if (isPublic) {
    // If user is logged in and tries to access login/register → redirect to dashboard
    if (
      session &&
      (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")
    ) {
      console.log(
        "User is already logged in, redirecting to dashboard from proxy middleware",
      );
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    console.log("Public route accessed, allowing:", nextUrl.pathname);
    return NextResponse.next();
  }

  // If route is protected and user is NOT logged in → redirect to login
  if (!session) {
    console.log("No session found, redirecting to login from proxy middleware");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("Protected route accessed, allowing:", nextUrl.pathname);
  return NextResponse.next();
}

// Match all routes except static files
export const config = {
  matcher: [
    // "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$).*)",
    "/dashboard/:path*",
  ],
};
