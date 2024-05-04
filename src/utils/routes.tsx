import { Navigate, Outlet } from 'react-router-dom';
import { paths } from './path';

import { getAuthToken } from '../services/auth';

const PrivateRoutes: React.FC = () => {
  const isLogin = getAuthToken();

  return isLogin ? <Outlet /> : <Navigate to={paths.LOGIN} />;
};

const PublicRoutes: React.FC = () => {
  const isLogin = getAuthToken();

  return isLogin ? <Navigate to={paths.HOME} /> : <Outlet />;
};

export { PrivateRoutes, PublicRoutes };
