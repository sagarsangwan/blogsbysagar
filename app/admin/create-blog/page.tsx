import React from "react";
// import { BlogFrom } from "@/components/blog/BlogForm";
// import prisma from "@/lib/prisma";
import { blogTag } from "@/drizzle/src/db/schema";
import { db } from "@/drizzle/src/db";
export default async function page() {
  const tagsFromDb = await db.select().from(blogTag)
  return (
    <div>
      {/* <BlogFrom tagsFromDb={tagsFromDb} /> */}
    </div>
  );
}
