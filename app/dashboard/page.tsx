'use client';

import { db } from '@/lib/instant';
import { useState } from 'react';
import ExerciseLogModal from '@/components/ExerciseLogModal';

export default function DashboardPage() {
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Query today's meal plans
  // @ts-ignore - InstantDB type inference issue
  const { data: mealPlansData } = db.useQuery({
    mealPlans: {
      $: {
        where: {
          date: today,
        },
      },
    },
    recipes: {},
    mealLogs: {},
  });

  // Query today's workout plans
  // @ts-ignore - InstantDB type inference issue
  const { data: workoutData } = db.useQuery({
    workoutPlans: {
      $: {
        where: {
          date: today,
        },
      },
    },
    exercises: {},
    workoutLogs: {},
  });

  // @ts-ignore - InstantDB type inference issue
  const mealPlans = mealPlansData?.mealPlans || [];
  // @ts-ignore - InstantDB type inference issue
  const recipes = mealPlansData?.recipes || [];
  // @ts-ignore - InstantDB type inference issue
  const mealLogs = mealPlansData?.mealLogs || [];
  
  // @ts-ignore - InstantDB type inference issue
  const workoutPlans = (workoutData?.workoutPlans || []).sort(
    (a: any, b: any) => a.order - b.order
  );
  // @ts-ignore - InstantDB type inference issue
  const exercises = workoutData?.exercises || [];
  // @ts-ignore - InstantDB type inference issue
  const workoutLogs = workoutData?.workoutLogs || [];

  // Helper functions
  const getRecipe = (recipeId: string) =>
    recipes.find((r: any) => r.id === recipeId);
  
  const getExercise = (exerciseId: string) =>
    exercises.find((e: any) => e.id === exerciseId);
  
  const getMealLog = (mealPlanId: string) =>
    mealLogs.find((l: any) => l.mealPlanId === mealPlanId);
  
  const getWorkoutLog = (planId: string) =>
    workoutLogs.find((l: any) => l.planId === planId);

  const handleToggleMeal = async (mealPlanId: string) => {
    const existingLog = getMealLog(mealPlanId);
    
    if (existingLog) {
      // Toggle status
      const newStatus = existingLog.status === 'eaten' ? 'skipped' : 'eaten';
      // @ts-ignore - InstantDB type inference issue
      await db.transact([
        // @ts-ignore - InstantDB type inference issue
        db.tx.mealLogs[existingLog.id].update({ status: newStatus }),
      ]);
    } else {
      // Create new log
      // @ts-ignore - InstantDB type inference issue
      await db.transact([
        // @ts-ignore - InstantDB type inference issue
        db.tx.mealLogs[`log-${mealPlanId}-${Date.now()}`].update({
          date: today,
          mealPlanId,
          status: 'eaten',
          loggedAt: Date.now(),
        }),
      ]);
    }
  };

  const mealOrder = ['breakfast', 'lunch', 'dinner', 'snack'];
  const sortedMealPlans = [...mealPlans].sort(
    (a: any, b: any) =>
      mealOrder.indexOf(a.mealType) - mealOrder.indexOf(b.mealType)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Today's Plan
        </h1>
        <p className="text-gray-600">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Meals Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-3">🍽️</span>
            <h2 className="text-2xl font-bold text-gray-900">Meals</h2>
          </div>

          {sortedMealPlans.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No meals planned for today
            </p>
          ) : (
            <div className="space-y-4">
              {sortedMealPlans.map((plan: any) => {
                const recipe = getRecipe(plan.recipeId);
                const log = getMealLog(plan.id);
                const isEaten = log?.status === 'eaten';

                return (
                  <div
                    key={plan.id}
                    className={`border rounded-lg p-4 transition ${
                      isEaten ? 'bg-green-50 border-green-200' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-primary-600 uppercase">
                            {plan.mealType}
                          </span>
                          {isEaten && (
                            <span className="text-green-600 text-sm">✓</span>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {recipe?.title || 'Unknown Recipe'}
                        </h3>
                        {recipe && (
                          <div className="flex gap-4 text-sm text-gray-600">
                            <span>{recipe.calories} cal</span>
                            <span>{recipe.protein}g protein</span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleToggleMeal(plan.id)}
                        className={`ml-4 px-4 py-2 rounded-lg font-medium transition ${
                          isEaten
                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            : 'bg-primary-600 text-white hover:bg-primary-700'
                        }`}
                      >
                        {isEaten ? 'Eaten' : 'Mark Eaten'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {sortedMealPlans.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-gray-700">Total:</span>
                <div className="flex gap-4">
                  <span className="text-gray-900">
                    {sortedMealPlans.reduce(
                      (sum: number, plan: any) =>
                        sum + (getRecipe(plan.recipeId)?.calories || 0),
                      0
                    )}{' '}
                    cal
                  </span>
                  <span className="text-primary-600">
                    {sortedMealPlans.reduce(
                      (sum: number, plan: any) =>
                        sum + (getRecipe(plan.recipeId)?.protein || 0),
                      0
                    )}g
                    protein
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Workouts Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-3">💪</span>
            <h2 className="text-2xl font-bold text-gray-900">Workout</h2>
          </div>

          {workoutPlans.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Rest day - No workout planned
            </p>
          ) : (
            <div className="space-y-4">
              {workoutPlans.map((plan: any) => {
                const exercise = getExercise(plan.exerciseId);
                const log = getWorkoutLog(plan.id);
                const isCompleted = !!log;

                return (
                  <div
                    key={plan.id}
                    className={`border rounded-lg p-4 transition ${
                      isCompleted
                        ? 'bg-green-50 border-green-200'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">
                            {exercise?.name || 'Unknown Exercise'}
                          </h3>
                          {isCompleted && (
                            <span className="text-green-600 text-sm">✓</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>
                            Target: {plan.targetSets} sets × {plan.targetReps}{' '}
                            reps
                            {plan.targetWeight && ` @ ${plan.targetWeight}kg`}
                          </div>
                          {isCompleted && log && (
                            <div className="text-green-700 font-medium">
                              Completed: {log.actualSets} sets × {log.actualReps}{' '}
                              reps
                              {log.actualWeight && ` @ ${log.actualWeight}kg`}
                            </div>
                          )}
                          {plan.tips && (
                            <div className="text-primary-600 italic">
                              💡 {plan.tips}
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedWorkout(plan)}
                        className={`ml-4 px-4 py-2 rounded-lg font-medium transition ${
                          isCompleted
                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            : 'bg-primary-600 text-white hover:bg-primary-700'
                        }`}
                      >
                        {isCompleted ? 'Edit' : 'Log'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {selectedWorkout && (
        <ExerciseLogModal
          workout={selectedWorkout}
          exercise={getExercise(selectedWorkout.exerciseId)}
          existingLog={getWorkoutLog(selectedWorkout.id)}
          onClose={() => setSelectedWorkout(null)}
        />
      )}
    </div>
  );
}

