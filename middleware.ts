import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin-constants";
import { LOCALE_HEADER, splitLocalePath } from "@/lib/locale-routing";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = process.env.ADMIN_TOKEN;
    const cookieVal = request.cookies.get(ADMIN_COOKIE)?.value;
    if (!token || cookieVal !== token) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  // The root layout needs the locale but cannot read route params, so pass it
  // along as a request header. Deliberately no Accept-Language redirect:
  // Googlebot crawls from the US with `Accept-Language: en`, and bouncing it
  // off /ko and /ja would leave them unindexed — the bug this change fixes.
  const { locale } = splitLocalePath(pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // Everything except Next internals and files with an extension, so the
  // locale header is present on every rendered page.
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
