import { useState } from 'react';
import useProducts from '../hooks/useProducts';
import ProductList from '../components/products/ProductList';
import { useCart } from '../context/CartContext';
import './HomePage.css';

const HomePage = () => {
  const {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
  } = useProducts();

  const { addItem } = useCart();
  const [notification, setNotification] = useState(null);

  const handleAddToCart = async (product) => {
    const productData = {
      idProducto: product.id,
      sku: `PROD-${product.id}`,
      precio: product.price,
      cantidad: 1,
      imagen: product.thumbnail,
    };

    const success = await addItem(productData);
    
    if (success) {
      showNotification(`${product.title} agregado al carrito`);
    } else {
      showNotification('Error al agregar al carrito', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="home-page">
      <div className="home-page__header">
        <h1>Productos</h1>
        <p className="home-page__subtitle">
          Encuentra los mejores productos con descuentos increíbles
        </p>
      </div>

      <ProductList
        products={products}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onAddToCart={handleAddToCart}
      />

      {notification && (
        <div className={`notification notification--${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default HomePage;
