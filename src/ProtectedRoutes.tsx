


import { Navigate, Outlet, useNavigate } from "react-router-dom";
const useAuth = () => {
  const user = { loggedIn: localStorage.getItem("access_token") };
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  const navigate = useNavigate();

  if (isAuth && window.location.pathname === "/login") {
    navigate(-1);
    return null;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;

