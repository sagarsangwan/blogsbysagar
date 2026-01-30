import { db } from "@/drizzle/src/db";
import { blog, blogTag, Tag, tag } from "@/drizzle/src/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const GetBlogWithTag = unstable_cache(
  async (slug: string) => {
    const rows = await db
      .select({
        blog,
        tag,
      })
      .from(blog)
      .leftJoin(blogTag, eq(blog.id, blogTag.blogId))
      .leftJoin(tag, eq(blogTag.tagId, tag.id))
      .where(eq(blog.slug, slug));

    if (rows.length === 0) return null;

    const blogData = rows[0].blog;
    const tags = rows.map((r) => r.tag).filter((t): t is Tag => t !== null);

    return {
      ...blogData,
      tags,
    };
  },

  // ✅ STATIC cache key parts
  ["blog-with-tags"],

  {
    revalidate: 60 * 60, // 10 minutes
    tags: ["blog"],
  },
);
