import ProductCard from './ProductCard';
import Pagination from '../common/Pagination';
import './ProductList.css';

const ProductList = ({ products, loading, error, currentPage, totalPages, onPageChange, onAddToCart }) => {
  if (loading) {
    return (
      <div className="product-list__loading">
        <div className="product-list__spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list__error">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-list__empty">
        <p>No hay productos disponibles</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="product-list__grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="product-list__pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;
