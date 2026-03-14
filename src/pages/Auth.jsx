import { useState } from 'react';
import { supabase } from '../lib/supabase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Enter your email address.');
      return;
    }

    setSubmitting(true);

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.href.split('#')[0],
      },
    });

    setSubmitting(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    setMessage('Check your email for the sign-in link.');
  };

  return (
    <main className="center-shell">
      <div className="card auth-card">
        <div className="header">
          <h1 style={{ background: 'linear-gradient(to right, #a5b4fc, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Sync Your Leases
          </h1>
          <p className="subtitle">Sign in with email to access the same leases on every device.</p>
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

          {error ? <div className="errorMessage">{error}</div> : null}
          {message ? <div className="infoMessage">{message}</div> : null}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Sending Link...' : 'Email Me a Sign-In Link'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Auth;
