import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE } from "@/lib/i18n/locales";

/** Redirects the unprefixed root ("/") to the default locale ("/de"). */
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
