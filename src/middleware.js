import { NextResponse } from "next/server";

export function middleware(request) {
  const authToken = request.cookies.get("auth-token");
  const isLoginPage = request.nextUrl.pathname.startsWith("/login");

  if (!authToken && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (authToken && authToken.value === "authenticated" && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.css|.*\\.js|.*\\.woff|.*\\.woff2).*)",
  ],
};
