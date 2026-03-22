"use client";

import { useState } from "react";
import { BlogCard } from "./blog-card";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPostsProps {
    posts: Array<{
        slug: string;
        metadata: any;
    }>;
}

export function BlogPosts({ posts }: BlogPostsProps) {
    const [search, setSearch] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Extract all unique tags
    const allTags = Array.from(
        new Set(
            posts.flatMap((post) => post.metadata.tags || [])
        )
    ).sort();

    // Filter posts
    const filteredPosts = posts.filter((post) => {
        const matchesSearch = post.metadata.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
            post.metadata.summary.toLowerCase().includes(search.toLowerCase());

        const matchesTag = selectedTag
            ? post.metadata.tags?.includes(selectedTag)
            : true;

        return matchesSearch && matchesTag;
    });

    return (
        <div className="space-y-10">
            {/* ── Category Tabs + Search (like JetBrains) ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                {/* Category Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-1">
                    <button
                        onClick={() => setSelectedTag(null)}
                        className={cn(
                            "px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all",
                            selectedTag === null
                                ? "bg-foreground text-background"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                    >
                        All
                    </button>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                            className={cn(
                                "px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all",
                                selectedTag === tag
                                    ? "bg-foreground text-background"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            )}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative group shrink-0 w-full md:w-56">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-muted/50 border border-border rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all placeholder:text-muted-foreground"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* ── Posts Grid (4 columns like JetBrains/Oracle) ── */}
            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredPosts.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 text-muted-foreground">
                    <p className="text-lg font-medium">No articles found</p>
                    <button
                        onClick={() => { setSearch(""); setSelectedTag(null) }}
                        className="text-primary hover:text-primary/80 font-semibold mt-3 text-sm transition-colors"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}
