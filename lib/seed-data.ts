// Seed data for recipes and exercises
// This will be used to populate the database initially
import { id } from '@instantdb/react';

// Generate stable UUIDs for seed data
export const RECIPE_IDS = {
  yogurtBowl: id(),
  chickenQuinoa: id(),
  salmon: id(),
  smoothie: id(),
  turkeyWrap: id(),
};

export const EXERCISE_IDS = {
  pushups: id(),
  dumbbellBench: id(),
  squats: id(),
  romanianDeadlift: id(),
  dumbbellRows: id(),
  plank: id(),
  shoulderPress: id(),
  lunges: id(),
};

export const seedRecipes = [
  {
    id: RECIPE_IDS.yogurtBowl,
    title: 'Greek Yogurt Bowl with Berries',
    ingredients: [
      '200g Greek yogurt',
      '100g mixed berries',
      '30g granola',
      '1 tbsp honey',
      '10g chia seeds',
    ],
    instructions: [
      'Add Greek yogurt to a bowl',
      'Top with mixed berries',
      'Sprinkle granola and chia seeds',
      'Drizzle with honey',
    ],
    calories: 320,
    protein: 20,
    portions: 1,
    createdAt: Date.now(),
  },
  {
    id: RECIPE_IDS.chickenQuinoa,
    title: 'Grilled Chicken & Quinoa Bowl',
    ingredients: [
      '150g chicken breast',
      '100g cooked quinoa',
      '50g cherry tomatoes',
      '50g cucumber',
      '30g feta cheese',
      '2 tbsp olive oil',
      'Lemon juice',
      'Salt, pepper, oregano',
    ],
    instructions: [
      'Season chicken breast with salt, pepper, and oregano',
      'Grill chicken for 6-7 minutes each side',
      'Cook quinoa according to package instructions',
      'Chop tomatoes and cucumber',
      'Assemble bowl with quinoa, sliced chicken, vegetables',
      'Top with feta and drizzle with olive oil and lemon',
    ],
    calories: 520,
    protein: 45,
    portions: 1,
    createdAt: Date.now(),
  },
  {
    id: RECIPE_IDS.salmon,
    title: 'Salmon with Roasted Vegetables',
    ingredients: [
      '150g salmon fillet',
      '200g mixed vegetables (broccoli, carrots, bell peppers)',
      '2 tbsp olive oil',
      '2 cloves garlic',
      'Lemon',
      'Salt, pepper, dill',
    ],
    instructions: [
      'Preheat oven to 200°C',
      'Chop vegetables and toss with olive oil, salt, pepper',
      'Roast vegetables for 20 minutes',
      'Season salmon with salt, pepper, dill',
      'Add salmon to vegetables and roast for 12-15 minutes',
      'Serve with lemon wedges',
    ],
    calories: 480,
    protein: 38,
    portions: 1,
    createdAt: Date.now(),
  },
  {
    id: RECIPE_IDS.smoothie,
    title: 'Protein Smoothie',
    ingredients: [
      '1 banana',
      '1 scoop protein powder',
      '200ml almond milk',
      '1 tbsp peanut butter',
      '100g spinach',
      'Ice cubes',
    ],
    instructions: [
      'Add all ingredients to blender',
      'Blend until smooth',
      'Pour into glass and enjoy',
    ],
    calories: 340,
    protein: 28,
    portions: 1,
    createdAt: Date.now(),
  },
  {
    id: RECIPE_IDS.turkeyWrap,
    title: 'Turkey & Avocado Wrap',
    ingredients: [
      '1 whole wheat tortilla',
      '100g turkey breast slices',
      '1/2 avocado',
      '50g lettuce',
      '30g tomato',
      '2 tbsp hummus',
    ],
    instructions: [
      'Spread hummus on tortilla',
      'Layer turkey slices, lettuce, tomato',
      'Add sliced avocado',
      'Roll tightly and cut in half',
    ],
    calories: 420,
    protein: 32,
    portions: 1,
    createdAt: Date.now(),
  },
];

export const seedExercises = [
  {
    id: EXERCISE_IDS.pushups,
    name: 'Push-ups',
    equipment: ['none'],
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    description: 'Classic bodyweight chest exercise',
    tips: 'Keep your core tight and body in a straight line',
  },
  {
    id: EXERCISE_IDS.dumbbellBench,
    name: 'Dumbbell Bench Press',
    equipment: ['dumbbells', 'bench'],
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    description: 'Compound pressing movement for upper body',
    tips: 'Lower dumbbells slowly, press explosively',
  },
  {
    id: EXERCISE_IDS.squats,
    name: 'Bodyweight Squats',
    equipment: ['none'],
    muscleGroups: ['quads', 'glutes', 'hamstrings'],
    description: 'Fundamental lower body movement',
    tips: 'Keep chest up, knees tracking over toes',
  },
  {
    id: EXERCISE_IDS.romanianDeadlift,
    name: 'Dumbbell Romanian Deadlift',
    equipment: ['dumbbells'],
    muscleGroups: ['hamstrings', 'glutes', 'lower back'],
    description: 'Hip hinge movement for posterior chain',
    tips: 'Keep slight knee bend, hinge at hips',
  },
  {
    id: EXERCISE_IDS.dumbbellRows,
    name: 'Dumbbell Rows',
    equipment: ['dumbbells', 'bench'],
    muscleGroups: ['back', 'biceps'],
    description: 'Horizontal pulling movement',
    tips: 'Pull elbow back, squeeze shoulder blade',
  },
  {
    id: EXERCISE_IDS.plank,
    name: 'Plank',
    equipment: ['none'],
    muscleGroups: ['core', 'abs'],
    description: 'Isometric core stability exercise',
    tips: 'Keep body straight, don\'t let hips sag',
  },
  {
    id: EXERCISE_IDS.shoulderPress,
    name: 'Dumbbell Shoulder Press',
    equipment: ['dumbbells'],
    muscleGroups: ['shoulders', 'triceps'],
    description: 'Overhead pressing movement',
    tips: 'Press straight up, keep core engaged',
  },
  {
    id: EXERCISE_IDS.lunges,
    name: 'Lunges',
    equipment: ['none'],
    muscleGroups: ['quads', 'glutes'],
    description: 'Unilateral leg exercise',
    tips: 'Step forward, lower back knee to ground',
  },
];

