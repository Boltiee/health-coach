# Deployment Guide

## Step 1: Initialize Git Repository and Commit Files

If you haven't already initialized git, run these commands:

```bash
cd "/Users/lucbo/workspaces/Health Coach"

# Initialize git repository (skip if already done)
git init

# Add all files to staging
git add .

# Create initial commit with all project files
git commit -m "Initial commit: Health Coach app with InstantDB integration"
```

**What gets committed:**
- All source code (`app/`, `components/`, `lib/`)
- Configuration files (`package.json`, `next.config.ts`, `tsconfig.json`, etc.)
- Documentation (`README.md`, `DEPLOYMENT.md`, `QUICKSTART.md`)
- Public assets (`manifest.json`, icon placeholders)

**Note:** `node_modules/` is automatically excluded via `.gitignore`.

## Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name it something like `health-coach` or `fitness-tracker`
3. **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Copy the remote URL (e.g., `https://github.com/yourusername/health-coach.git`)

## Step 3: Push to GitHub

Run these commands in your terminal:

```bash
cd "/Users/lucbo/workspaces/Health Coach"

# Add GitHub remote
git remote add origin YOUR_GITHUB_URL

# Ensure you're on main branch
git branch -M main

# Push all commits to GitHub
git push -u origin main
```

Replace `YOUR_GITHUB_URL` with the URL from Step 2.

After running these commands, all your code will be on GitHub!

## Step 4: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Visit [vercel.com](https://vercel.com) and sign in (or create account)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

5. Add environment variable:
   - Key: `NEXT_PUBLIC_INSTANT_APP_ID`
   - Value: `c188bc46-8a0e-4d3d-88ab-7f7871ef925b`

6. Click "Deploy"

### Option B: Deploy via Vercel CLI

```bash
npm install -g vercel
cd "/Users/lucbo/workspaces/Health Coach"
vercel
```

Follow the prompts and add the environment variable when prompted.

## Step 5: Add PWA Icons (Optional but Recommended)

The app currently has placeholder icons. To make your PWA look professional:

1. Create or find a logo/icon for your app
2. Use a tool to generate PWA icons:
   - [Favicon Generator](https://www.favicon-generator.org/)
   - [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator)
3. Replace these files in `/public/`:
   - `icon-192.png` (192x192 pixels)
   - `icon-512.png` (512x512 pixels)
4. Commit and push:
```bash
git add public/icon-*.png
git commit -m "Add PWA icons"
git push
```

Vercel will automatically redeploy.

## Step 6: First Use

1. Visit your deployed URL (e.g., `https://health-coach.vercel.app`)
2. Sign in with your email
3. You'll receive a 6-digit code in your email
4. Set up a PIN (optional, for quick access)
5. **Important**: Visit `/seed` to populate the database with sample data
6. Start using the app!

## Troubleshooting

### Build Fails on Vercel

- Check the build logs for specific errors
- Ensure all dependencies are in `package.json`
- Verify environment variable is set correctly

### Authentication Not Working

- Verify your InstantDB App ID is correct in environment variables
- Check InstantDB dashboard for any API issues
- Make sure email sending is enabled in InstantDB settings

### PWA Not Installing

- Serve over HTTPS (Vercel does this automatically)
- Ensure manifest.json is accessible at `/manifest.json`
- Add actual PNG icons (not placeholder text files)
- Check browser console for PWA installation errors

## Updating the App

After making changes locally:

```bash
git add .
git commit -m "Description of changes"
git push
```

Vercel will automatically rebuild and deploy your changes.

## Local Development

To run locally:

```bash
npm run dev
```

Visit http://localhost:3000

## Custom Domain (Optional)

In Vercel dashboard:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

