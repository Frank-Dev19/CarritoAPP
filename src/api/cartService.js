import api from './axios';

const DEFAULT_USER_ID = 1;

export const getCart = async (userId = DEFAULT_USER_ID) => {
  const response = await api.get(`/cart?userId=${userId}`);
  return response.data;
};

export const addToCart = async (productData, userId = DEFAULT_USER_ID) => {
  const payload = {
    idUsuario: userId,
    idProducto: productData.idProducto,
    sku: productData.sku,
    precio: productData.precio,
    cantidad: productData.cantidad || 1,
    imagen: productData.imagen,
  };
  const response = await api.post('/cart/add', payload);
  return response.data;
};

export const updateCartItemQuantity = async (itemId, cantidad, userId = DEFAULT_USER_ID) => {
  const payload = {
    cantidad,
    idUsuario: userId,
  };
  const response = await api.patch(`/cart/${itemId}`, payload);
  return response.data;
};

export const removeFromCart = async (itemId, userId = DEFAULT_USER_ID) => {
  const response = await api.delete(`/cart/${itemId}?userId=${userId}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};
