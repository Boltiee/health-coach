// Seed data for recipes and exercises
// This will be used to populate the database initially

export const seedRecipes = [
  {
    id: 'recipe-1',
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
    id: 'recipe-2',
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
    id: 'recipe-3',
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
    id: 'recipe-4',
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
    id: 'recipe-5',
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
    id: 'ex-1',
    name: 'Push-ups',
    equipment: ['none'],
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    description: 'Classic bodyweight chest exercise',
    tips: 'Keep your core tight and body in a straight line',
  },
  {
    id: 'ex-2',
    name: 'Dumbbell Bench Press',
    equipment: ['dumbbells', 'bench'],
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    description: 'Compound pressing movement for upper body',
    tips: 'Lower dumbbells slowly, press explosively',
  },
  {
    id: 'ex-3',
    name: 'Bodyweight Squats',
    equipment: ['none'],
    muscleGroups: ['quads', 'glutes', 'hamstrings'],
    description: 'Fundamental lower body movement',
    tips: 'Keep chest up, knees tracking over toes',
  },
  {
    id: 'ex-4',
    name: 'Dumbbell Romanian Deadlift',
    equipment: ['dumbbells'],
    muscleGroups: ['hamstrings', 'glutes', 'lower back'],
    description: 'Hip hinge movement for posterior chain',
    tips: 'Keep slight knee bend, hinge at hips',
  },
  {
    id: 'ex-5',
    name: 'Dumbbell Rows',
    equipment: ['dumbbells', 'bench'],
    muscleGroups: ['back', 'biceps'],
    description: 'Horizontal pulling movement',
    tips: 'Pull elbow back, squeeze shoulder blade',
  },
  {
    id: 'ex-6',
    name: 'Plank',
    equipment: ['none'],
    muscleGroups: ['core', 'abs'],
    description: 'Isometric core stability exercise',
    tips: 'Keep body straight, don\'t let hips sag',
  },
  {
    id: 'ex-7',
    name: 'Dumbbell Shoulder Press',
    equipment: ['dumbbells'],
    muscleGroups: ['shoulders', 'triceps'],
    description: 'Overhead pressing movement',
    tips: 'Press straight up, keep core engaged',
  },
  {
    id: 'ex-8',
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
      id: `meal-${date}-breakfast`,
      date,
      mealType: 'breakfast' as const,
      recipeId: dayIndex % 2 === 0 ? 'recipe-1' : 'recipe-4',
    });
    
    // Lunch
    mealPlans.push({
      id: `meal-${date}-lunch`,
      date,
      mealType: 'lunch' as const,
      recipeId: dayIndex % 3 === 0 ? 'recipe-2' : 'recipe-5',
    });
    
    // Dinner
    mealPlans.push({
      id: `meal-${date}-dinner`,
      date,
      mealType: 'dinner' as const,
      recipeId: dayIndex % 2 === 0 ? 'recipe-3' : 'recipe-2',
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
      id: `workout-${dates[0]}-1`,
      date: dates[0],
      exerciseId: 'ex-1',
      targetSets: 3,
      targetReps: 12,
      order: 1,
    },
    {
      id: `workout-${dates[0]}-2`,
      date: dates[0],
      exerciseId: 'ex-2',
      targetSets: 4,
      targetReps: 10,
      targetWeight: 20,
      order: 2,
    },
    {
      id: `workout-${dates[0]}-3`,
      date: dates[0],
      exerciseId: 'ex-7',
      targetSets: 3,
      targetReps: 12,
      targetWeight: 15,
      order: 3,
    }
  );
  
  // Day 2: Legs
  workoutPlans.push(
    {
      id: `workout-${dates[1]}-1`,
      date: dates[1],
      exerciseId: 'ex-3',
      targetSets: 4,
      targetReps: 15,
      order: 1,
    },
    {
      id: `workout-${dates[1]}-2`,
      date: dates[1],
      exerciseId: 'ex-8',
      targetSets: 3,
      targetReps: 12,
      order: 2,
    },
    {
      id: `workout-${dates[1]}-3`,
      date: dates[1],
      exerciseId: 'ex-4',
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
      id: `workout-${dates[3]}-1`,
      date: dates[3],
      exerciseId: 'ex-5',
      targetSets: 4,
      targetReps: 10,
      targetWeight: 20,
      order: 1,
    },
    {
      id: `workout-${dates[3]}-2`,
      date: dates[3],
      exerciseId: 'ex-1',
      targetSets: 3,
      targetReps: 12,
      order: 2,
    },
    {
      id: `workout-${dates[3]}-3`,
      date: dates[3],
      exerciseId: 'ex-6',
      targetSets: 3,
      targetReps: 60,
      tips: 'Hold for 60 seconds',
      order: 3,
    }
  );
  
  // Day 5: Full Body
  workoutPlans.push(
    {
      id: `workout-${dates[4]}-1`,
      date: dates[4],
      exerciseId: 'ex-2',
      targetSets: 3,
      targetReps: 12,
      targetWeight: 20,
      order: 1,
    },
    {
      id: `workout-${dates[4]}-2`,
      date: dates[4],
      exerciseId: 'ex-3',
      targetSets: 3,
      targetReps: 15,
      order: 2,
    },
    {
      id: `workout-${dates[4]}-3`,
      date: dates[4],
      exerciseId: 'ex-5',
      targetSets: 3,
      targetReps: 10,
      targetWeight: 20,
      order: 3,
    }
  );
  
  // Days 6-7: Rest
  
  return workoutPlans;
}

