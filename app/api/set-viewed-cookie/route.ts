import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/src/db";
import { blog } from "@/drizzle/src/db/schema";
import { eq, sql } from "drizzle-orm";
export async function POST(request: NextRequest) {
  //   const data = await request.json();
  const { slug } = await request.json();
  const cookieStore = await cookies();
  try {
    await db
      .update(blog)
      .set({ reads: sql`${blog.reads}+1` })
      .where(eq(blog.slug, slug));
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err }, { status: 500 });
  }

  cookieStore.set(`viewed-${slug}`, "true", {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  }); // Store cookie for a year
  return NextResponse.json({ message: "Cookie set" }, { status: 200 });
}
