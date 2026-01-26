
import { db } from '@/drizzle/src/db';
import { blog, blogTag, BlogWithTag, Tag, tag } from '@/drizzle/src/db/schema';
import { eq } from 'drizzle-orm';
import BlogEngagementDetails from '@/components/blog/blog-engagement-details';
import BlogTags from '@/components/blog/blog-tags';

interface Params {
  slug: string;
}

// async function getBlog(slug: string) {
//   try {
//     const result = await sql`
//       SELECT * FROM "Blog"
//       WHERE slug = ${slug} AND published = true
//     `;
//     return result.length > 0 ? result[0] : null;
//   } catch (error) {
//     console.error('[v0] Blog fetch error:', error);
//     return null;
//   }
// }

// export async function generateMetadata(
//   { params }: { params: Promise<Params> }
// ): Promise<Metadata> {
//   const { slug } = await params;
//   const blog = await getBlog(slug);

//   if (!blog) {
//     return {
//       title: 'Post Not Found',
//       description: 'The blog post you are looking for does not exist.',
//     };
//   }

//   return {
//     title: `${blog.title} | blog.sagarsangwan.dev`,
//     description: blog.excerpt || blog.title,
//     openGraph: {
//       title: blog.title,
//       description: blog.excerpt || blog.title,
//       type: 'article',
//       publishedTime: blog.publishedAt,
//       images: blog.coverImage ? [blog.coverImage] : [],
//       authors: ['Sagar Sangwan'],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: blog.title,
//       description: blog.excerpt || blog.title,
//       images: blog.coverImage ? [blog.coverImage] : [],
//     },
//   };
// }

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
    console.log(currentBlog)
  if (!currentBlog) {
    return(<div>not found </div>)
  }

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

      {/* <div>
        {currentBlog?.[0].tags.length > 0 && (
          <>
            <p className="text-xl text-green-400 my-4">
              <Link href="/blogs"> View more blogs by me CLICK HERE</Link>
            </p>
            <RelatedBlogs
              blogSlug={currentBlog?.[0].slug}
              tagIds={currentBlog?.[0].tags.map((tag) => tag.tagId)}
            />
          </>
        )}
      </div> */}

      {/* <Newsletter />
      {!hasViewed && <ClientSideLogic slug={params.slug} blogId={blog.id} />} */}
    </div>
  );
}
