import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Zones réservées : le tunnel de devis reste public, c'est la porte
// d'entrée commerciale — le bloquer derrière un compte tuerait la conversion.
const protectedRoutes = {
  client: ["/compte"],
  gestion: ["/gestion"],
  admin: ["/admin"],
};

const authRoutes = ["/compte/connexion", "/compte/inscription"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  // Skip auth check for API routes, static files, and auth pages
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return response;
  }

  // Check auth for protected routes (placeholder — implement with Auth.js)
  const sessionCookie = request.cookies.get("authjs.session-token");

  const isProtected = Object.values(protectedRoutes)
    .flat()
    .some((route) => pathname.startsWith(route));

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !sessionCookie) {
    const url = new URL("/compte/connexion", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL("/compte", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|og).*)"],
};
