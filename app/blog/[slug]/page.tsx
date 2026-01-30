
  import BlogEngagementDetails from '@/components/blog/blog-engagement-details';
  import BlogTags from '@/components/blog/blog-tags';
  import { NewsletterSignup } from '@/components/newsletter';
  import IncrementView from './increment-views';
  import { cookies } from 'next/headers';
  import Link from 'next/link';
  import RelatedBlogs from '@/components/blog/related-blog';
  import AuthorProfile from '@/components/blog/author-profile';
  // import type { Metadata, OpenGraphArticle } from "next";

  import type { Metadata } from "next";
  import Script from 'next/script';
  import { GetBlogWithTag } from '@/lib/actions/getBlogWithTag';

  export async function generateMetadata(
    { params }: { params: Promise<Params> }
  ): Promise<Metadata> {
    const { slug } = await params;
    const blog = await GetBlogWithTag(slug);

    if (!blog) {
      return {
        title: "Blog Not Found",
        description: "This blog post does not exist.",
        robots: { index: false, follow: false },
      };
    }

    const blogUrl = `https://blogs.sagarsangwan.dev/blog/${blog.slug}`;

    const publishedTime = blog.createdAt
      ? new Date(blog.createdAt).toISOString()
      : undefined;

    const modifiedTime = blog.updatedAt
      ? new Date(blog.updatedAt).toISOString()
      : undefined;

    return {
      title: blog.title,
      description: blog.description ?? blog.title,

      alternates: {
        canonical: blogUrl,
      },

      openGraph: {
        type: "article",
        url: blogUrl,
        title: blog.title,
        description: blog.description ?? blog.title,
        siteName: "Sagar Sangwan’s Blog",

        images: blog.coverImage
          ? [
              {
                url: blog.coverImage,
                width: 1200,
                height: 630,
                alt: blog.title,
              },
            ]
          : undefined,

        publishedTime,
        modifiedTime,
        authors: ["Sagar Sangwan"],
        tags: blog.tags.map((t) => t.name),
      },

      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.description ?? blog.title,
        creator: "@iamsagarsangwan",
        images: blog.coverImage ? [blog.coverImage] : undefined,
      },

      robots: {
        index: true,
        follow: true,
      },
    } satisfies Metadata;
  }

  interface Params {
    slug: string;
  }


  async function checkIfViewed(slug:string){
    const cookieStore  = await cookies()
    return cookieStore.get(`viewed-${slug}`)?true:false
  }






  export default async function BlogPage(
    { params }: { params: Promise<Params> }
  ) {
    const { slug } = await params;
    const currentBlog = await GetBlogWithTag(slug)
          // console.log(currentBlog?.content)
    if (!currentBlog) {
      return(<div>not found </div>)
    }
    const hasViewed = await checkIfViewed(currentBlog.slug)
    console.log(hasViewed)
      const blogUrl = `https://blogs.sagarsangwan.dev/blog/${currentBlog.slug}`;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: currentBlog.title,
      description: currentBlog.description,
      image: currentBlog.coverImage,
      datePublished: currentBlog.createdAt,
      dateModified: currentBlog.updatedAt,
      author: {
        "@type": "Person",
        name: "Sagar Sangwan",
        url: "https://www.sagarsangwan.dev",
      },
      publisher: {
        "@type": "Person",
        name: "Sagar Sangwan",
        url: "https://www.sagarsangwan.dev",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": blogUrl,
      },
      keywords: currentBlog.tags.map((t) => t.name).join(", "),
    };
    return (<>
    <Script id={`jsonld-blog-${currentBlog.slug}`} type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}/>
      <div className="mt-4 flex flex-col md:justify-center md:items-center md:content-center gap-4">
        <h1 className="text-4xl font-bold my-3">{currentBlog.title}</h1>
        <BlogEngagementDetails blog={currentBlog}  />

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: currentBlog.content }}
        ></div>
        

        

        {currentBlog.tags.length > 0 && <BlogTags blogTags={currentBlog.tags} />}
        <AuthorProfile />

        <div>
          {currentBlog.tags.length > 0 && (
            <>
              <p className="text-xl text-violet-400 my-4">
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
    </>
    );
  }
