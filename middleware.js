import { NextResponse } from "next/server";

// Define protected routes
const protectedRoutes = ["/shop", "/checkout", "/product"];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Check if the request is for a protected route
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    // Not a protected route, allow
    return NextResponse.next();
  }

  // Get token from cookies
  const token = req.cookies.get("token")?.value;

  if (!token) {
    // Not logged in, redirect to login
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Optionally: you can verify JWT here if needed
  // jwt.verify(token, process.env.JWT_SECRET)

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ["/shop", "/checkout", "/product/:path*"],
};
