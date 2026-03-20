import CartItem from './CartItem';
import './CartList.css';

const CartList = ({ items, onRemove, onUpdateQuantity, onUpdateError }) => {
  if (!items || items.length === 0) {
    return (
      <div className="cart-list__empty">
        <div className="cart-list__empty-icon">🛒</div>
        <p className="cart-list__empty-text">Tu carrito está vacío</p>
        <p className="cart-list__empty-subtext">
          Agrega productos para comenzar tu compra
        </p>
      </div>
    );
  }

  return (
    <div className="cart-list">
      <div className="cart-list__header">
        <h2>Productos en tu carrito</h2>
        <span className="cart-list__count">
          {items.length} {items.length === 1 ? 'producto' : 'productos'}
        </span>
      </div>
      <div className="cart-list__items">
        {items.map((item) => (
          <CartItem
            key={item.idDetalle}
            item={item}
            onRemove={onRemove}
            onUpdateQuantity={onUpdateQuantity}
            onUpdateError={onUpdateError}
          />
        ))}
      </div>
    </div>
  );
};

export default CartList;
