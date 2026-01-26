import { BlogList } from "@/components/blog/blog-list";
import { Hero } from "@/components/Hero";
import { NewsletterSignup } from "@/components/newsletter";
import { db } from "@/drizzle/src/db";
import { blog } from "@/drizzle/src/db/schema";
import type { Blog } from "@/drizzle/src/db/schema";

export default async function Page() {
  const blogs:Blog[] = await db.select().from(blog)
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