// Helper function to get current week's dates
export function getWeekDates(): string[] {
  const today = new Date();
  const dates: string[] = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
}

// Generate a week's meal plan
export function generateMealPlan() {
  const dates = getWeekDates();
  const mealPlans = [];
  
  dates.forEach((date, dayIndex) => {
    // Breakfast
    mealPlans.push({
      id: id(),
      date,
      mealType: 'breakfast' as const,
      recipeId: dayIndex % 2 === 0 ? RECIPE_IDS.yogurtBowl : RECIPE_IDS.smoothie,
    });
    
    // Lunch
    mealPlans.push({
      id: id(),
      date,
      mealType: 'lunch' as const,
      recipeId: dayIndex % 3 === 0 ? RECIPE_IDS.chickenQuinoa : RECIPE_IDS.turkeyWrap,
    });
    
    // Dinner
    mealPlans.push({
      id: id(),
      date,
      mealType: 'dinner' as const,
      recipeId: dayIndex % 2 === 0 ? RECIPE_IDS.salmon : RECIPE_IDS.chickenQuinoa,
    });
  });
  
  return mealPlans;
}

// Generate a week's workout plan
export function generateWorkoutPlan() {
  const dates = getWeekDates();
  const workoutPlans = [];
  
  // Day 1: Push
  workoutPlans.push(
    {
      id: id(),
      date: dates[0],
      exerciseId: EXERCISE_IDS.pushups,
      targetSets: 3,
      targetReps: 12,
      order: 1,
    },
    {
      id: id(),
      date: dates[0],
      exerciseId: EXERCISE_IDS.dumbbellBench,
      targetSets: 4,
      targetReps: 10,
      targetWeight: 20,
      order: 2,
    },
    {
      id: id(),
      date: dates[0],
      exerciseId: EXERCISE_IDS.shoulderPress,
      targetSets: 3,
      targetReps: 12,
      targetWeight: 15,
      order: 3,
    }
  );
  
  // Day 2: Legs
  workoutPlans.push(
    {
      id: id(),
      date: dates[1],
      exerciseId: EXERCISE_IDS.squats,
      targetSets: 4,
      targetReps: 15,
      order: 1,
    },
    {
      id: id(),
      date: dates[1],
      exerciseId: EXERCISE_IDS.lunges,
      targetSets: 3,
      targetReps: 12,
      order: 2,
    },
    {
      id: id(),
      date: dates[1],
      exerciseId: EXERCISE_IDS.romanianDeadlift,
      targetSets: 3,
      targetReps: 12,
      targetWeight: 25,
      order: 3,
    }
  );
  
  // Day 3: Rest
  
  // Day 4: Pull
  workoutPlans.push(
    {
      id: id(),
      date: dates[3],
      exerciseId: EXERCISE_IDS.dumbbellRows,
      targetSets: 4,
      targetReps: 10,
      targetWeight: 20,
      order: 1,
    },
    {
      id: id(),
      date: dates[3],
      exerciseId: EXERCISE_IDS.pushups,
      targetSets: 3,
      targetReps: 12,
      order: 2,
    },
    {
      id: id(),
      date: dates[3],
      exerciseId: EXERCISE_IDS.plank,
      targetSets: 3,
      targetReps: 60,
      tips: 'Hold for 60 seconds',
      order: 3,
    }
  );
  
  // Day 5: Full Body
  workoutPlans.push(
    {
      id: id(),
      date: dates[4],
      exerciseId: EXERCISE_IDS.dumbbellBench,
      targetSets: 3,
      targetReps: 12,
      targetWeight: 20,
      order: 1,
    },
    {
      id: id(),
      date: dates[4],
      exerciseId: EXERCISE_IDS.squats,
      targetSets: 3,
      targetReps: 15,
      order: 2,
    },
    {
      id: id(),
      date: dates[4],
      exerciseId: EXERCISE_IDS.dumbbellRows,
      targetSets: 3,
      targetReps: 10,
      targetWeight: 20,
      order: 3,
    }
  );
  
  // Days 6-7: Rest
  
  return workoutPlans;
}

