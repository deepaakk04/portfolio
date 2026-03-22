"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

const CATEGORIES = [
    { label: "Data Engineering & Architecture", href: "/blog?tag=data-engineering" },
    { label: "Technology & Consulting", href: "/blog?tag=technology" },
    { label: "Product Development & GenAI", href: "/blog?tag=product" },
];

export function BlogHeader() {
    return (
        <header className="sticky top-0 z-50 w-full">
            {/* ── DARK TOP BAR ── */}
            <div className="w-full bg-slate-900 text-white">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 h-12 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/blog"
                        className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                        aria-label="The Intelligence Stack Blog"
                    >
                        <span className="font-bold text-lg tracking-tight opacity-50">[</span>
                        <span className="font-extrabold text-[13px] tracking-[0.12em] mt-px whitespace-nowrap">THE INTELLIGENCE STACK</span>
                        <span className="font-bold text-lg tracking-tight opacity-50">]</span>
                    </Link>

                    {/* Right Actions */}
                    <div className="flex items-center gap-5">
                        <Link
                            href="/"
                            className="text-xs font-medium text-white/60 hover:text-white transition-colors hidden sm:block"
                        >
                            About the Author
                        </Link>
                        <ModeToggle />
                    </div>
                </div>
            </div>

            {/* ── CATEGORY SUB-NAV ── */}
            <div className="w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 h-14 flex items-center gap-8 overflow-x-auto scrollbar-hide">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.label}
                            href={cat.href}
                            className="text-[12px] font-semibold tracking-wider text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white uppercase whitespace-nowrap transition-colors relative after:absolute after:-bottom-[17px] after:left-0 after:w-full after:h-[2px] after:bg-slate-900 dark:after:bg-white after:opacity-0 hover:after:opacity-100 after:transition-opacity"
                        >
                            {cat.label}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}
