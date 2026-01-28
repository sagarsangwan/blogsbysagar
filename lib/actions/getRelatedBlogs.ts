
import { db } from '@/drizzle/src/db';
import { blog, blogTag, RelatedBlog,  tag } from '@/drizzle/src/db/schema';
import { and, desc, eq, inArray, ne } from 'drizzle-orm';

export async function getRelatedBlogs(
  slug: string,
  tagIds: string[]
): Promise<RelatedBlog[]> {
  const rows = await db
    .select({
      blog: blog,
      tagName: tag.name,
    })
    .from(blog)
    .innerJoin(blogTag, eq(blog.id, blogTag.blogId))
    .innerJoin(tag, eq(blogTag.tagId, tag.id))
    .where(
      and(
        inArray(blogTag.tagId, tagIds),
        ne(blog.slug, slug)
      )
    )
    .orderBy(desc(blog.createdAt))
    .limit(3);
    const map = new Map<string, RelatedBlog>();

  for (const row of rows) {
    const b = row.blog;

    if (!map.has(b.id)) {
      map.set(b.id, {
        id: b.id,
        title: b.title,
        slug: b.slug,
        description: b.description,
        coverImage: b.coverImage,
        createdAt: b.createdAt,
        updatedAt: b.updatedAt,
        likes: b.likes,
        reads: b.reads,
        tags: [],
      });
    }

    if (row.tagName) {
      map.get(b.id)!.tags.push({ name: row.tagName });
    }
  }

  return Array.from(map.values());
  }