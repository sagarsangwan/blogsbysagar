"use client";
import { Blog } from "@/drizzle/src/db/schema";
import BlogCard from "./blog-card";
import React, { useEffect, useState } from "react";
type RelatedBlogParams={
  blogSlug:string
  tagIds:string[]
}
function RelatedBlogs({ blogSlug, tagIds }:RelatedBlogParams) {
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchRelatedBlogs() {
      try {
        const response = await fetch(
          `/api/getRelatedBlogs?slug=${blogSlug}&tags=${tagIds.join(",")}`,
        );
        const data = await response.json();
        setRelatedBlogs(data["relatedBlogs"]);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRelatedBlogs();
  }, [blogSlug, tagIds]);
  if (!tagIds) {
    return;
  }
  if (loading)
    return (
      <p className="text-center text-gray-500">Loading related blogs...</p>
    );
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default RelatedBlogs;
