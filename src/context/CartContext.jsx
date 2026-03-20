import { createContext, useContext, useState, useCallback } from 'react';
import { getCart, addToCart as addToCartApi, removeFromCart, updateCartItemQuantity } from '../api';
import { DEFAULT_USER_ID } from '../utils/constants';

const CartContext = createContext(null);

const getErrorMessage = (err) => {
  if (err.response?.data?.message) {
    const msg = err.response.data.message;
    return typeof msg === 'string' ? msg : JSON.stringify(msg);
  }
  if (err.response?.data?.error) {
    return err.response.data.error;
  }
  if (err.message) {
    return err.message;
  }
  return 'Ocurrió un error inesperado';
};

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
      setError(getErrorMessage(err));
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
      const message = getErrorMessage(err);
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateQuantity = useCallback(async (itemId, cantidad) => {
    setError(null);
    try {
      const updatedCart = await updateCartItemQuantity(itemId, cantidad, DEFAULT_USER_ID);
      setCart(updatedCart);
      return true;
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      return false;
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
      setError(getErrorMessage(err));
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchCart]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    cart,
    loading,
    error,
    itemCount,
    fetchCart,
    addItem,
    updateQuantity,
    removeItem,
    clearError,
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
