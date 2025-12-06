# Health Coach - Development Plan

## ✅ Completed Features

### Core Infrastructure
- [x] Next.js 14 + TypeScript + Tailwind CSS setup
- [x] InstantDB integration for real-time data
- [x] PWA configuration (manifest.json)
- [x] Vercel deployment
- [x] Authentication (Email magic link)

### Dashboard & Today View
- [x] Today's meal plan display
- [x] Today's workout plan display
- [x] Meal completion tracking (Mark as Eaten)
- [x] Workout logging with sets/reps/weight
- [x] Daily calorie and protein totals

### Recipe Management
- [x] Recipe library view
- [x] Add new recipes
- [x] Edit existing recipes
- [x] Delete recipes
- [x] Recipe details (ingredients, instructions, macros)

### Exercise Management
- [x] Exercise library view
- [x] Add new exercises
- [x] Edit existing exercises
- [x] Delete exercises
- [x] Exercise details (equipment, muscle groups, tips)

### User Profile
- [x] PIN authentication for quick access
- [x] Sign out functionality

---

## 🎯 Phase 1: Core Planning Features (High Priority)

### 1A. Weekly Meal Planning Interface
**Status:** Not Started  
**Estimated Time:** 3-4 hours  
**Priority:** HIGH

**What:**
- Calendar view showing 7 days (Monday-Sunday)
- Assign recipes to specific meal slots (breakfast, lunch, dinner, snacks)
- Visual interface for planning the entire week
- Easy navigation between weeks

**Implementation:**
- Create `/dashboard/meal-planning` route
- Build calendar component with 7 days × 4 meal types = 28 slots
- Drag & drop or click-to-assign recipes to slots
- Display current week by default, with prev/next week navigation
- Show recipe thumbnails and macros in each slot
- Weekly totals (avg calories, protein per day)

**Database:**
- Already exists: `mealPlans` collection with `date` and `mealType` fields
- Just need UI to create/update these plans

---

### 1B. Weekly Workout Planning Interface
**Status:** Not Started  
**Estimated Time:** 3-4 hours  
**Priority:** HIGH

**What:**
- Calendar view showing 7 days
- Assign exercises to specific days
- Mark rest days
- Set target sets/reps/weights for each exercise
- Templates (Push/Pull/Legs, Upper/Lower, etc.)

**Implementation:**
- Create `/dashboard/workout-planning` route
- Build calendar with 7 days
- Click day to add exercises
- Drag to reorder exercises within a day
- Set targets for each exercise
- Save as workout templates for reuse
- Visual indication of which muscle groups are worked each day

**Database:**
- Already exists: `workoutPlans` collection with `date` field
- Just need UI to create/update these plans

---

## 🚀 Phase 2: Enhanced Features (Medium Priority)

### 2A. Quick Meal Assignment
**Status:** Not Started  
**Estimated Time:** 2 hours  
**Priority:** MEDIUM

**What:**
- Copy yesterday's meals to today
- Copy last week's meals to this week
- Favorite meals for quick selection
- Smart suggestions based on macros

**Implementation:**
- Add "Copy from..." button on meal planning page
- Date picker to select source date
- Batch create meal plans from template

---

### 2B. Shopping List Generator
**Status:** Not Started  
**Estimated Time:** 2-3 hours  
**Priority:** MEDIUM

**What:**
- Auto-generate shopping list from weekly meal plan
- Group ingredients by category (produce, dairy, protein, etc.)
- Check off items while shopping
- Add custom items

**Implementation:**
- Create `/dashboard/shopping` route
- Aggregate all ingredients from current week's meal plans
- Smart grouping (combine "2 bananas" from different recipes)
- Persistent checked state (localStorage or DB)
- Add manual items

**Database:**
- New collection: `shoppingLists` with items array
- Or use localStorage for ephemeral lists

---

### 2C. Workout Templates
**Status:** Not Started  
**Estimated Time:** 2 hours  
**Priority:** MEDIUM

**What:**
- Save workout routines as reusable templates
- Pre-built templates (Push/Pull/Legs, Full Body, etc.)
- Apply template to any day with one click

**Implementation:**
- New collection: `workoutTemplates`
- Store array of exercises with default sets/reps
- UI to create/edit/delete templates
- "Apply Template" button in workout planning

---

## 📊 Phase 3: Progress Tracking (High Value)

### 3A. Weight Tracking
**Status:** Not Started  
**Estimated Time:** 2-3 hours  
**Priority:** HIGH

**What:**
- Log body weight daily/weekly
- Chart showing weight trend over time
- Set target weight
- Calculate progress toward goal

**Implementation:**
- Create `/dashboard/progress` route
- Simple form to log weight with date
- Line chart using Chart.js or Recharts
- New collection: `weightLogs` with `date` and `weight` fields

---

### 3B. Workout Progress Tracking
**Status:** Not Started  
**Estimated Time:** 2-3 hours  
**Priority:** HIGH

**What:**
- Track personal records (PRs) for each exercise
- Chart showing weight progression over time per exercise
- Volume tracking (sets × reps × weight)
- Strength gains percentage

