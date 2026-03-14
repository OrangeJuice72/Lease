import { NavLink, Outlet } from 'react-router-dom';

const Layout = ({ onSignOut }) => {
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
        <button type="button" className="secondary-button top-signout" onClick={onSignOut}>
          Sign Out
        </button>
      </nav>

      <main style={{ paddingTop: '100px', display: 'flex', justifyContent: 'center', minHeight: '100vh', width: '100%' }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
