import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });

    if (token) {
    if (
        request.nextUrl.pathname === "/login" ||
        request.nextUrl.pathname === "/register"
    ) {
        return NextResponse.redirect(new URL("/", request.url));
    } else {
        return NextResponse.next();
      // hna b2olo ro7 llmkan aly 3mlt 3leh req tol ma al token mwgoad aw b true
    }
    } else {
    if (
        request.nextUrl.pathname === "/cart" ||
        request.nextUrl.pathname === "/wishlist"|| request.nextUrl.pathname === "/update-logged-user-data"
        ||request.nextUrl.pathname === "/changepassword"
    ) {
        return NextResponse.redirect(new URL("/login", request.url));
      // (`اول ايلس لو في حالة في توكن وعاوز اروح علي لوج ان تاني ايلس بتاعه الاف الكبيرة لو مفيش توكن
      //     وعاوز اروح علي الكارت وديني علي لوج ان`)
    } else {
      return NextResponse.next(); // hna b2olo lw ktbt ay 7aga 8er alsharten dol wadi 3la req aly katbo
    }
    }
}
export const config = {
    matcher: ["/cart", "/wishlist", "/login", "/register","/update-logged-user-data","/changepassword"],
};




// -----------------------------------------------------------------------
// hna b2olo amta tshagal al middleware

// export async  function middleware (request:NextRequest){
//     const token =await getToken({req:request})

//     if(token){
//         return NextResponse.next()
//         // hna b2olo ro7 llmkan aly 3mlt 3leh req tol ma al token mwgoad aw b true
//     }
//     else{
//         return NextResponse.redirect(new URL('/login',request.url))
//     }
// }
// export const config = {
//   matcher: ['/cart','/wishlist'],
// }
// -----------------------------------------------------------------------------