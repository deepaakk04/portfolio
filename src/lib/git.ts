import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = (command: string, cwd: string = process.cwd()) => {
    return promisify(exec)(command, { cwd });
};

export async function syncWithGithub(message: string): Promise<{ success: boolean; error?: string }> {
    try {
        console.log("Starting Git Sync...");
        const contentDir = path.join(process.cwd(), 'content');

        // 1. Add all changes in content directory
        await execAsync('git add .', contentDir);

        // 2. Commit
        await execAsync(`git commit -m "content: ${message}"`, contentDir);

        // 3. Push
        // If GITHUB_TOKEN and GITHUB_REPO are present, use them for explicitly authenticated push
        if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
            console.log("Using Authenticated Push via ENV...");
            const remoteUrl = `https://${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPO}.git`;
            await execAsync(`git push ${remoteUrl}`, contentDir);
        } else {
            // Fallback to default configured credentials (SSH/HTTPS)
            console.log("Using system credentials for push...");
            await execAsync('git push', contentDir);
        }

        console.log("Git Sync Complete!");
        return { success: true };
    } catch (error: any) {
        console.error("Git Sync Failed:", error);

        // If nothing to commit, that's fine
        if (error.stdout && error.stdout.includes('nothing to commit')) {
            return { success: true };
        }

        return { success: false, error: error.message };
    }
}
