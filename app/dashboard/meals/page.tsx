'use client';

import { db } from '@/lib/instant';

export default function MealsPage() {
  // @ts-ignore - InstantDB type inference issue
  const { data } = db.useQuery({
    recipes: {},
  });

  // @ts-ignore - InstantDB type inference issue
  const recipes = data?.recipes || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recipe Box</h1>
        <p className="text-gray-600">Your saved recipes</p>
      </div>

      {recipes.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 mb-4">No recipes yet</p>
          <p className="text-sm text-gray-400">
            Run the seed script to add sample recipes
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe: any) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-48 bg-gradient-to-br from-primary-100 to-green-100 flex items-center justify-center">
                <span className="text-6xl">🍽️</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {recipe.title}
                </h3>
                <div className="flex gap-4 text-sm text-gray-600 mb-3">
                  <span>{recipe.calories} cal</span>
                  <span>{recipe.protein}g protein</span>
                  <span>{recipe.portions} serving</span>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-1">Ingredients:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {recipe.ingredients.slice(0, 3).map((ing: string, idx: number) => (
                      <li key={idx} className="truncate">
                        {ing}
                      </li>
                    ))}
                    {recipe.ingredients.length > 3 && (
                      <li className="text-primary-600">
                        +{recipe.ingredients.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

