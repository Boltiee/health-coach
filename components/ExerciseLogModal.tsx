'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/instant';

interface ExerciseLogModalProps {
  workout: any;
  exercise: any;
  existingLog?: any;
  onClose: () => void;
}

export default function ExerciseLogModal({
  workout,
  exercise,
  existingLog,
  onClose,
}: ExerciseLogModalProps) {
  const [sets, setSets] = useState(existingLog?.actualSets || workout.targetSets);
  const [reps, setReps] = useState(existingLog?.actualReps || workout.targetReps);
  const [weight, setWeight] = useState(
    existingLog?.actualWeight || workout.targetWeight || ''
  );
  const [notes, setNotes] = useState(existingLog?.notes || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const logId = existingLog?.id || `log-${workout.id}-${Date.now()}`;

      // @ts-ignore - InstantDB type inference issue
      await db.transact([
        // @ts-ignore - InstantDB type inference issue
        db.tx.workoutLogs[logId].update({
          date: today,
          exerciseId: workout.exerciseId,
          actualSets: sets,
          actualReps: reps,
          actualWeight: weight ? parseFloat(weight) : undefined,
          notes: notes || undefined,
          planId: workout.id,
          completedAt: Date.now(),
        }),
      ]);

      onClose();
    } catch (error) {
      console.error('Error saving workout log:', error);
      alert('Failed to save workout log');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {existingLog ? 'Edit' : 'Log'} Exercise
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
          {/* Exercise Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {exercise?.name}
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div>
                <span className="font-medium">Target:</span> {workout.targetSets}{' '}
                sets × {workout.targetReps} reps
                {workout.targetWeight && ` @ ${workout.targetWeight}kg`}
              </div>
              {exercise?.muscleGroups && (
                <div>
                  <span className="font-medium">Muscles:</span>{' '}
                  {exercise.muscleGroups.join(', ')}
                </div>
              )}
              {workout.tips && (
                <div className="text-primary-600 italic mt-2">
                  💡 {workout.tips}
                </div>
              )}
              {exercise?.tips && !workout.tips && (
                <div className="text-primary-600 italic mt-2">
                  💡 {exercise.tips}
                </div>
              )}
            </div>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sets
                </label>
                <input
                  type="number"
                  min="1"
                  value={sets}
                  onChange={(e) => setSets(parseInt(e.target.value) || 0)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reps
                </label>
                <input
                  type="number"
                  min="1"
                  value={reps}
                  onChange={(e) => setReps(parseInt(e.target.value) || 0)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg) - Optional
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none"
                placeholder="Leave empty if bodyweight"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes - Optional
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none resize-none"
                placeholder="How did it feel? Any adjustments?"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || sets === 0 || reps === 0}
              className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Log'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

