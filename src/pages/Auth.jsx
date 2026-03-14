import { useState } from 'react';
import { supabase } from '../lib/supabase';

const Auth = () => {
  const [mode, setMode] = useState('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email || !password) {
      setError('Enter both email and password.');
      return;
    }

    setSubmitting(true);

    const authAction =
      mode === 'sign-up'
        ? supabase.auth.signUp({ email, password })
        : supabase.auth.signInWithPassword({ email, password });

    const { error: authError } = await authAction;

    setSubmitting(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    if (mode === 'sign-up') {
      setMessage('Account created. If email confirmation is enabled in Supabase, confirm your email before signing in.');
      return;
    }

    setMessage('Signed in successfully.');
  };

  return (
    <main className="center-shell">
      <div className="card auth-card">
        <div className="header">
          <h1 style={{ background: 'linear-gradient(to right, #a5b4fc, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Sync Your Leases
          </h1>
          <p className="subtitle">Create an account once, then sign in with email and password on any device.</p>
        </div>

        <div className="auth-toggle">
          <button
            type="button"
            className={`auth-tab ${mode === 'sign-in' ? 'active' : ''}`}
            onClick={() => {
              setMode('sign-in');
              setError('');
              setMessage('');
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === 'sign-up' ? 'active' : ''}`}
            onClick={() => {
              setMode('sign-up');
              setError('');
              setMessage('');
            }}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              id="email"
              placeholder=" "
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-label" htmlFor="email">Email Address</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              id="password"
              placeholder=" "
              autoComplete={mode === 'sign-up' ? 'new-password' : 'current-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="text-label" htmlFor="password">Password</label>
          </div>

          {error ? <div className="errorMessage">{error}</div> : null}
          {message ? <div className="infoMessage">{message}</div> : null}

          <button type="submit" disabled={submitting}>
            {submitting
              ? mode === 'sign-up'
                ? 'Creating Account...'
                : 'Signing In...'
              : mode === 'sign-up'
                ? 'Create Account'
                : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Auth;
