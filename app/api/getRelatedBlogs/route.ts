import { getRelatedBlogs } from "@/lib/actions/getRelatedBlogs";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams; // Store the params object

    const slug = params.get("slug"); // Use params.get()
    const tagsString = params.get("tags"); // Use params.get()

    if (!slug) {
      return new Response("slug not found", { status: 500 });
    }
    if (!tagsString) {
      return new Response("no tags found", { status: 500 });
    }
    let tagIds: string[] = [];
    if (tagsString) {
      tagIds = tagsString.split(",");
    }
    const relatedBlogs = await getRelatedBlogs(slug, tagIds);

    return new Response(
      JSON.stringify({ status: 200, relatedBlogs: relatedBlogs }),
    );
  } catch (error) {
    console.log(error);
    return new Response("error 500", { status: 500 });
  }
}
