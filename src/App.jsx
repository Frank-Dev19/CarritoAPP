import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/layout';
import { HomePage, CartPage, NotFoundPage } from './pages';
import { ROUTES } from './utils/constants';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path={ROUTES.HOME} element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
