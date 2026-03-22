import { NextRequest, NextResponse } from "next/server";
import { createPost, type PostMetadata } from "@/lib/admin/file-operations";

export async function POST(request: NextRequest) {
    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    try {
        const body = await request.json();
        const { slug, metadata, content } = body as {
            slug: string;
            metadata: PostMetadata;
            content: string;
        };

        await createPost(slug, metadata, content);

        // Auto-Push to GitHub
        let gitWarning = null;
        try {
            const { syncWithGithub } = await import('@/lib/git');
            const result = await syncWithGithub(`create post ${slug}`);
            if (!result.success) {
                gitWarning = result.error;
            }
        } catch (e: any) {
            gitWarning = e.message;
        }

        return NextResponse.json({ success: true, gitWarning });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}
