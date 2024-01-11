import { NextRequest, NextResponse } from "next/server";
import {
  withMiddlewareAuthRequired,
  getSession,
} from "@auth0/nextjs-auth0/edge";
import { notFound, redirect } from "next/navigation";
import { getMindMap } from "./utils/api/dataApi";

export default async function middleware(req) {
  const res = NextResponse.next();
  // Lấy ppathName
  const pathName = req.nextUrl.pathname;

  const user = await getSession(req, res);
  if (!user && pathName == "/mindmap") {
    return NextResponse.redirect(new URL("/api/auth/login", req.url));
  }

  if (pathName.startsWith("/mindmap/")) {
    const checkId = pathName.split("/").pop();
    const data = await getMindMap(checkId);
    if (data) {
      if (data && data.mode === "private") {
        if (user == null) {
          return NextResponse.redirect(new URL("/api/auth/login", req.url));
        } else if (user.user.sub !== data.userID) {
          return NextResponse.redirect(new URL("/not-found", req.url));
        }
      }
    } else {
      return NextResponse.redirect(new URL("/not-found", req.url));
    }
  }
  return res;
}

export const config = {
  matcher: ["/", "/mindmap/:path*"],
};
