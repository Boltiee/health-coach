'use client';

import { db } from '@/lib/instant';
import {
  seedRecipes,
  seedExercises,
  generateMealPlan,
  generateWorkoutPlan,
} from '@/lib/seed-data';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SeedPage() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [status, setStatus] = useState<string>('');
  const router = useRouter();

  const handleSeed = async () => {
    setIsSeeding(true);
    setStatus('🌱 Starting database seed...');

    try {
      // Add recipes
      setStatus('📝 Adding recipes...');
      const recipeTxs = seedRecipes.map((recipe) =>
        db.tx.recipes[recipe.id].update(recipe)
      );
      await db.transact(recipeTxs);

      // Add exercises
      setStatus('💪 Adding exercises...');
      const exerciseTxs = seedExercises.map((exercise) =>
        db.tx.exercises[exercise.id].update(exercise)
      );
      await db.transact(exerciseTxs);

      // Add meal plans
      setStatus('🍽️ Generating meal plans...');
      const mealPlans = generateMealPlan();
      const mealPlanTxs = mealPlans.map((plan) =>
        db.tx.mealPlans[plan.id].update(plan)
      );
      await db.transact(mealPlanTxs);

      // Add workout plans
      setStatus('🏋️ Generating workout plans...');
      const workoutPlans = generateWorkoutPlan();
      const workoutPlanTxs = workoutPlans.map((plan) =>
        db.tx.workoutPlans[plan.id].update(plan)
      );
      await db.transact(workoutPlanTxs);

      setStatus('🎉 Seed completed successfully!');
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Seed failed:', error);
      setStatus(`❌ Seed failed: ${error}`);
      setIsSeeding(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Database Setup
        </h1>
        <p className="text-gray-600 mb-6">
          Click the button below to populate your database with:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
          <li>5 sample recipes</li>
          <li>8 exercises</li>
          <li>A week's meal plan</li>
          <li>A week's workout plan</li>
        </ul>

        {status && (
          <div className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
            <p className="text-sm text-gray-800">{status}</p>
          </div>
        )}

        <button
          onClick={handleSeed}
          disabled={isSeeding}
          className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSeeding ? 'Seeding...' : 'Seed Database'}
        </button>
      </div>
    </div>
  );
}

