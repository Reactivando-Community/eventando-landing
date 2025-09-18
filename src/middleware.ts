import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Handle CORS for hubcommunity-manager.8020digital.com.br
  const allowedOrigin = "https://hubcommunity-manager.8020digital.com.br";
  const origin = request.headers.get("origin");

  // Check if the request is from the allowed domain
  if (origin === allowedOrigin) {
    const response = NextResponse.next();

    // Set CORS headers
    response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Max-Age", "86400"); // 24 hours

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: response.headers,
      });
    }

    return response;
  }

  // For other origins, continue without CORS headers
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
