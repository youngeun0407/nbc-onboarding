import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const PrivateRoute = ({ requiresAuth }: { requiresAuth: boolean }) => {
  const { isLoggedIn } = useAuthStore();

  if (requiresAuth && !isLoggedIn) {
    return <Navigate to="/login" />;
  }
  if (!requiresAuth && isLoggedIn) {
    return <Navigate to="/mypage" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
