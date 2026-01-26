"use client";
import Image from "next/image";
import React from "react";
// import sharp from "sharp";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Blog } from "@/drizzle/src/db/schema";
import BlogEngagementDetails from "./blog-engagement-details";


type BlogCardProps={
    blog:Blog
}
export default function BlogCard({ blog }:BlogCardProps) {
  return (
    <article itemScope itemType="https://schema.org/BlogPosting">
      <Link
        // onClick={() => incrementClick(blog.id)}
        href={`/blog/${blog.slug}`}
        className="block"
        itemProp="url"
        aria-label={`Read more about ${blog.title}`}
      >
        <Card className="overflow-hidden">
          <div className="relative h-48">
            <Image
              fill
              src={blog.coverImage || "/images/placeholder.svg"}
              alt={blog.title}
              sizes="100vw" // Important for responsiveness
              priority={blog.coverImage ? true : false} // Prioritize if image exists
              className="object-cover p-1"
              // placeholder="blur" // Add a placeholder
              // blurDataURL={blurDataURL} // Blur data URL
            />
          </div>
          <CardContent className="p-4">
            <h3 className=" font-semibold mb-2">{blog.title}</h3>
            {blog?.description &&  <p className="text-gray-600 text-sm mb-4">
              {blog?.description?.length > 100
                ? `${blog?.description?.substring(0, 100)}...`
                : blog.description}
            </p>}
           
            <BlogEngagementDetails blog={blog}  />
          </CardContent>
        </Card>
      </Link>
    </article>
  );
}
