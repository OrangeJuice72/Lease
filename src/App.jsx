import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Leases from './pages/Leases';
import Auth from './pages/Auth';
import Setup from './pages/Setup';
import { hasSupabaseConfig, supabase } from './lib/supabase';

function App() {
  const [session, setSession] = useState(null);
  const [authReady, setAuthReady] = useState(!hasSupabaseConfig);

  useEffect(() => {
    if (!hasSupabaseConfig) {
      return undefined;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthReady(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!hasSupabaseConfig) {
    return <Setup />;
  }

  if (!authReady) {
    return (
      <main className="center-shell">
        <div className="card auth-card">
          <p className="subtitle">Checking your session...</p>
        </div>
      </main>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout user={session.user} onSignOut={handleSignOut} />}>
          <Route index element={<Home user={session.user} />} />
          <Route path="leases" element={<Leases user={session.user} />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
