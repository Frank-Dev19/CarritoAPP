import { formatCurrency } from '../../utils/formatters';
import './CartSummary.css';

const CartSummary = ({ cart, onCheckout }) => {
  if (!cart || !cart.items || cart.items.length === 0) {
    return null;
  }

  const itemCount = cart.items.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <div className="cart-summary">
      <div className="cart-summary__header">
        <h3>Resumen del pedido</h3>
      </div>
      <div className="cart-summary__details">
        <div className="cart-summary__row">
          <span>Productos ({itemCount})</span>
          <span>{cart.items.length}</span>
        </div>
        <div className="cart-summary__row">
          <span>Subtotal</span>
          <span>{formatCurrency(cart.totalCompra)}</span>
        </div>
        <div className="cart-summary__row">
          <span>Envío</span>
          <span className="cart-summary__free">Gratis</span>
        </div>
        <div className="cart-summary__divider"></div>
        <div className="cart-summary__row cart-summary__row--total">
          <span>Total</span>
          <span>{formatCurrency(cart.totalCompra)}</span>
        </div>
      </div>
      <button
        className="cart-summary__checkout-btn"
        onClick={onCheckout}
      >
        Proceder al pago
      </button>
      <p className="cart-summary__secure">
        🔒 Compra segura y protegida
      </p>
    </div>
  );
};

export default CartSummary;
