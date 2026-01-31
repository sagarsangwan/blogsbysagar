// proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth"; // We'll keep the same lib/auth logic

export async function proxy(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  // Protect the /admin route
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Verify the JWT
      await decrypt(session);
      return NextResponse.next();
    } catch (error) {
      // If token is invalid or expired
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Ensure the proxy only runs on admin routes to keep the site fast
export const config = {
  matcher: ["/admin/:path*"],
};
