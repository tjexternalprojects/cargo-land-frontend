import { useEffect, useCallback, ReactNode } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from './context';


type UnprotectedRoutesProps = {
  children?: ReactNode;
};

const useAuth = () => {
  const { user } = useApp();
  return user && user.loggedIn;
};

const UnprotectedRoutes = ({ children }: UnprotectedRoutesProps) => {
  const isAuth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = useCallback(() => {
    if (isAuth) {
      navigate(location.state?.from || '/');
    }
  }, [isAuth, location, navigate]);

  useEffect(() => {
    handleNavigate();
  }, []);

  return isAuth === null ?  <Outlet />: null;
};

export default UnprotectedRoutes;
