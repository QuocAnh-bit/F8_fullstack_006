import { NextRequest, NextResponse } from "next/server";
import { getProfile } from "./utils/serviceApi/dataApi";
import { getSession } from "./utils/getSession";

export default async function middleware(req) {
  const res = NextResponse.next();
  //   const sessionCookie = Cookies.get("session");
  const user = getSession(req);
  // Lấy ppathName
  const pathName = req.nextUrl.pathname;

  if (!user && pathName == "/") {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/"],
};
