import { useState } from 'react';
import { formatCurrency } from '../../utils/formatters';
import './CartItem.css';

const CartItem = ({ item, onRemove, onUpdateQuantity, onUpdateError }) => {
  const [quantity, setQuantity] = useState(item.cantidad);

  const handleRemove = () => {
    onRemove(item.idDetalle);
  };

  const handleDecrease = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      const success = await onUpdateQuantity(item.idDetalle, newQuantity);
      if (!success && onUpdateError) {
        setQuantity(item.cantidad);
        onUpdateError(item.idDetalle);
      }
    }
  };

  const handleIncrease = async () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    const success = await onUpdateQuantity(item.idDetalle, newQuantity);
    if (!success && onUpdateError) {
      setQuantity(item.cantidad);
      onUpdateError(item.idDetalle);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleQuantityBlur = async () => {
    if (quantity !== item.cantidad && quantity > 0) {
      const success = await onUpdateQuantity(item.idDetalle, quantity);
      if (!success && onUpdateError) {
        setQuantity(item.cantidad);
        onUpdateError(item.idDetalle);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const subtotal = item.precio * quantity;

  return (
    <div className="cart-item">
      <div className="cart-item__image-container">
        <img
          src={item.imagen}
          alt={`Producto ${item.idProducto}`}
          className="cart-item__image"
        />
      </div>
      <div className="cart-item__content">
        <div className="cart-item__info">
          <span className="cart-item__sku">SKU: {item.sku}</span>
          <p className="cart-item__product-id">ID: {item.idProducto}</p>
        </div>
        <div className="cart-item__price">
          <span className="cart-item__unit-price">
            {formatCurrency(item.precio)} c/u
          </span>
        </div>
        <div className="cart-item__quantity">
          <button
            className="cart-item__qty-btn"
            onClick={handleDecrease}
            disabled={quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            className="cart-item__qty-input"
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={handleQuantityBlur}
            onKeyPress={handleKeyPress}
            min="1"
          />
          <button
            className="cart-item__qty-btn"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
        <div className="cart-item__subtotal">
          <span className="cart-item__subtotal-label">Subtotal:</span>
          <span className="cart-item__subtotal-value">
            {formatCurrency(subtotal)}
          </span>
        </div>
        <button
          className="cart-item__remove-btn"
          onClick={handleRemove}
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem;
