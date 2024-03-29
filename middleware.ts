import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export const config = {
  matcher: ["/((?!login|favicon.ico|_next|admin(?!\\/)).*)"],
};

export async function middleware(req: NextRequest) {
  const res: NextResponse = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  const { data } = await supabase.auth.getSession();

  if (!data?.session) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  } else {
    return res;
  }
}
