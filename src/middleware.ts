import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n/locales";

/**
 * Two jobs:
 *  1. Redirect the unprefixed root ("/") to the default locale ("/de").
 *  2. Stamp the resolved locale onto a request header so the true root
 *     layout (app/layout.tsx) can server-render the correct <html lang/dir>
 *     without a client-side correction script — it sits ABOVE the
 *     `[locale]` segment in the route tree, so it can't read that param
 *     directly (Next.js layouts only receive params for their own segment
 *     and ancestors, not descendants). Reading a header set here is the
 *     real-server equivalent of what el-haj-international's static export
 *     had to solve client-side.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));
  }

  const [, maybeLocale] = pathname.split("/");
  const locale = isLocale(maybeLocale) ? maybeLocale : DEFAULT_LOCALE;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
