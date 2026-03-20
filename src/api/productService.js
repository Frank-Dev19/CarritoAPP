import api from './axios';

export const getProducts = async (page = 1, limit = 15) => {
  const response = await api.get(`/products?page=${page}&limit=${limit}`);
  return response.data;
};

export const getProductStock = async (productId) => {
  const response = await api.get(`/products/${productId}`);
  return response.data;
};
