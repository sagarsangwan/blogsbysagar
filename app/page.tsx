import { BlogList } from "@/components/blog/blog-list";
import { Hero } from "@/components/Hero";
import { NewsletterSignup } from "@/components/newsletter";
import { db } from "@/drizzle/src/db";
import { blog } from "@/drizzle/src/db/schema";
import type { Blog } from "@/drizzle/src/db/schema";
import { asc, desc } from "drizzle-orm";
import { unstable_cache } from "next/cache";
export default async function Page() {
  const cachedBlogs = unstable_cache(
 async ()=>{return db.select().from(blog).orderBy(desc(blog.reads))},
 ["all-blogs"],
 {
    revalidate: 60 * 10, 
    tags: ["blog"],
  },

  )
  const blogs:Blog[] = await cachedBlogs()
return (
    <main className="min-h-screen bg-background">
      <Hero />
      <div className="container max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <BlogList blogs={blogs} />
      </div>
      <NewsletterSignup />
    </main>
  );

}