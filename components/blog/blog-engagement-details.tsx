
"use client";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Link as LinkIcon,
  Check,
  Twitter,
  Facebook,
  Linkedin,
  Edit,
  Share2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useCallback } from "react"; // useCallback added for memoization
import { toast } from "sonner";
// import Link from "next/link";
import NextLink from "next/link";
import React from "react";
import { Blog } from "@/drizzle/src/db/schema";


type BlogEngagementDetailsType={
    blog:Blog
}


const BlogEngagementDetails = React.memo(function BlogEngagementDetails({
  blog,
}:BlogEngagementDetailsType) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://sagarsangwan.vercel.app/blogs/${blog.slug}`;

  const handleCopyLink = useCallback(async () => {
    console.log("handleCopyLink function started"); // ADD THIS LINE

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Blog URL Copied");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
      toast.error("Failed to copy link.");
    }
    console.log("handleCopyLink function finished"); // ADD THIS LINE
  }, [shareUrl]);
  return (
    <div className="w-full border-t border-b p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5" aria-label="Reads" />{" "}
          {/* Added aria-label for reads icon */}
          <span className="text-sm font-medium">{blog.reads}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
       
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Share Blog">
              {" "}
              {/* Aria-label for share dropdown trigger */}
              <Share2 className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {" "}
            {/* align="end" for better dropdown positioning */}
            <DropdownMenuItem onClick={handleCopyLink}>
              <Button variant="ghost" size="icon" aria-label="Copy link">
                {copied ? <Check className="text-green-500" /> : <LinkIcon />}
              </Button>
              {copied ? "Link Copied!" : "Copy Link"}
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  shareUrl,
                )}&text=${encodeURIComponent(blog.title)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon" aria-label="Share on X">
                  <Twitter />
                </Button>
                Share on X
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Share on Facebook"
                >
                  <Facebook />
                </Button>
                Share on Facebook
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  shareUrl,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin />
                </Button>
                Share on LinkedIn
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
});

BlogEngagementDetails.displayName = "BlogEngagementDetails";

export default BlogEngagementDetails;
