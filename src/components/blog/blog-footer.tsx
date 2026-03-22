"use client";

import Link from "next/link";
import { DATA } from "@/data/resume";
import { Github, Linkedin } from "lucide-react";

export function BlogFooter() {
    return (
        <footer className="border-t border-border/40 bg-muted/30 mt-auto">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left: Logo */}
                <Link
                    href="/blog"
                    className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                >
                    <span className="font-bold text-lg tracking-tight text-foreground/40">[</span>
                    <span className="font-extrabold text-[11px] tracking-[0.1em] text-foreground/60 whitespace-nowrap">THE INTELLIGENCE STACK</span>
                    <span className="font-bold text-lg tracking-tight text-foreground/40">]</span>
                </Link>

                {/* Center: Copyright */}
                <p className="text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} {DATA.name}. All rights reserved.
                </p>

                {/* Right: Social */}
                <div className="flex items-center gap-4 text-muted-foreground">
                    {DATA.contact.social.GitHub && (
                        <Link href={DATA.contact.social.GitHub.url} target="_blank" className="hover:text-foreground transition-colors">
                            <Github className="size-4" />
                        </Link>
                    )}
                    {DATA.contact.social.LinkedIn && (
                        <Link href={DATA.contact.social.LinkedIn.url} target="_blank" className="hover:text-foreground transition-colors">
                            <Linkedin className="size-4" />
                        </Link>
                    )}
                    <Link href="https://www.reddit.com/" target="_blank" className="hover:text-foreground transition-colors">
                        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.344 6.315 3.516 8.484A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.86 13.48c.04.272.06.547.06.824 0 4.201-4.89 7.612-10.92 7.612S-2.92 18.505-2.92 14.304c0-.277.02-.552.06-.824a1.89 1.89 0 01-.74-1.5c0-1.046.849-1.895 1.895-1.895.489 0 .935.186 1.27.49 1.872-1.348 4.456-2.22 7.33-2.316l1.244-5.856a.393.393 0 01.467-.303l4.136.879a1.34 1.34 0 012.506.632c0 .74-.6 1.34-1.34 1.34a1.34 1.34 0 01-1.281-.96l-3.68-.783-1.11 5.222c2.838.104 5.385.975 7.233 2.308a1.886 1.886 0 011.27-.49c1.046 0 1.895.849 1.895 1.895 0 .6-.28 1.134-.72 1.48zM8.08 13.48a1.34 1.34 0 100 2.68 1.34 1.34 0 000-2.68zm7.84 0a1.34 1.34 0 100 2.68 1.34 1.34 0 000-2.68zm-7.58 4.48c-.16-.16-.16-.42 0-.58.16-.16.42-.16.58 0 .972.972 2.848 1.04 3.08 1.04s2.108-.076 3.08-1.04a.41.41 0 01.58 0c.16.16.16.42 0 .58-1.22 1.22-3.56 1.32-3.66 1.32s-2.44-.1-3.66-1.32z"/></svg>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
