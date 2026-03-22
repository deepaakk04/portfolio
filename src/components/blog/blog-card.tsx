"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { Clock } from "lucide-react";

interface BlogCardProps {
    post: {
        slug: string;
        metadata: {
            title: string;
            summary: string;
            publishedAt: string;
            image?: string;
            tags?: string[];
            category?: string;
            readingTime: number;
        };
    };
}

export function BlogCard({ post }: BlogCardProps) {
    const readTime = post.metadata.readingTime;

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-4"
        >
            {/* Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted">
                {post.metadata.image ? (
                    <Image
                        src={post.metadata.image}
                        alt={post.metadata.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700/25 via-slate-600/10 to-muted flex items-center justify-center">
                        <span className="text-sm font-bold tracking-widest text-foreground/10 uppercase">[ TIS ]</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="space-y-2.5">
                <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors leading-snug line-clamp-2">
                    {post.metadata.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {post.metadata.summary}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-0.5">
                    {post.metadata.category && (
                        <>
                            <span className="font-semibold text-slate-700 dark:text-slate-400">{post.metadata.category}</span>
                            <span className="text-border">|</span>
                        </>
                    )}
                    <time dateTime={post.metadata.publishedAt}>
                        {formatDate(post.metadata.publishedAt)}
                    </time>
                    <span className="text-border">|</span>
                    <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" />
                        {readTime} min read
                    </span>
                </div>
            </div>
        </Link>
    );
}
