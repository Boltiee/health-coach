'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/instant';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoading, user, error } = db.useAuth();
  const [pin, setPin] = useState('');
  const [showPinEntry, setShowPinEntry] = useState(false);
  const [savedPin, setSavedPin] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    // Check if user has a saved PIN in localStorage
    const storedPin = localStorage.getItem('userPin');
    if (storedPin && user) {
      setSavedPin(storedPin);
      setIsLocked(true);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-semibold mb-2">Authentication Error</h2>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  // Show PIN unlock if user is logged in but locked
  if (isLocked && savedPin) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Enter PIN
          </h2>
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
            className="w-full text-center text-3xl tracking-widest border-2 border-gray-300 rounded-lg p-4 mb-4 focus:border-primary-500 focus:outline-none"
            placeholder="••••"
          />
          <button
            onClick={() => {
              if (pin === savedPin) {
                setIsLocked(false);
                setPin('');
              } else {
                alert('Incorrect PIN');
                setPin('');
              }
            }}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Unlock
          </button>
          <button
            onClick={() => {
              db.auth.signOut();
              localStorage.removeItem('userPin');
              setIsLocked(false);
              setSavedPin(null);
            }}
            className="w-full mt-3 text-gray-600 py-2 hover:text-gray-800 transition text-sm"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  // Show PIN setup if user doesn't have one
  if (!savedPin && !showPinEntry) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome!</h2>
          <p className="text-gray-600 mb-6">
            Set up a 4-digit PIN for quick access next time.
          </p>
          <button
            onClick={() => setShowPinEntry(true)}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition mb-3"
          >
            Set up PIN
          </button>
          <button
            onClick={() => setSavedPin('skip')}
            className="w-full text-gray-600 py-2 hover:text-gray-800 transition"
          >
            Skip for now
          </button>
        </div>
      </div>
    );
  }

  if (showPinEntry && !savedPin) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create PIN
          </h2>
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
            className="w-full text-center text-3xl tracking-widest border-2 border-gray-300 rounded-lg p-4 mb-4 focus:border-primary-500 focus:outline-none"
            placeholder="••••"
          />
          <button
            onClick={() => {
              if (pin.length === 4) {
                localStorage.setItem('userPin', pin);
                setSavedPin(pin);
                setPin('');
                setShowPinEntry(false);
              } else {
                alert('PIN must be 4 digits');
              }
            }}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Save PIN
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [sentEmail, setSentEmail] = useState('');

  const handleSendMagicCode = () => {
    if (!email) return;
    db.auth.sendMagicCode({ email }).catch((err) => {
      alert(`Error: ${err.body?.message || 'Failed to send code'}`);
    });
    setSentEmail(email);
  };

  if (sentEmail) {
    return <MagicCodeEntry email={sentEmail} onBack={() => setSentEmail('')} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-primary-50 to-green-100">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-600 mb-2">
            Health Coach
          </h1>
          <p className="text-gray-600">Your personal health & fitness companion</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMagicCode()}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          
          <button
            onClick={handleSendMagicCode}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Send Magic Code
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          We'll send you a 6-digit code to sign in
        </p>
      </div>
    </div>
  );
}

function MagicCodeEntry({
  email,
  onBack,
}: {
  email: string;
  onBack: () => void;
}) {
  const [code, setCode] = useState('');

  const handleVerifyCode = () => {
    if (!code) return;
    db.auth.signInWithMagicCode({ email, code }).catch((err) => {
      alert(`Error: ${err.body?.message || 'Invalid code'}`);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-primary-50 to-green-100">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Check Your Email
        </h2>
        <p className="text-gray-600 text-center mb-6">
          We sent a code to <span className="font-medium">{email}</span>
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              6-Digit Code
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => e.key === 'Enter' && handleVerifyCode()}
              className="w-full text-center text-2xl tracking-widest border-2 border-gray-300 rounded-lg p-4 focus:border-primary-500 focus:outline-none"
              placeholder="000000"
            />
          </div>
          
          <button
            onClick={handleVerifyCode}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Verify Code
          </button>
          
          <button
            onClick={onBack}
            className="w-full text-gray-600 py-2 hover:text-gray-800 transition"
          >
            ← Back to email
          </button>
        </div>
      </div>
    </div>
  );
}

