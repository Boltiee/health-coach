# Quick Start Guide 🚀

## ✅ What's Done

Your Health Coach app is ready! Here's what's been set up:

- ✅ Next.js 14 with TypeScript and Tailwind CSS
- ✅ InstantDB integration with your API key
- ✅ Authentication (Email Magic Link + PIN)
- ✅ Dashboard with Today's view
- ✅ Meal planning and tracking
- ✅ Workout planning and logging
- ✅ PWA configuration (manifest.json)
- ✅ Git repository initialized
- ✅ **GitHub repo created**: https://github.com/Boltiee/health-coach

## 🎯 Next Steps

### 1. Test Locally (Already Running!)

Your dev server is running at:
- **Local**: http://localhost:3000
- **Network**: http://192.168.0.5:3000

Try it now:
1. Open http://localhost:3000
2. Sign in with your email
3. You'll receive a 6-digit code
4. Set up a PIN (optional)
5. Visit http://localhost:3000/seed to load sample data
6. Start exploring!

### 2. Deploy to Vercel

**Option A: Web Dashboard (Easiest)**

1. Go to https://vercel.com
2. Sign in (or create account with GitHub)
3. Click "Add New Project"
4. Select "Boltiee/health-coach" from your repos
5. Add environment variable:
   - **Name**: `NEXT_PUBLIC_INSTANT_APP_ID`
   - **Value**: `c188bc46-8a0e-4d3d-88ab-7f7871ef925b`
6. Click "Deploy"
7. Done! You'll get a URL like: `https://health-coach-xxx.vercel.app`

**Option B: CLI (Advanced)**

```bash
npm install -g vercel
cd "/Users/lucbo/workspaces/Health Coach"
vercel --prod
```

When prompted, add the environment variable.

### 3. Add PWA Icons (Optional)

Currently using placeholders. For a professional look:

1. Create/find a logo (512x512px recommended)
2. Use https://www.pwabuilder.com/imageGenerator
3. Download the icons
4. Replace files in `/public/`:
   - `icon-192.png`
   - `icon-512.png`
5. Commit and push:
```bash
git add public/icon-*.png
git commit -m "Add PWA icons"
git push
```

## 🔧 Key Features

### Nutrition
- 5 sample recipes with macros
- Daily meal planning (Breakfast, Lunch, Dinner)
- Meal completion tracking
- Calorie and protein totals

### Exercise
- 8 exercises (Push, Pull, Legs)
- Weekly workout plans
- Log actual sets/reps/weights vs targets
- Exercise tips and guidance

### Authentication
- Email magic link (6-digit code)
- Optional 4-digit PIN for quick access
- Secure session management

## 📱 Using as PWA

Once deployed:

**On iOS/Mac:**
1. Open in Safari
2. Tap Share → "Add to Home Screen"

**On Android:**
1. Open in Chrome
2. Tap menu → "Install app"

**On Desktop:**
1. Look for install icon in address bar
2. Click to install

## 🛠 Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📁 Project Structure

```
├── app/
│   ├── dashboard/          # Main app
│   │   ├── page.tsx       # Today's view
│   │   ├── meals/         # Recipe box
│   │   ├── workouts/      # Exercise library
│   │   └── profile/       # Settings
│   └── seed/              # DB seeding UI
├── components/
│   ├── AuthGuard.tsx      # Auth wrapper
│   ├── DashboardLayout.tsx # Navigation
│   └── ExerciseLogModal.tsx # Workout logging
├── lib/
│   ├── instant.ts         # DB client
│   └── seed-data.ts       # Sample data
└── public/
    └── manifest.json      # PWA config
```

## 🆘 Troubleshooting

### Dev Server Issues
```bash
# Kill existing server
pkill -f "next dev"

# Restart
npm run dev
```

### Database Empty
Visit http://localhost:3000/seed and click "Seed Database"

### Authentication Not Working
- Check `.env.local` exists with your InstantDB key
- Verify email settings in InstantDB dashboard

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## 📚 Documentation

- Full docs: See `README.md`
- Deployment guide: See `DEPLOYMENT.md`
- InstantDB docs: https://instantdb.com/docs
- Next.js docs: https://nextjs.org/docs

## 🎉 You're All Set!

Your Health Coach app is ready to use. Start tracking your meals and workouts today!

Questions or issues? Check the README.md or the code comments for guidance.