**Implementation:**
- Exercise detail view with history chart
- Query all `workoutLogs` for specific exercise
- Calculate PRs (max weight, max reps at given weight, max volume)
- Show "New PR!" indicator when achieved

---

### 3C. Consistency Streaks
**Status:** Not Started  
**Estimated Time:** 1-2 hours  
**Priority:** MEDIUM

**What:**
- Track meal logging streak (days in a row)
- Track workout completion streak
- Visual badges/achievements
- Calendar heat map (GitHub-style)

**Implementation:**
- Calculate streaks from `mealLogs` and `workoutLogs`
- Display current streak prominently
- Heat map showing activity over past 90 days
- Motivational milestones (7 days, 30 days, 100 days, etc.)

---

## 🎨 Phase 4: Polish & UX Improvements

### 4A. Enhanced Today View
**Status:** Not Started  
**Estimated Time:** 2 hours  
**Priority:** MEDIUM

**What:**
- Quick actions (add meal, log workout) without leaving page
- Swipe to mark meals complete (mobile)
- Pull to refresh
- Progress bars for daily goals

**Implementation:**
- Add quick-add modals
- Touch gestures with react-swipeable
- Daily goal setting in profile
- Progress indicators

---

### 4B. Mobile Optimizations
**Status:** Not Started  
**Estimated Time:** 2-3 hours  
**Priority:** MEDIUM

**What:**
- Bottom navigation for easier thumb reach
- Haptic feedback on actions
- Optimized forms for mobile input
- Offline mode improvements

**Implementation:**
- Move navigation to bottom on mobile
- Use Vibration API for feedback
- Large touch targets (min 44px)
- Better caching with service worker

---

### 4C. Dark Mode
**Status:** Not Started  
**Estimated Time:** 2-3 hours  
**Priority:** LOW

**What:**
- Toggle between light/dark themes
- System preference detection
- Persistent preference

**Implementation:**
- Tailwind dark mode classes
- Theme context provider
- localStorage for preference
- Respect system setting by default

---

## 🔮 Phase 5: Advanced Features (Future)

### 5A. AI Recipe Parser
**What:** Upload photo or paste text → auto-extract recipe details  
**Estimated Time:** 4-6 hours  
**Complexity:** HIGH (requires AI API)

### 5B. Nutrition Calculator
**What:** Calculate macros for custom ingredients/meals  
**Estimated Time:** 3-4 hours  
**Complexity:** MEDIUM (requires nutrition database API)

### 5C. Strava Integration
**What:** Sync cardio workouts from Strava/Garmin  
**Estimated Time:** 4-6 hours  
**Complexity:** HIGH (requires OAuth & API integration)

### 5D. Social Features
**What:** Share recipes/workouts, follow friends, leaderboards  
**Estimated Time:** 8-10 hours  
**Complexity:** HIGH (requires new data models & privacy controls)

### 5E. Progress Photos
**What:** Upload and compare progress photos over time  
**Estimated Time:** 3-4 hours  
**Complexity:** MEDIUM (requires image storage)

### 5F. Custom Reports
**What:** Weekly/monthly summaries via email  
**Estimated Time:** 4-5 hours  
**Complexity:** HIGH (requires email service & scheduled jobs)

---

## 🛠️ Technical Debt & Improvements

### Code Quality
- [ ] Remove @ts-ignore comments with proper types
- [ ] Add comprehensive error handling
- [ ] Add loading states for all async operations
- [ ] Add input validation and error messages

### Performance
- [ ] Optimize InstantDB queries (add indexes if needed)
- [ ] Image optimization for recipe photos
- [ ] Lazy load components
- [ ] Cache heavy computations

### Testing
- [ ] Add unit tests for utility functions
- [ ] Add integration tests for forms
- [ ] End-to-end tests for critical flows

---

## 📅 Recommended Implementation Order

### Week 1: Core Planning
1. Weekly Meal Planning Interface (1A)
2. Weekly Workout Planning Interface (1B)

### Week 2: Progress Tracking
3. Weight Tracking (3A)
4. Workout Progress Tracking (3B)

### Week 3: Quality of Life
5. Quick Meal Assignment (2A)
6. Shopping List Generator (2B)
7. Consistency Streaks (3C)

### Week 4: Polish
8. Enhanced Today View (4A)
9. Mobile Optimizations (4B)
10. Workout Templates (2C)

---

## 🤔 Questions to Consider

1. **Data Migration:** Do you want to keep the sample data or start fresh with your own?
2. **Goals:** Should we add goal setting (target weight, protein goals, etc.)?
3. **Notifications:** Do you want reminders for meals/workouts? (Would require PWA push notifications)
4. **Export:** Should you be able to export your data (CSV, PDF)?
5. **Photos:** Do you want to add photos to recipes?

---

## 💡 Next Steps

**Pick one to start:**
- 🍽️ **1A: Weekly Meal Planning** - Most practical, highest value
- 💪 **1B: Weekly Workout Planning** - Complete the planning suite
- 📊 **3A: Weight Tracking** - Simple and motivating
- 🛒 **2B: Shopping List** - Practical for meal prep

**What would you like to work on next?**

