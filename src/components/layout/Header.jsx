import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ROUTES } from '../../utils/constants';
import './Header.css';

const Header = () => {
  const { itemCount } = useCart();

  return (
    <header className="header">
      <div className="header-content">
        <Link to={ROUTES.HOME} className="header-logo">
          <span>🛒</span>
          <span>Mi Tienda</span>
        </Link>
        <div className="header-actions">
          <div className="header-user">
            <span>👤</span>
            <span>Usuario</span>
          </div>
          <Link to={ROUTES.CART} className="header-cart">
            <span className="header-cart-icon">🛒</span>
            {itemCount > 0 && (
              <span className="header-cart-badge">{itemCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
