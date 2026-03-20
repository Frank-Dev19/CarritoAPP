import { createContext, useContext, useState, useCallback } from 'react';
import { getCart, addToCart as addToCartApi, removeFromCart } from '../api';
import { DEFAULT_USER_ID } from '../utils/constants';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itemCount, setItemCount] = useState(0);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const cartData = await getCart(DEFAULT_USER_ID);
      setCart(cartData);
      setItemCount(cartData.items?.length || 0);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar el carrito');
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = useCallback(async (product) => {
    setLoading(true);
    setError(null);
    try {
      const updatedCart = await addToCartApi(product, DEFAULT_USER_ID);
      setCart(updatedCart);
      setItemCount(updatedCart.items?.length || 0);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al agregar al carrito');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItem = useCallback(async (itemId) => {
    setLoading(true);
    setError(null);
    try {
      await removeFromCart(itemId, DEFAULT_USER_ID);
      await fetchCart();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al eliminar del carrito');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchCart]);

  const value = {
    cart,
    loading,
    error,
    itemCount,
    fetchCart,
    addItem,
    removeItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
