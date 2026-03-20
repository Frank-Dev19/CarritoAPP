import { useEffect, useState, useRef } from 'react';
import { useCart } from '../context/CartContext';
import CartList from '../components/cart/CartList';
import CartSummary from '../components/cart/CartSummary';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import './CartPage.css';

const CartPage = () => {
  const { cart, loading, error, fetchCart, removeItem, updateQuantity, itemCount, clearError } = useCart();
  const [notification, setNotification] = useState(null);
  const notificationTimeoutRef = useRef(null);

  const showNotification = (message, type = 'success') => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    setNotification({ message, type });
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  useEffect(() => {
    fetchCart();
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, [fetchCart]);

  useEffect(() => {
    if (error) {
      showNotification(error, 'error');
      clearError();
    }
  }, [error, clearError]);

  const handleRemoveItem = async (itemId) => {
    const success = await removeItem(itemId);
    if (success) {
      showNotification('Producto eliminado del carrito');
    }
  };

  const handleUpdateQuantity = async (itemId, cantidad) => {
    const success = await updateQuantity(itemId, cantidad);
    if (success) {
      showNotification('Cantidad actualizada');
    }
    return success;
  };

  const handleUpdateError = (itemId) => {
    console.log(`Update error for item ${itemId}`);
  };

  const handleCheckout = () => {
    showNotification('Funcionalidad de pago en desarrollo 🚀');
  };

  if (loading && !cart) {
    return <Loading message="Cargando carrito..." />;
  }

  if (error && !cart) {
    return (
      <ErrorMessage
        message={error}
        onRetry={fetchCart}
      />
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-page__header">
        <h1>Carrito de Compras</h1>
        {itemCount > 0 && (
          <p className="cart-page__subtitle">
            Tienes {itemCount} {itemCount === 1 ? 'producto' : 'productos'} en tu carrito
          </p>
        )}
      </div>

      {cart && cart.items && cart.items.length > 0 ? (
        <div className="cart-page__content">
          <div className="cart-page__list">
            <CartList
              items={cart.items}
              onRemove={handleRemoveItem}
              onUpdateQuantity={handleUpdateQuantity}
              onUpdateError={handleUpdateError}
            />
          </div>
          <div className="cart-page__summary">
            <CartSummary cart={cart} onCheckout={handleCheckout} />
          </div>
        </div>
      ) : (
        <div className="cart-page__empty">
          <div className="cart-page__empty-icon">🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>Explora nuestros productos y agrega los que más te gusten</p>
          <a href="/" className="cart-page__browse-btn">
            Ver productos
          </a>
        </div>
      )}

      {notification && (
        <div className={`notification notification--${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default CartPage;
