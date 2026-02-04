import { MetadataRoute } from "next";
import { db } from "@/drizzle/src/db";
import { blog } from "@/drizzle/src/db/schema";

const BASE_URL = "https://blogs.sagarsangwan.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await db
    .select({
      slug: blog.slug,
      updatedAt: blog.updatedAt,
    })
    .from(blog);

  const blogUrls = blogs.map((b) => ({
    url: `${BASE_URL}/blog/${b.slug}`,
    lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...blogUrls,
  ];
}
