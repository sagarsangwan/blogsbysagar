import React from "react";
import { Badge } from "../ui/badge";
import { Tag } from "@/drizzle/src/db/schema";


type BlogTagsType={
    blogTags:Tag[]
}
function BlogTags({ blogTags }:BlogTagsType) {
  return (
    <div className="flex gap-3">
      {blogTags.map((tag) => (
        <Badge className="p-2" key={tag.id} variant="outline">
          {tag.name}
        </Badge>
      ))}
    </div>
  );
}

export default BlogTags;
