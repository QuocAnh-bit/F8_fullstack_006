import { NextResponse } from "next/server";

export const middleware = (request) => {
  return NextResponse.redirect(new URL("/", request.url));
};
export const config = {
  matcher: ["/admin/:path*", "/orders/:path*"],
};

/**
 - nextRequest - > lay dc tu http request ( method, header, body , url)
 - nextResponse - > tra ve ca thong yo (redirect, header, response message)

 */
