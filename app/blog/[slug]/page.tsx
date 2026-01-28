
import { db } from '@/drizzle/src/db';
import { blog, blogTag, BlogWithTag, Tag, tag } from '@/drizzle/src/db/schema';
import { eq  } from 'drizzle-orm';
import BlogEngagementDetails from '@/components/blog/blog-engagement-details';
import BlogTags from '@/components/blog/blog-tags';
import { NewsletterSignup } from '@/components/newsletter';
import IncrementView from './increment-views';
import { cookies } from 'next/headers';
import Link from 'next/link';
import RelatedBlogs from '@/components/blog/related-blog';

interface Params {
  slug: string;
}


async function checkIfViewed(slug:string){
  const cookieStore  = await cookies()
  return cookieStore.get(`viewed-${slug}`)?true:false
}




export async function GetBlogWithTag(slug:string):Promise<BlogWithTag|null>{
const rows = await db.select({
  blog:blog,
  tag:tag
}).from(blog).leftJoin(blogTag, eq(blog.id, blogTag.blogId))
.leftJoin(tag, eq(blogTag.tagId, tag.id))
.where(eq(blog.slug, slug))
if (rows.length === 0) return null;

const blogData = rows[0].blog;
const tags= rows.map((r)=>r.tag).filter((t):t is Tag=>t!==null)
return{
  ...blogData,
  tags
}
}

export default async function BlogPage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const currentBlog = await GetBlogWithTag(slug)
      
  if (!currentBlog) {
    return(<div>not found </div>)
  }
  const hasViewed = await checkIfViewed(currentBlog.slug)

  return (
    <div className="mt-4 flex flex-col md:justify-center md:items-center md:content-center gap-4">
      <h1 className="text-4xl font-bold my-3">{currentBlog.title}</h1>
      <BlogEngagementDetails blog={currentBlog}  />

      <div
        className="prose-headings:font-title font-default prose mt-4 dark:prose-invert focus:outline-none justify-center content-center"
        dangerouslySetInnerHTML={{ __html: currentBlog.content }}
      ></div>

      {currentBlog.tags.length > 0 && <BlogTags blogTags={currentBlog.tags} />}
      {/* <AuthorProfile author={currentBlog?.[0].author} /> */}

      <div>
        {currentBlog.tags.length > 0 && (
          <>
            <p className="text-xl text-green-400 my-4">
              <Link href="/blogs"> View more blogs by me CLICK HERE</Link>
            </p>
            <RelatedBlogs
              blogSlug={currentBlog.slug}
              tagIds={currentBlog.tags.map((tag) => tag.id)}
            />
          </>
        )}
      </div>

      <NewsletterSignup />
      {!hasViewed && <IncrementView slug={currentBlog.slug} blogId={currentBlog.id} />}
    </div>
  );
}
