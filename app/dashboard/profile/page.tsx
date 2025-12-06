'use client';

import { db } from '@/lib/instant';
import { useState } from 'react';

export default function ProfilePage() {
  const { user } = db.useAuth();
  const [showPinReset, setShowPinReset] = useState(false);
  const [newPin, setNewPin] = useState('');

  const handleResetPin = () => {
    if (newPin.length === 4) {
      localStorage.setItem('userPin', newPin);
      setNewPin('');
      setShowPinReset(false);
      alert('PIN updated successfully');
    } else {
      alert('PIN must be 4 digits');
    }
  };

  const handleClearPin = () => {
    if (confirm('Are you sure you want to remove your PIN?')) {
      localStorage.removeItem('userPin');
      alert('PIN removed. You will only need email login.');
    }
  };

  const handleSignOut = () => {
    db.auth.signOut();
    localStorage.removeItem('userPin');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account settings</p>
      </div>

      <div className="space-y-6">
        {/* Account Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Account</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <p className="text-gray-900">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* PIN Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Quick Access PIN
          </h2>
          
          {!showPinReset ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                Use a 4-digit PIN for quick access instead of email login.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPinReset(true)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition"
                >
                  Change PIN
                </button>
                <button
                  onClick={handleClearPin}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Remove PIN
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New 4-digit PIN
              </label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                className="w-full text-center text-2xl tracking-widest border-2 border-gray-300 rounded-lg p-4 mb-4 focus:border-primary-500 focus:outline-none"
                placeholder="••••"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleResetPin}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition"
                >
                  Save PIN
                </button>
                <button
                  onClick={() => {
                    setShowPinReset(false);
                    setNewPin('');
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sign Out */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

