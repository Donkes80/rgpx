import { NextResponse } from "next/server";

export function middleware(req) {
  const ip =
    req.ip ||
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for");

  const url = req.nextUrl.pathname;
  const method = req.method;

  console.log(`[ACCESS] ${ip} - ${method} ${url}`);

  return NextResponse.next();
}
