import { getBlogPosts, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  let post = await getPost(params.slug);

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const readTime = post.metadata.readingTime;

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${DATA.url}${post.metadata.image}`
              : `${DATA.url}/og?title=${post.metadata.title}`,
            url: `${DATA.url}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />

      {/* ── HERO SECTION ── */}
      <div className="relative w-full bg-foreground overflow-hidden">
        {/* Background image or gradient */}
        {post.metadata.image ? (
          <img
            src={post.metadata.image}
            alt={post.metadata.title}
            className="absolute inset-0 size-full object-cover opacity-30"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-600/30 via-foreground to-foreground" />
        )}

        {/* Content */}
        <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-background/60 hover:text-background transition-colors text-sm font-medium mb-8"
          >
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {post.metadata.category && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.15em] uppercase bg-slate-700 text-white px-3 py-1 rounded-sm">
                <Tag className="size-3" />
                {post.metadata.category}
              </span>
            )}
            <div className="flex items-center gap-3 text-sm text-background/60">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                {formatDate(post.metadata.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {readTime} min read
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-background tracking-tight leading-[1.1] max-w-4xl">
            {post.metadata.title}
          </h1>

          {/* Summary */}
          {post.metadata.summary && (
            <p className="text-background/60 text-lg md:text-xl mt-6 max-w-2xl leading-relaxed">
              {post.metadata.summary}
            </p>
          )}

          {/* Author */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-background/10">
            <div className="size-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-sm">
              {DATA.initials}
            </div>
            <div>
              <p className="text-background font-semibold text-sm">{DATA.name}</p>
              <p className="text-background/50 text-xs">Author</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── ARTICLE CONTENT ── */}
      <div className="w-full max-w-3xl mx-auto px-6 md:px-10 py-14 md:py-20">


        <article
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-slate-700 dark:prose-a:text-slate-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-md prose-blockquote:border-l-slate-600 prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-[#1e1e2e] prose-pre:border prose-pre:border-border/50"
          dangerouslySetInnerHTML={{ __html: post.source }}
        ></article>

        {/* Tags */}
        {post.metadata.tags && post.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-14 pt-8 border-t border-border/40">
            {post.metadata.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs font-medium tracking-wide uppercase text-muted-foreground bg-muted px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-14 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold text-foreground">Enjoyed this article?</p>
            <p className="text-sm text-muted-foreground mt-1">Check out more posts on the blog.</p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-foreground/90 transition-colors"
          >
            <ArrowLeft className="size-4" />
            All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
