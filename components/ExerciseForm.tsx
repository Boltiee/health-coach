'use client';

import { db } from '@/lib/instant';
import { useState } from 'react';

type Exercise = {
  id: string;
  name: string;
  equipment: string[];
  muscleGroups: string[];
  description?: string;
  tips?: string;
};

type ExerciseFormProps = {
  exercise?: Exercise;
  onClose: () => void;
};

export default function ExerciseForm({ exercise, onClose }: ExerciseFormProps) {
  const [name, setName] = useState(exercise?.name || '');
  const [equipmentText, setEquipmentText] = useState(
    exercise?.equipment.join(', ') || ''
  );
  const [muscleGroupsText, setMuscleGroupsText] = useState(
    exercise?.muscleGroups.join(', ') || ''
  );
  const [description, setDescription] = useState(exercise?.description || '');
  const [tips, setTips] = useState(exercise?.tips || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !muscleGroupsText.trim()) {
      alert('Please fill in exercise name and muscle groups');
      return;
    }

    setIsSaving(true);
    try {
      const exerciseId = exercise?.id || `exercise-${Date.now()}`;
      const equipment = equipmentText
        .split(',')
        .map((e) => e.trim())
        .filter((e) => e.length > 0);
      const muscleGroups = muscleGroupsText
        .split(',')
        .map((m) => m.trim())
        .filter((m) => m.length > 0);

      // @ts-ignore - InstantDB type inference issue
      await db.transact([
        // @ts-ignore - InstantDB type inference issue
        db.tx.exercises[exerciseId].update({
          id: exerciseId,
          name: name.trim(),
          equipment,
          muscleGroups,
          description: description.trim() || undefined,
          tips: tips.trim() || undefined,
        }),
      ]);

      onClose();
    } catch (error) {
      console.error('Error saving exercise:', error);
      alert('Failed to save exercise');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!exercise) return;
    
    if (!confirm(`Are you sure you want to delete "${exercise.name}"?`)) {
      return;
    }

    setIsSaving(true);
    try {
      // @ts-ignore - InstantDB type inference issue
      await db.transact([
        // @ts-ignore - InstantDB type inference issue
        db.tx.exercises[exercise.id].delete(),
      ]);
      onClose();
    } catch (error) {
      console.error('Error deleting exercise:', error);
      alert('Failed to delete exercise');
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {exercise ? 'Edit Exercise' : 'New Exercise'}
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
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exercise Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Barbell Bench Press"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Muscle Groups */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Muscle Groups * (comma-separated)
            </label>
            <input
              type="text"
              value={muscleGroupsText}
              onChange={(e) => setMuscleGroupsText(e.target.value)}
              placeholder="e.g., chest, triceps, shoulders"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Common: chest, back, shoulders, biceps, triceps, legs, core, glutes, hamstrings, quads
            </p>
          </div>

          {/* Equipment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Equipment (comma-separated)
            </label>
            <input
              type="text"
              value={equipmentText}
              onChange={(e) => setEquipmentText(e.target.value)}
              placeholder="e.g., barbell, bench"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty for bodyweight exercises
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the exercise"
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Tips */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tips & Form Notes (optional)
            </label>
            <textarea
              value={tips}
              onChange={(e) => setTips(e.target.value)}
              placeholder="e.g., Keep your back flat, retract shoulder blades, control the descent"
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between">
          <div>
            {exercise && (
              <button
                onClick={handleDelete}
                disabled={isSaving}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition disabled:opacity-50"
              >
                Delete Exercise
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
              {isSaving ? 'Saving...' : exercise ? 'Save Changes' : 'Create Exercise'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

