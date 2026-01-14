// import { NextResponse, NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("token")?.value;
//   const url = request.nextUrl.clone();

//   if (!token) {
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };
import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
 
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  const token = request.cookies.get("next-auth.session-token")?.value || request.cookies.get("__Secure-next-auth.session-token")?.value;
  const url = request.nextUrl.clone();


  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
 
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};