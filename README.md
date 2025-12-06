# Health Coach

Your personal health and fitness companion - a Progressive Web App (PWA) for tracking nutrition and exercise.

## Features

### 🍽️ Nutrition
- Recipe storage with calories and protein tracking
- Weekly meal planning
- Daily meal logging
- Meal completion tracking

### 💪 Exercise
- Exercise library with equipment and muscle group tagging
- Weekly workout planning with target sets/reps/weights
- Workout logging with actual performance
- Tips and guidance for each exercise

### 🔐 Authentication
- Email magic link authentication (via InstantDB)
- Optional 4-digit PIN for quick access

### 📱 Progressive Web App
- Installable on mobile and desktop
- Responsive design (mobile-first)
- Works on Mac, iOS, Android, and web browsers

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend/Database**: InstantDB (real-time, serverless)
- **Hosting**: Vercel
- **PWA**: Web App Manifest

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- InstantDB account and App ID

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd "Health Coach"
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
NEXT_PUBLIC_INSTANT_APP_ID=your-instant-app-id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

6. Sign in with your email and seed the database:
   - Visit `/seed` after logging in
   - Click "Seed Database" to populate with sample data

## Project Structure

```
├── app/
│   ├── dashboard/          # Main dashboard pages
│   │   ├── meals/          # Recipe browsing
│   │   ├── workouts/       # Exercise library
│   │   └── profile/        # User settings
│   ├── seed/               # Database seeding UI
│   └── page.tsx            # Landing/redirect page
├── components/
│   ├── AuthGuard.tsx       # Authentication wrapper
│   ├── DashboardLayout.tsx # Main app layout
│   └── ExerciseLogModal.tsx # Workout logging
├── lib/
│   ├── instant.ts          # InstantDB client & schema
│   └── seed-data.ts        # Sample recipes & exercises
└── public/
    └── manifest.json       # PWA configuration
```

## Database Schema

### Collections

- `recipes` - Meal recipes with macros
- `exercises` - Exercise library
- `mealPlans` - Scheduled meals (date + meal type)
- `workoutPlans` - Scheduled workouts (date + targets)
- `mealLogs` - Meal completion tracking
- `workoutLogs` - Workout performance logs
- `userProfiles` - User preferences

## Deployment

### Deploy to Vercel

1. Push your code to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. Visit [vercel.com](https://vercel.com) and import your GitHub repo

3. Add environment variable:
   - `NEXT_PUBLIC_INSTANT_APP_ID` = your InstantDB App ID

4. Deploy!

### PWA Icons

Before deploying, replace placeholder icons in `/public/`:
- `icon-192.png` (192x192px)
- `icon-512.png` (512x512px)

Use tools like [Favicon Generator](https://www.favicon-generator.org/) or create them from your logo.

## Roadmap / Future Features

### Phase 2
- [ ] AI Recipe Parser (text/image to structured recipe)
- [ ] Drag-and-drop meal planning calendar
- [ ] Shopping list generator
- [ ] Equipment profile setup
- [ ] Goal setting and tracking

### Phase 3
- [ ] Strava API integration (cardio tracking)
- [ ] Garmin sync (via Strava)
- [ ] Progress photos
- [ ] Charts and analytics
- [ ] Social features / sharing

## Contributing

This is a personal project, but feel free to fork and customize for your own use!

## License

MIT

