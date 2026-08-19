import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "@core/config/i18n";
import { createMiddlewareClient } from "@core/lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

const PUBLIC_EXCLUDE_PATHS = ["/api", "/_next", "/favicon.ico", "/robots.txt", "/sitemap.xml"];

function isExcludedPath(pathname: string): boolean {
  return PUBLIC_EXCLUDE_PATHS.some((path) => pathname.startsWith(path));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isExcludedPath(pathname)) {
    return NextResponse.next();
  }

  const intlResponse = intlMiddleware(request);
  const response = intlResponse ?? NextResponse.next({ request });

  const { supabase } = createMiddlewareClient(request, response);
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
