import { NextResponse } from "next/server";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { configs } from "./configs";

const UNAUTHENTICATED_PATHS = ["/free", "/sign-in", "/sign-up"];

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // get pathaname ssr way:)
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", request.nextUrl.pathname);

    const pathname = request.nextUrl?.pathname;
    const token = request.nextauth.token;

    if (!token && !UNAUTHENTICATED_PATHS.includes(pathname)) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
  {
    secret: configs.NEXTAUTH_SECRET,
    callbacks: {
      authorized: () => {
        // This callback is used by withAuth to determine if the request is authorized
        // We will handle authorization logic directly in the middleware
        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/((?!api|_next|static|.*\\..*).*)"], // Apply to all routes except API, internal, and static files
};
