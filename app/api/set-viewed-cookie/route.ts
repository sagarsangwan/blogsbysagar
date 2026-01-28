
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request:NextRequest) {
  //   const data = await request.json();
  const { slug } = await request.json();
  const cookieStore = await cookies();
    
  cookieStore.set(`viewed-${slug}`, "true", { maxAge: 60 * 60 * 24 * 365, path:"/", httpOnly:true, secure:process.env.NODE_ENV === "production" }); // Store cookie for a year
  return  NextResponse.json({message:"Cookie set"}, { status: 200 });
}
