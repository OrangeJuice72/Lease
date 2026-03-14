import { NavLink, Outlet } from 'react-router-dom';

const Layout = ({ user, onSignOut }) => {
  return (
    <>
      <div className="decoration dec-1"></div>
      <div className="decoration dec-2"></div>
      
      <nav>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Add Lease
          </NavLink>
          <NavLink to="/leases" className={({ isActive }) => isActive ? 'active' : ''}>
            View Leases
          </NavLink>
        </div>
        <div className="nav-session">
          <span className="nav-user">{user.email}</span>
          <button type="button" className="secondary-button" onClick={onSignOut}>
            Sign Out
          </button>
        </div>
      </nav>

      <main style={{ paddingTop: '100px', display: 'flex', justifyContent: 'center', minHeight: '100vh', width: '100%' }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
