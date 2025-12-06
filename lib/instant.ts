import { init } from '@instantdb/react';

// Define the schema types
type Recipe = {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  calories: number;
  protein: number;
  portions: number;
  imageUrl?: string;
  createdAt: number;
};

type Exercise = {
  id: string;
  name: string;
  equipment: string[];
  muscleGroups: string[];
  description?: string;
  tips?: string;
};

type MealPlan = {
  id: string;
  date: string; // YYYY-MM-DD
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipeId: string;
};

type WorkoutPlan = {
  id: string;
  date: string; // YYYY-MM-DD
  exerciseId: string;
  targetSets: number;
  targetReps: number;
  targetWeight?: number;
  tips?: string;
  order: number;
};

type WorkoutLog = {
  id: string;
  date: string;
  exerciseId: string;
  actualSets: number;
  actualReps: number;
  actualWeight?: number;
  notes?: string;
  planId?: string;
  completedAt: number;
};

type MealLog = {
  id: string;
  date: string;
  mealPlanId: string;
  status: 'eaten' | 'skipped';
  loggedAt: number;
};

type UserProfile = {
  id: string;
  email: string;
  pin?: string;
  availableEquipment: string[];
  goals?: string[];
};

type Schema = {
  recipes: Recipe;
  exercises: Exercise;
  mealPlans: MealPlan;
  workoutPlans: WorkoutPlan;
  workoutLogs: WorkoutLog;
  mealLogs: MealLog;
  userProfiles: UserProfile;
};

const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID!;

// Initialize InstantDB
const db = init<Schema>({ appId: APP_ID });

export { db };
export type {
  Recipe,
  Exercise,
  MealPlan,
  WorkoutPlan,
  WorkoutLog,
  MealLog,
  UserProfile,
  Schema,
};

