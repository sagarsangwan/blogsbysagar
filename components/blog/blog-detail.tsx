'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Share2, Twitter, Linkedin, Facebook, MessageCircle } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  published: boolean;
  publishedAt: string | null;
  reads: number;
  createdAt: string;
}

interface BlogDetailProps {
  blog: Blog;
}

export function BlogDetail({ blog }: BlogDetailProps) {
  useEffect(() => {
    // Track view count
    fetch(`/api/blog/${blog.slug}/read`, { method: 'POST' }).catch(console.error);
  }, [blog.slug]);

  const estimateReadTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const readTime = estimateReadTime(blog.content);
  const publishedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(blog.title);

  return (
    <article className="py-8 sm:py-16">
      <div className="container max-w-3xl mx-auto px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 w-fit">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <header className="mb-8 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {publishedDate && <time dateTime={blog.publishedAt || ''}>{publishedDate}</time>}
            <span>•</span>
            <span>{readTime} min read</span>
            <span>•</span>
            <span>{blog.reads} views</span>
          </div>

          {blog.excerpt && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {blog.excerpt}
            </p>
          )}
        </header>

        {blog.coverImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={blog.coverImage || "/placeholder.svg"}
              alt={blog.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <Card className="p-6 sm:p-8 mb-8">
          <div className="prose prose-sm sm:prose max-w-none dark:prose-invert whitespace-pre-wrap break-words text-foreground">
            {blog.content}
          </div>
        </Card>

        <Separator className="my-8" />

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-4">Share this post</h3>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="outline" size="sm">
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="outline" size="sm">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="outline" size="sm">
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
              </a>

              <a
                href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>

          <div className="bg-muted p-6 sm:p-8 rounded-lg">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground text-lg">About the Author</h3>
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Sagar Sangwan</p>
                  <p className="text-sm text-muted-foreground">
                    Full-stack developer passionate about building beautiful, performant web applications. Interested in React, Next.js, and modern JavaScript.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
