import { useState } from 'react';
import { saveLease, generateICS } from '../utils/leaseUtils';

const Home = ({ user }) => {
  const [tenant, setTenant] = useState('');
  const [unit, setUnit] = useState('');
  const [rent, setRent] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError('');

    if (!tenant || !unit || !date) {
      setError(true);
      const card = document.getElementById('formCard');
      card.style.animation = 'none';
      card.offsetHeight;
      card.style.animation = 'shake 0.4s cubic-bezier(.36,.07,.19,.97) both';
      return;
    }

    setError(false);
    setSubmitting(true);

    try {
      await saveLease({ tenant, unit, date, rent, userId: user.id });
      generateICS(tenant, unit, date, rent);

      setSuccess(true);
      setTenant('');
      setUnit('');
      setRent('');
      setDate('');

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setSaveError(err.message || 'Unable to save lease.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card" id="formCard" style={{ height: 'fit-content', animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards', opacity: 1, transform: 'translateY(0)' }}>
      <div className="header">
        <h1 style={{ background: 'linear-gradient(to right, #a5b4fc, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Lease Tracker
        </h1>
        <p className="subtitle">Generate calendar reminders for lease renewals</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input 
            type="text" 
            id="tenantName" 
            placeholder=" " 
            autoComplete="off" 
            value={tenant}
            onChange={(e) => setTenant(e.target.value)}
          />
          <label className="text-label" htmlFor="tenantName">Tenant Name</label>
        </div>

        <div className="input-group">
          <input 
            type="text" 
            id="unitNumber" 
            placeholder=" " 
            autoComplete="off" 
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
          <label className="text-label" htmlFor="unitNumber">Unit / Apt</label>
        </div>

        <div className="input-group">
          <input 
            type="number" 
            id="rentalAmount" 
            placeholder=" " 
            autoComplete="off" 
            value={rent}
            onChange={(e) => setRent(e.target.value)}
          />
          <label className="text-label" htmlFor="rentalAmount">Monthly Rent ($)</label>
        </div>

        {error && <div className="errorMessage">Please fill in all fields correctly.</div>}
        {saveError && <div className="errorMessage">{saveError}</div>}

        <div className="input-group" style={{ marginBottom: '32px' }}>
          <label className="date-label" htmlFor="leaseDate">Lease End Date</label>
          <input 
            type="date" 
            id="leaseDate" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" className={success ? 'success' : ''} id="saveBtn" disabled={submitting}>
          {success ? (
            <>
              <svg className="icon" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Saved!
            </>
          ) : submitting ? (
            'Saving...'
          ) : (
            <>
              <svg className="icon" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Save to Calendar
            </>
          )}
        </button>
      </form>

      <div className={`toast ${success ? 'show' : ''}`} id="toast">
        <svg className="icon" viewBox="0 0 24 24" style={{ stroke: '#34d399' }}>
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Reminder generated successfully!
      </div>
    </div>
  );
};

export default Home;
