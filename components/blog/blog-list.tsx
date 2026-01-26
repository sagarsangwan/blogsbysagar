"use client"
import { Blog } from '@/drizzle/src/db/schema';
import BlogCard from './blog-card';


type BlogListProps={
    blogs: Blog[]
}

export function BlogList({blogs}:BlogListProps) {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No blog posts published yet</p>
      </div>
    );
  }

  return (
    <div
      className=" mx-auto  py-8"
      itemScope
      itemType="https://schema.org/Blog"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-0 md:px-3">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      {/* <Newsletter /> */}
    </div>
  );
}
