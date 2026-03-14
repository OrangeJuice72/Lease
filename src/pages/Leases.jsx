import { useCallback, useEffect, useState } from 'react';
import { deleteLease, generateICS, getLeases } from '../utils/leaseUtils';

const Leases = ({ user }) => {
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadLeases = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getLeases(user.id);
      setLeases(data);
    } catch (err) {
      setError(err.message || 'Unable to load leases.');
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    loadLeases();
  }, [loadLeases]);

  const handleDelete = async (id) => {
    try {
      await deleteLease(id, user.id);
      loadLeases();
    } catch (err) {
      setError(err.message || 'Unable to delete lease.');
    }
  };

  const handleAddToCalendar = (lease) => {
    generateICS(lease.tenant, lease.unit, lease.date, lease.rent);
  };

  return (
    <div className="card" style={{ height: 'fit-content', animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards', opacity: 1, transform: 'translateY(0)' }}>
      <div className="header" style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '1.8rem', background: 'linear-gradient(to right, #a5b4fc, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Active Leases
        </h1>
        <p className="subtitle">Quick overview of existing reminders</p>
      </div>

      <div id="leasesList">
        {error ? (
          <p style={{ textAlign: 'center', color: '#fca5a5', marginTop: '40px' }}>
            {error}
          </p>
        ) : loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>
            Loading leases...
          </p>
        ) : leases.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>
            No active leases found.
          </p>
        ) : (
          leases.map((lease) => (
            <div key={lease.id} className="lease-item">
              <div className="lease-info">
                <span className="lease-tenant">
                  {lease.tenant} <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.8rem' }}>({lease.unit})</span>
                </span>
                <div style={{ fontSize: '0.9rem', color: '#a5b4fc', marginTop: '4px', fontWeight: 600 }}>
                  ${lease.rent || '0'} / mo
                </div>
                <span className="lease-date">
                  Ends: {new Date(lease.date + 'T12:00:00').toLocaleDateString(undefined, { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="lease-actions">
                <button className="lease-action-btn" onClick={() => handleAddToCalendar(lease)} title="Add to Calendar">
                  <svg className="icon" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </button>
                <button className="lease-action-btn delete-btn" onClick={() => handleDelete(lease.id)} title="Remove">
                  <svg className="icon" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}>
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leases;
