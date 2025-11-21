import { NextResponse } from "next/server";

// Customer-protected routes
const protectedRoutes = ["/shop", "/checkout", "/product"];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // ---------------------------
  // 1. Admin routes protection
  // ---------------------------
  if (pathname.startsWith("/admin")) {
    // Allow login page and API routes
    if (
      pathname.startsWith("/admin/login") ||
      pathname.startsWith("/api/admin")
    ) {
      return NextResponse.next();
    }

    // Check admin cookie
    const adminCookie = req.cookies.get("admin")?.value;
    if (adminCookie !== "true") {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // ---------------------------
  // 2. Customer routes protection
  // ---------------------------
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    // Optional: verify JWT here
    // jwt.verify(token, process.env.JWT_SECRET)
  }

  // ---------------------------
  // 3. Allow all other routes
  // ---------------------------
  return NextResponse.next();
}

// Apply middleware to admin and customer routes
export const config = {
  matcher: [
    "/admin/:path*",
    "/shop",
    "/checkout",
    "/product/:path*",
  ],
};
