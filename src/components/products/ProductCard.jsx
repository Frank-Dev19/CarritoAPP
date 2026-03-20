import { formatCurrency } from '../../utils/formatters';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const discount = Math.round(product.discountPercentage);

  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-card__image"
          loading="lazy"
        />
        {discount > 0 && (
          <span className="product-card__discount">-{discount}%</span>
        )}
      </div>
      <div className="product-card__content">
        <span className="product-card__brand">{product.brand}</span>
        <h3 className="product-card__title">{product.title}</h3>
        <div className="product-card__prices">
          <span className="product-card__price">{formatCurrency(product.price)}</span>
          <span className="product-card__total-price">
            {formatCurrency(product.totalPrice)}
          </span>
        </div>
        <button
          className="product-card__btn"
          onClick={() => onAddToCart(product)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
