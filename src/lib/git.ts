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

        // 1. Stage all changes
        await execAsync('git add .', contentDir);

        // 2. Check if there is actually anything new to commit
        const { stdout: statusOut } = await execAsync('git status --porcelain', contentDir);
        if (!statusOut.trim()) {
            console.log("Nothing to commit — skipping.");
            return { success: true };
        }

        // 3. Commit
        await execAsync(`git commit -m "content: ${message}"`, contentDir);

        // 4. Push
        if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
            console.log("Using Authenticated Push via ENV...");
            const remoteUrl = `https://${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPO}.git`;
            
            try {
                // Try to push first
                await execAsync(`git push ${remoteUrl} main`, contentDir);
            } catch (pushErr) {
                console.log("Push rejected, attempting to pull with rebase...");
                // If rejected, fetch and rebase, then push again
                await execAsync(`git pull --rebase ${remoteUrl} main`, contentDir);
                await execAsync(`git push ${remoteUrl} main`, contentDir);
            }
        } else {
            console.log("Using system credentials for push...");
            try {
                await execAsync('git push', contentDir);
            } catch (pushErr) {
                console.log("Push rejected, attempting to pull with rebase...");
                await execAsync('git pull --rebase', contentDir);
                await execAsync('git push', contentDir);
            }
        }

        console.log("Git Sync Complete!");

        // 5. Trigger Deployment Rebuild logic if Hook is provided (Vercel or Netlify)
        const deployHook = process.env.DEPLOY_HOOK || process.env.NETLIFY_BUILD_HOOK;
        
        if (deployHook) {
            console.log("Triggering deployment rebuild...");
            try {
                const response = await fetch(deployHook, { method: "POST" });
                if (response.ok) {
                    console.log("Deployment rebuild triggered successfully.");
                } else {
                    console.error("Failed to trigger deployment rebuild:", response.statusText);
                }
            } catch (hookErr: any) {
                console.error("Error triggering deployment rebuild:", hookErr.message);
            }
        }

        return { success: true };
    } catch (error: any) {
        console.error("Git Sync Failed:", error);

        // Treat "nothing to commit" as a success
        if (error.stdout && error.stdout.includes('nothing to commit')) {
            return { success: true };
        }

        return { success: false, error: error.message };
    }
}
