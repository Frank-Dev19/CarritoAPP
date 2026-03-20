import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Página no encontrada</p>
      <Link to={ROUTES.HOME} className="not-found-link">
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;
