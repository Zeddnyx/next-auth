import { NextResponse } from "next/server";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { configs } from "./configs";

const UNAUTHENTICATED_PATHS = ["/free", "/sign-in"];

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const pathname = request.nextUrl?.pathname;
    const token = request.nextauth.token;

    if (!token && !UNAUTHENTICATED_PATHS.includes(pathname)) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
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
