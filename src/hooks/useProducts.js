import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../api';
import { PRODUCTS_PER_PAGE } from '../utils/constants';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE) || 1;

  const fetchProducts = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts(page, PRODUCTS_PER_PAGE);
      setProducts(data.products || []);
      setTotalProducts(data.total || 0);
      setCurrentPage(page);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchProducts(page);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
    refetch: () => fetchProducts(currentPage),
  };
};

export default useProducts;
