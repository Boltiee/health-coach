'use client';

import { db } from '@/lib/instant';
import { useState, useEffect } from 'react';

type Recipe = {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  calories: number;
  protein: number;
  portions: number;
  imageUrl?: string;
  createdAt?: number;
};

type RecipeFormProps = {
  recipe?: Recipe;
  onClose: () => void;
};

export default function RecipeForm({ recipe, onClose }: RecipeFormProps) {
  const [title, setTitle] = useState(recipe?.title || '');
  const [calories, setCalories] = useState(recipe?.calories.toString() || '');
  const [protein, setProtein] = useState(recipe?.protein.toString() || '');
  const [portions, setPortions] = useState(recipe?.portions.toString() || '1');
  const [ingredientsText, setIngredientsText] = useState(
    recipe?.ingredients.join('\n') || ''
  );
  const [instructionsText, setInstructionsText] = useState(
    recipe?.instructions.join('\n') || ''
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !calories || !protein) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSaving(true);
    try {
      const recipeId = recipe?.id || `recipe-${Date.now()}`;
      const ingredients = ingredientsText
        .split('\n')
        .map((i) => i.trim())
        .filter((i) => i.length > 0);
      const instructions = instructionsText
        .split('\n')
        .map((i) => i.trim())
        .filter((i) => i.length > 0);

      // @ts-ignore - InstantDB type inference issue
      await db.transact([
        // @ts-ignore - InstantDB type inference issue
        db.tx.recipes[recipeId].update({
          id: recipeId,
          title: title.trim(),
          ingredients,
          instructions,
          calories: parseInt(calories),
          protein: parseInt(protein),
          portions: parseInt(portions),
          createdAt: recipe?.createdAt || Date.now(),
        }),
      ]);

      onClose();
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!recipe) return;
    
    if (!confirm(`Are you sure you want to delete "${recipe.title}"?`)) {
      return;
    }

    setIsSaving(true);
    try {
      // @ts-ignore - InstantDB type inference issue
      await db.transact([
        // @ts-ignore - InstantDB type inference issue
        db.tx.recipes[recipe.id].delete(),
      ]);
      onClose();
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Failed to delete recipe');
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {recipe ? 'Edit Recipe' : 'New Recipe'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipe Name *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Greek Yogurt Bowl"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Macros */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Calories *
              </label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="400"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Protein (g) *
              </label>
              <input
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                placeholder="30"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Servings
              </label>
              <input
                type="number"
                value={portions}
                onChange={(e) => setPortions(e.target.value)}
                placeholder="1"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ingredients (one per line)
            </label>
            <textarea
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
              placeholder="200g Greek yogurt&#10;1 banana&#10;30g granola&#10;1 tbsp honey"
              rows={6}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructions (one per line)
            </label>
            <textarea
              value={instructionsText}
              onChange={(e) => setInstructionsText(e.target.value)}
              placeholder="Add yogurt to bowl&#10;Slice banana on top&#10;Sprinkle granola&#10;Drizzle with honey"
              rows={6}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between">
          <div>
            {recipe && (
              <button
                onClick={handleDelete}
                disabled={isSaving}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition disabled:opacity-50"
              >
                Delete Recipe
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : recipe ? 'Save Changes' : 'Create Recipe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

