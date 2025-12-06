/**
 * Seed script to populate InstantDB with initial data
 * 
 * Run this manually after authentication to add:
 * - Sample recipes
 * - Exercise library
 * - A week's meal plan
 * - A week's workout plan
 */

import { init } from '@instantdb/core';
import { seedRecipes, seedExercises, generateMealPlan, generateWorkoutPlan } from '../lib/seed-data';

const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID!;
const db = init({ appId: APP_ID });

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // Add recipes
    console.log('📝 Adding recipes...');
    const recipeTxs = seedRecipes.map((recipe) =>
      db.tx.recipes[recipe.id].update(recipe)
    );
    await db.transact(recipeTxs);
    console.log(`✅ Added ${seedRecipes.length} recipes`);

    // Add exercises
    console.log('💪 Adding exercises...');
    const exerciseTxs = seedExercises.map((exercise) =>
      db.tx.exercises[exercise.id].update(exercise)
    );
    await db.transact(exerciseTxs);
    console.log(`✅ Added ${seedExercises.length} exercises`);

    // Add meal plans
    console.log('🍽️ Generating meal plans...');
    const mealPlans = generateMealPlan();
    const mealPlanTxs = mealPlans.map((plan) =>
      db.tx.mealPlans[plan.id].update(plan)
    );
    await db.transact(mealPlanTxs);
    console.log(`✅ Added ${mealPlans.length} meal plans`);

    // Add workout plans
    console.log('🏋️ Generating workout plans...');
    const workoutPlans = generateWorkoutPlan();
    const workoutPlanTxs = workoutPlans.map((plan) =>
      db.tx.workoutPlans[plan.id].update(plan)
    );
    await db.transact(workoutPlanTxs);
    console.log(`✅ Added ${workoutPlans.length} workout plans`);

    console.log('');
    console.log('🎉 Seed completed successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Visit /dashboard to see your meal and workout plans');
    console.log('2. Log your meals and workouts as you complete them');
    console.log('3. Check out /dashboard/meals to see all recipes');
    console.log('4. Visit /dashboard/workouts to see the exercise library');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

export default seed;

