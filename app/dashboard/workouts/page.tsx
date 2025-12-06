'use client';

import { db } from '@/lib/instant';

export default function WorkoutsPage() {
  const { data } = db.useQuery({
    exercises: {},
  } as const);

  const exercises = data?.exercises || [];

  // Group by muscle groups
  const groupedExercises = exercises.reduce((acc: any, exercise: any) => {
    const primaryMuscle = exercise.muscleGroups?.[0] || 'other';
    if (!acc[primaryMuscle]) {
      acc[primaryMuscle] = [];
    }
    acc[primaryMuscle].push(exercise);
    return acc;
  }, {});

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Exercise Library
        </h1>
        <p className="text-gray-600">Available exercises</p>
      </div>

      {exercises.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 mb-4">No exercises yet</p>
          <p className="text-sm text-gray-400">
            Run the seed script to add sample exercises
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedExercises).map(([muscle, exs]: [string, any]) => (
            <div key={muscle}>
              <h2 className="text-xl font-bold text-gray-900 mb-4 capitalize">
                {muscle}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exs.map((exercise: any) => (
                  <div
                    key={exercise.id}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
                  >
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {exercise.name}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      {exercise.equipment && exercise.equipment.length > 0 && (
                        <div>
                          <span className="font-medium">Equipment:</span>{' '}
                          {exercise.equipment.join(', ')}
                        </div>
                      )}
                      {exercise.muscleGroups && (
                        <div>
                          <span className="font-medium">Muscles:</span>{' '}
                          {exercise.muscleGroups.join(', ')}
                        </div>
                      )}
                      {exercise.tips && (
                        <div className="text-primary-600 italic mt-2">
                          💡 {exercise.tips}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

