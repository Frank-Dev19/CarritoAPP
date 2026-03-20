import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">🛒 Mi Tienda</h2>
      </div>
      <nav className="sidebar-nav">
        <NavLink
          to={ROUTES.HOME}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`
          }
        >
          <span className="sidebar-icon">📦</span>
          <span>Productos</span>
        </NavLink>
        <NavLink
          to={ROUTES.CART}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`
          }
        >
          <span className="sidebar-icon">🛒</span>
          <span>Carrito</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
