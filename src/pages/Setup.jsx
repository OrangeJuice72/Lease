const Setup = () => {
  return (
    <main className="center-shell">
      <div className="card auth-card">
        <div className="header">
          <h1 style={{ background: 'linear-gradient(to right, #f9a8d4, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Supabase Setup Required
          </h1>
          <p className="subtitle">Add your Supabase project keys so leases can sync across devices.</p>
        </div>

        <div className="setup-list">
          <p>1. Create a Supabase project.</p>
          <p>2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to a local `.env` file.</p>
          <p>3. Add the same values as GitHub repository secrets for deployment.</p>
          <p>4. Run the SQL in `supabase/schema.sql` inside the Supabase SQL Editor.</p>
        </div>
      </div>
    </main>
  );
};

export default Setup;
