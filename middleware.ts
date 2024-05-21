import { type NextRequest } from "next/server";
import {  NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "@/utils/supabase/server";

export async function middleware(request: NextRequest) {

  const supabase = createClient();
  // Get the user data from the Supabase authentication API
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Define the URLs for different routes
  const loginUrl = new URL("/login", request.url);
  const registerUrl = new URL("/register", request.url);
  const homeUrl = new URL("/", request.url);
  const userUrl = new URL("/user", request.url);
  const adminUrl = new URL("/admin", request.url);

  // If the user is not logged in
  if (!user) {
    // If the request is not for login or register, redirect to login
    if (request.nextUrl.pathname !== "/login" && request.nextUrl.pathname !== "/register") {
      return NextResponse.redirect(loginUrl);
    }
  } else {
    // Get the user profile from the Supabase database
    
    const { data: users } = await supabase
    .from("users")
    .select("*")
    .eq("id", user!.id);

    console.log("profile", users);
    console.log("user", user);

    if (users && users.length > 0) {
      // If the user is logged in and an admin, and the current path is /login or /register, redirect to /admin
      if (users[0].isAdmin) {
        if (
          request.nextUrl.pathname === "/login" ||
          request.nextUrl.pathname === "/register" ||
          !request.nextUrl.pathname.startsWith("/admin") 
        ) {
          return NextResponse.redirect(adminUrl);
        }
      } else {
        // If the user is logged in and not an admin, redirect appropriately
        if (
          request.nextUrl.pathname === "/login" ||
          request.nextUrl.pathname === "/register" ||
          request.nextUrl.pathname.startsWith("/admin")
        ) {
          return NextResponse.redirect(userUrl);
        }
      }
    }
  }

  // If none of the conditions are met, proceed to the next middleware
  return NextResponse.next();






}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
