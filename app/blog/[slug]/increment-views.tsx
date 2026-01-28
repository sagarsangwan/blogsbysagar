"use client";
import { useEffect } from "react";

type IncrementViewPropes={
    slug:string
    blogId:string
}

export default function IncrementView({ slug, blogId }:IncrementViewPropes) {
  useEffect(() => {
    const setViewedCookie = async () => {
      try {
        // Set the viewed cookie and increment views
        await fetch("/api/set-viewed-cookie", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });

        // Set localStorage to mark as viewed so we don't repeat the action
        localStorage.setItem(`viewed-${slug}`, "true");

        // Increment the view count
        await fetch(`/api/increment-views`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ blogId }),
        });
      } catch (error) {
        console.error("Error during the view increment:", error);
      }
    };

    // Run the function to set cookie and increment views
    setViewedCookie();
  }, [slug, blogId]);

  return null; // This component does not need to render anything
}
